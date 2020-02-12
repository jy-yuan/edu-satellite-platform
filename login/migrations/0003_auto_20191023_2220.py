# Generated by Django 2.2.4 on 2019-10-23 14:20

from django.db import migrations, models
import login.models


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0002_program'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userextension',
            name='avatar',
            field=models.ImageField(default='avatars/default.svg', upload_to=login.models.upload_to),
        ),
    ]
