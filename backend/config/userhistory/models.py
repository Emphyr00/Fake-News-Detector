from django.db import models
from django.contrib.auth.models import User


class Text(models.Model):
    content = models.TextField()
    isFakeNews = models.BooleanField(default=False)

    def __str__(self):
        return self.content
