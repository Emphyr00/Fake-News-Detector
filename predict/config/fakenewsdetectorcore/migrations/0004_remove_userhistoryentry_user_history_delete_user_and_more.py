# Generated by Django 4.2.1 on 2023-06-11 08:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fakenewsdetectorcore', '0003_prediction'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userhistoryentry',
            name='user_history',
        ),
        migrations.DeleteModel(
            name='User',
        ),
        migrations.DeleteModel(
            name='UserHistory',
        ),
        migrations.DeleteModel(
            name='UserHistoryEntry',
        ),
    ]