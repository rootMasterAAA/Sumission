# Generated by Django 4.2.2 on 2023-07-05 09:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Transaction', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transaction',
            name='location',
        ),
    ]