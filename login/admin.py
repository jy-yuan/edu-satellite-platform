"""
register the self-models and use the admin site to manage
"""
from django.contrib import admin
from .models import UserExtension, Program, Group, Video, Article
# Register your models here.

admin.site.register(UserExtension)
admin.site.register(Program)
admin.site.register(Group)
admin.site.register(Video)
admin.site.register(Article)
