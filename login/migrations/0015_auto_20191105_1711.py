# Generated by Django 2.2.4 on 2019-11-05 09:11

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0014_auto_20191104_2048'),
    ]

    operations = [
        migrations.AlterField(
            model_name='program',
            name='create_timestamp',
            field=models.DateTimeField(default=datetime.datetime(2019, 11, 5, 9, 11, 8, 380103, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='program',
            name='post_timestamp',
            field=models.DateTimeField(default=datetime.datetime(2019, 11, 5, 9, 11, 8, 380103, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='video',
            name='create_timestamp',
            field=models.DateTimeField(default=datetime.datetime(2019, 11, 5, 9, 11, 8, 380103, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='video',
            name='post_timestamp',
            field=models.DateTimeField(default=datetime.datetime(2019, 11, 5, 9, 11, 8, 380103, tzinfo=utc)),
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='article', max_length=100)),
                ('text', models.CharField(default='', max_length=500)),
                ('time', models.TimeField(auto_now_add=True)),
                ('author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='articles', to='login.UserExtension')),
                ('res', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='responses', to='login.Article')),
            ],
        ),
    ]
