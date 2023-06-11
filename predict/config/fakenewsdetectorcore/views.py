from random import randint

from rest_framework import viewsets, status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import Prediction
from .rabbitmq import open_rabbitmq_connection, close_rabbitmq_connection

class PredictionView(APIView):
    def post(self, request):
        text = request.data.get('text')
        user_id = request.data.get('user_id')
        text_id = request.data.get('text_id')

        user = get_object_or_404(User, id=user_id)
        if user is None:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        prediction_value = randint(0, 1)

        Prediction.objects.create(prediction_value=prediction_value, user_id=user_id, text_id=text_id)
        
        exchange = 'guest'
        routing_key = 'guest'
        message = 'test'
        
        # Declare the exchange
        channel.exchange_declare(exchange=exchange, exchange_type='direct')

        # Publish the message
        channel.basic_publish(exchange=exchange, routing_key=routing_key, body=message)

        # Close the RabbitMQ connection
        close_rabbitmq_connection(connection)

        return Response({
            "user_id": user_id,
            "prediction_value": prediction_value
        })
