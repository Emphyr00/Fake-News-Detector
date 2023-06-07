from django.urls import path, include
from rest_framework import routers

from .views import UserHistoryEntryViewSet, UserHistoryViewSet, UserViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'user-history-entries', UserHistoryEntryViewSet)
router.register(r'user-history', UserHistoryViewSet)
urlpatterns = [
    path('api/', include(router.urls)),
]
