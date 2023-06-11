from django.urls import path, include
from rest_framework import routers

from .views import  PredictionView


urlpatterns = [
    path('predictions/', PredictionView.as_view()),
]