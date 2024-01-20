import pika
import json
import torch
from torch import nn
import string
import nltk
from torch.autograd import Variable

nltk.download('stopwords')
device = torch.device("cpu")

def remove_puncts_and_censored_words(text: str) -> str:
    # Remove censored words
    censor_removed = " ".join([word for word in text.split(" ") if '*' not in word])
    # Remove punctuations
    punct_free = "".join([letter for letter in censor_removed if letter not in string.punctuation])

    # Replace multiple spaces with one space and lower them
    single_spaced = " ".join(filter(bool, punct_free.split(" "))).lower()
    return single_spaced

def word_tokenize(text: str) -> list[str]:
    return text.split(" ")

def remove_stopwords(tokens: list[str]) -> list[str]:
    stopwords = nltk.corpus.stopwords.words('english')
    return [t for t in tokens if t not in stopwords]

def preprocess(text: str) ->list[str]:

    preprocessed = remove_puncts_and_censored_words(text)
    preprocessed = word_tokenize(preprocessed)
    preprocessed = remove_stopwords(preprocessed)

    return preprocessed

def pad(text: list[int], pad_length: int) -> list[int]:
    if len(text) < pad_length:
        pad_arr = [0] * (pad_length - len(text))
        return pad_arr + text
    elif len(text) > pad_length:
        return text[:pad_length]
    else:
        return text

class NewsClassifier(nn.Module):

    def __init__(self, vocab_size, embedding_dim, hidden_dim, n_layers, n_classes, drop_prob=0.5):

        super(NewsClassifier, self).__init__()
        self.hidden_dim = hidden_dim
        self.n_layers = n_layers
        self.embedding = nn.Embedding(vocab_size, embedding_dim)
        self.lstm = nn.LSTM(embedding_dim, hidden_dim, batch_first=True, num_layers =n_layers)
        self.dropout = nn.Dropout(drop_prob)
        self.linear = nn.Linear(hidden_dim, n_classes)
        self.sigmoid = nn.Sigmoid()


    def forward(self, x):
        batch_size = x.size(0)
        h_0 = Variable(torch.zeros(1*self.n_layers, batch_size, self.hidden_dim))
        c_0 = Variable(torch.zeros(1*self.n_layers, batch_size, self.hidden_dim))


        x = x.long()
        embeds = self.embedding(x)

        lstm_out, (h, _) = self.lstm(embeds, (h_0, c_0))

        final_hidden_state = h[-1]

        out = self.dropout(final_hidden_state)
        out = self.linear(out)
        out = self.sigmoid(out)
        return out[:,-1]

def prepareText(text):
  preprocessed = preprocess(text)
  with open("./resources/dict.json", "r") as dictfile:
    dict_file = json.load(dictfile)
  encoded_text = [dict_file[w] if w in dict_file.keys() else 0 for w in preprocessed]
  pad_to = 300
  padded_text = pad(encoded_text, pad_to)
  return padded_text


def predict(text):
    vocab_size = 254575
    embedding_dim = 512
    hidden_dim = 400
    n_layers = 2
    n_classes = 2
    test_model = NewsClassifier(vocab_size=vocab_size, embedding_dim=embedding_dim, hidden_dim=hidden_dim
                       , n_layers=n_layers, n_classes=n_classes).to(device)
    loaded_model = torch.load('./resources/model_20_01_16_20.pth', map_location=device)
    test_model.load_state_dict(loaded_model)
    test_model.eval()
    with torch.no_grad():
        text = torch.tensor(text, dtype=torch.int32).reshape(1, 300)
        text = text.to(device)
        outputs = test_model(text)
        print(outputs)
        preds = torch.round(outputs)
        print(preds)
        print(preds.item())
        print(type(preds.item()))
        if preds.item() == 1.0:
            return 1
        else:
            return 0


def callback(channel, method, properties, body):
    print(str(body))
    
    received = json.loads(body.decode('utf-8'))
    

    received = received["text"]
    print(received)
    encoded_text = prepareText(received)
    print(encoded_text)
    result = predict(encoded_text)
    print(result)
    channel.basic_publish(
        exchange='',
        routing_key=properties.reply_to,
        properties=pika.BasicProperties(correlation_id = properties.correlation_id),
        body=str(result)
    )

    channel.basic_ack(delivery_tag=method.delivery_tag)

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='rabbitmq')
)

channel = connection.channel()

channel.queue_declare(queue='predict', durable=True)
channel.basic_qos(prefetch_count=1)

channel.basic_consume(
    queue='predict', 
    on_message_callback=callback
)

print('Waiting for messages. To exit press CTRL+C')
channel.start_consuming()

