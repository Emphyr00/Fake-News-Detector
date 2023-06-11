from django.db import models


class Prediction(models.Model):
    objects = models.Manager()
    user_id = models.IntegerField()
    prediction_value = models.BooleanField(default=False)

    def __str__(self):
        return f"Prediction {self.pk}"



