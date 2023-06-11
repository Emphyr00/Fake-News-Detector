# celery.py
from __future__ import absolute_import
import os
from celery import Celery
from celery import shared_task
from django.conf import settings

os.environ.setdefault("DJANGO_SETTINGS_MODULE", 'userhistory.settings')
app = Celery("userhistory", broker='amqp://guest:guest@localhost:5672//')
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

@shared_task
def process_message(message_body):
   print(message_body)