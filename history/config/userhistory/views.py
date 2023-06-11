from rest_framework import generics
from .serializers import TextSerializer
from .models import Text
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from knox.auth import TokenAuthentication

from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response


class TextCreateAPIView(APIView):

    def perform_create(self, text_Link, user_id, isFakeNews):
        Text.objects.create(user=user_id, content=text_Link, isFakeNews=isFakeNews)


class TextCreateAPIView(APIView):
    def post(self, request):
        text = request.data.get('text')
        isFakeNews = request.data.get('isFakeNews')
        text_id = request.data.get('text_id')

        Text.objects.create( content=text, isFakeNews=isFakeNews)

        return Response({
            "text": text,
            "isFakeNews": isFakeNews,
            "text_id": text_id
        })