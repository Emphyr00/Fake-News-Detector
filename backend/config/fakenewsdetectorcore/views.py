from random import randint

from rest_framework import viewsets, status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import UserHistoryEntry, UserHistory, User, Prediction
from .serializers import UserHistoryEntrySerializer, UserHistorySerializer, UserSerializer


class UserHistoryEntryViewSet(viewsets.ModelViewSet):
    queryset = UserHistoryEntry.objects.all()
    serializer_class = UserHistoryEntrySerializer


class UserHistoryViewSet(viewsets.ModelViewSet):
    queryset = UserHistory.objects.all()
    serializer_class = UserHistorySerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class PredictionView(APIView):
    def post(self, request):
        text = request.data.get('text')
        user_id = request.data.get('user_id')

        user = get_object_or_404(User, id=user_id)
        if user is None:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        Prediction.objects.create(text=text, user_id=user_id)
        prediction_value = randint(0, 1)

        user_history_entry = UserHistoryEntry.objects.create(user_history=user.history, text=text,
                                                             is_fake_news=prediction_value)
        serializer = UserHistoryEntrySerializer(user_history_entry)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
