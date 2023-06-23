import pika
import json
import random

def callback(channel, method, properties, body):
    received = json.loads(body)
    result = random.randint(0, 1)
    print(received)
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