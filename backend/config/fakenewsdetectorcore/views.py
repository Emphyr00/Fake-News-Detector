from random import randint

from rest_framework import viewsets, status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import Prediction



class PredictionView(APIView):
    def post(self, request):
        text = request.data.get('text')
        user_id = request.data.get('user_id')

        user = get_object_or_404(User, id=user_id)
        if user is None:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        prediction_value = randint(0, 1)
        # Text.objects.create(user=user_id, content=text, prediction_value=prediction_value)
        Prediction.objects.create(prediction_value=prediction_value, user_id=user_id)

        # insert logic to create userhistory
        # change model so it will only save user_id,text_id and prediction value


        return Response({
            "user_id": user_id,
            "prediction_value": prediction_value
        })
