from rest_framework import viewsets
from .models import UserHistoryEntry, UserHistory, User
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
