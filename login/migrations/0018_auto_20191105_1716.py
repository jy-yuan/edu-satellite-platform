# Generated by Django 2.2.4 on 2019-11-05 09:16

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0017_auto_20191105_1715'),
    ]

    operations = [
        migrations.AlterField(
            model_name='program',
            name='post_timestamp',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='video',
            name='create_timestamp',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='video',
            name='post_timestamp',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
