# Generated by Django 4.2.1 on 2023-06-11 13:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userhistory', '0003_text_created_at_text_is_fake_news'),
    ]

    operations = [
        migrations.RenameField(
            model_name='text',
            old_name='is_fake_news',
            new_name='prediction_value',
        ),
    ]