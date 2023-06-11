import pika

def open_rabbitmq_connection():
    parameters = pika.ConnectionParameters('localhost')
    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()
    return connection, channel

def close_rabbitmq_connection(connection):
    connection.close()