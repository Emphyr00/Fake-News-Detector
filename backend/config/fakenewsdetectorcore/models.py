from django.db import models

class User(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    history = models.OneToOneField('UserHistory', on_delete=models.CASCADE)
    objects = models.Manager()

    def __str__(self):
        return self.username


class UserHistory(models.Model):
    objects = models.Manager()

    def __str__(self):
        return f"UserHistory {self.pk}"


class UserHistoryEntry(models.Model):
    text = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    user_history = models.ForeignKey(
        UserHistory,
        on_delete=models.CASCADE,
        related_name='entries',
        related_query_name='entry',
    )
    objects = models.Manager()

    def __str__(self):
        return self.text
