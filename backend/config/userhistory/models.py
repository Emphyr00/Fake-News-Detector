from django.db import models
from django.contrib.auth.models import User


class Text(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    isFakeNews = models.BooleanField(default=False)

    def __str__(self):
        return self.content
