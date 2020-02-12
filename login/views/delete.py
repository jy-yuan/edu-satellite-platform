import json
import os

from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse

from login.models import Group, LikeHandle, User, UserExtension, Program, Video, Article
from .get import get_videolist_view, get_articles_view
from .decorator import admin_required, superuser_required

@login_required(login_url='/')
@superuser_required
def change_description_view(request):
    msg = {}
    msg['Code'] = False
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        id = paramdic['id']
        description = paramdic['description']
        video = Video.objects.get(id=id)
        video.description = description
        video.save()
        return get_videolist_view(request)
    except Exception as e:
        msg['Message'] = str(e)
    return JsonResponse(msg)

@login_required(login_url='/')
@superuser_required
def delete_video_view(request):
    msg = {}
    msg['Code'] = False
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        id = paramdic['id']
        video = Video.objects.get(id=id)
        msg['Message'] = 'param error'
        if request.user.extension == video.owner or request.user.extension.permission == 'ADMIN':
            video.delete()
            return get_videolist_view(request)
    except Exception as e:
        msg['Message'] = str(e)
    return JsonResponse(msg)

@login_required(login_url='/')
def delete_article_view(request):
    msg = {}
    msg['Code'] = False
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        id = paramdic['id']
        article = Article.objects.get(id=id)
        msg['Message'] = 'param error'
        if request.user.extension == article.author or request.user.extension.permission != 'USER':
            article.delete()
            return get_articles_view(request)
    except Exception as e:
        msg['Message'] = str(e)
    return JsonResponse(msg)
