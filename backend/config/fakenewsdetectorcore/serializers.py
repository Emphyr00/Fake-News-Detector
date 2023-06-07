from rest_framework import serializers
from .models import UserHistoryEntry, UserHistory, User


class UserHistoryEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserHistoryEntry
        fields = '__all__'


class UserHistorySerializer(serializers.ModelSerializer):
    entries = UserHistoryEntrySerializer(many=True, read_only=True)

    class Meta:
        model = UserHistory
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
