# Generated by Django 2.2.4 on 2019-11-05 09:15

import datetime
from django.db import migrations, models
import django.utils.timezone
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0016_auto_20191105_1714'),
    ]

    operations = [
        migrations.AlterField(
            model_name='program',
            name='create_timestamp',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='program',
            name='post_timestamp',
            field=models.DateTimeField(default=datetime.datetime(2019, 11, 5, 9, 15, 58, 615425, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='video',
            name='create_timestamp',
            field=models.DateTimeField(default=datetime.datetime(2019, 11, 5, 9, 15, 58, 615425, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='video',
            name='post_timestamp',
            field=models.DateTimeField(default=datetime.datetime(2019, 11, 5, 9, 15, 58, 615425, tzinfo=utc)),
        ),
    ]
