from django.db import models
from django.contrib.auth.models import User


class Prediction(models.Model):
    objects = models.Manager()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    prediction_value = models.BooleanField(default=False)
    text_id = models.IntegerField()

    def __str__(self):
        return f"Prediction {self.pk}"
