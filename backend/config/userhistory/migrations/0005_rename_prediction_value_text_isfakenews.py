# Generated by Django 4.2.1 on 2023-06-11 14:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userhistory', '0004_rename_is_fake_news_text_prediction_value'),
    ]

    operations = [
        migrations.RenameField(
            model_name='text',
            old_name='prediction_value',
            new_name='isFakeNews',
        ),
    ]
