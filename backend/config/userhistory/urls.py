from django.urls import path
from .views import TextCreateAPIView
urlpatterns = [
    path('texts/', TextCreateAPIView.as_view(), name='text-create'),
]