'''
views that contains login and register func
'''
import json
import os
import random

from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core import serializers
from django.core.files.base import ContentFile
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.db.models import Q
from dbtest.settings import DEFAULT_FROM_EMAIL, MEDIA_ROOT
from login.models import (PERMISSION_STATUS, PROGRAM_STATUS, SENT_STATUS,
                          SUCCESS_STATUS, Article, Group, LikeHandle, Program,
                          UserExtension, Video)

from .decorator import admin_required, superuser_required

# Create your views here.





@login_required(login_url='/')
def get_view(request):
    """
    @api {post} get/ Get
    @apiName Get
    @apiDescription Get Basic Info
    @apiSuccess {json} msg Basic Info
    @apiGroup GetApis
    @apiSuccessExample {json} Success-Response:
        HTTP/1.1 200 OK
        {
            "Code": true,
            "Message": {
                "id": "1",
                "username": "admin",
                "group": null,
                "leader": null,
                "school": "Tsinghua",
                "email": "",
                "mobile": "",
                "permission": "USER",
                "avatar": "media/avatars/default.svg",
                "programs": [
                    {
                        "id": "1",
                        "title": "program1",
                        "src": "media/admin/programs/CHAP02.3.1.pdf",
                        "description": "program1",
                        "owner": "admin",
                        "school": "Tsinghua",
                        "status": "TOCHECK",
                        "likes": "0",
                        "time": "2019-11-13 14:27:05",
                        "time2": "2019-11-13 14:27:05",
                        "downloads": "0"
                    }
                ],
                "groups": [
                    {
                        "id": "1",
                        "name": "superuser",
                        "leader": "admin",
                        "students": [
                            {
                                "id": 1,
                                "username": "admin",
                                "permission": "USER",
                                "avatar": "media/avatars/default.svg",
                                "groupstatus": "OUT",
                                "group": "superuser"
                            },
                            {
                                "id": 2,
                                "username": "cwl",
                                "permission": "USER",
                                "avatar": "media/avatars/default.svg",
                                "groupstatus": "OUT",
                                "group": "superuser"
                            }
                        ]
                    }
                ],
                "groupstatus": "OUT"
            }
        }
    """
    msg = {}
    msg['Code'] = True
    user = request.user
    msg['Message'] = user.extension.to_json()
    return JsonResponse(msg)



@login_required(login_url='/')
def get_videolist_view(request):
    """
    @api {post} getvideos/ GetVideos
    @apiName GetVideoList
    @apiDescription Get Video List
    @apiSuccess {json} msg VideoList
    @apiGroup GetApis
    @apiSuccessExample {json} Success-Response
        HTTP/1.1 200 OK
        {
            "Code": true,
            "Message": [
                {
                    "id": "1",
                    "header": "video1",
                    "description": "video1",
                    "owner": "cwl",
                    "src": "media/cwl/videos/2.mp4",
                    "time": "2019-11-13 14:59:26",
                    "time2": "2019-11-13 14:59:26",
                    "views": "0",
                    "likes": "0"
                }
            ]
        }
    """
    msg = {}
    videolist = []
    msg['Code'] = False
    videos = Video.objects.all()
    for video in videos:
        videolist.append(video.to_json())
    msg['Code'] = True
    msg['Message'] = videolist
    return JsonResponse(msg)


@login_required(login_url='/')
def download_file_view(request):
    """
    @apiIgnore NoUsed
    """
    msg = {}
    msg['Code'] = False
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        id = paramdic['id']
        program = Program.objects.get(id=id)
        msg['Message'] = 'media/' + str(program.text)
        msg['Code'] = True
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)

"""
@apiDefine MyError
@apiError PermissionDenied Only SuperUser/Admin
@apiErrorExample {json} Success-Response
    HTTP/1.1 500
    {
        "Code": false,
        "Message": "Permission Denied"
    }
"""

@login_required(login_url='/')
@superuser_required
def get_group_programs_view(request):
    """
    @api {post} getgroupprograms/ GetGroupPrograms
    @apiName GetGroupPrograms
    @apiDescription Get Programs of User-Leading Groups
    @apiSuccess {json} msg ProgramList
    @apiGroup GetApis
    @apiSuccessExample {json} Success-Response
        HTTP/1.1 200 OK
        {
            "Code": true,
            "Message": [
                {
                    "name": "superuser",
                    "programs": [
                        {
                            "id": "1",
                            "title": "program1",
                            "src": "media/admin/programs/CHAP02.3.1.pdf",
                            "description": "program1",
                            "owner": "admin",
                            "school": "Tsinghua",
                            "status": "TOCHECK",
                            "likes": "0",
                            "time": "2019-11-13 14:27:05",
                            "time2": "2019-11-13 14:27:05",
                            "downloads": "0"
                        }
                    ]
                }
            ]
        }
    @apiUse MyError
    """
    msg = {}
    diclist = []
    msg['Code'] = False
    groups = []
    nonelist = []
    for program in Program.objects.all():
        if program.owner.group == None:
            nonelist.append(program.to_json())
    if request.user.extension.permission == 'SUPERUSER':
        groups = request.user.extension.groups.all()
    else:
        groups = Group.objects.all()
        newdic = {}
        newdic['name'] = '组外成员'
        newdic['programs'] = nonelist
        diclist.append(newdic)
    for group in groups:
        newdic = {}
        newdic['name'] = group.name
        newdic['programs'] = group.programs()
        diclist.append(newdic)
    msg['Code'] = True
    msg['Message'] = diclist
    return JsonResponse(msg)


@login_required(login_url='/')
def get_articles_view(request):
    """
    @api {post} getarticles/ GetArticles
    @apiName GetArticles
    @apiDescription Get Articles of Discussion
    @apiSuccess {json} msg ArticleList
    @apiGroup GetApis
    @apiSuccessExample {json} Success-Response
        HTTP/1.1 200 OK
        {
            "Code": true,
            "Message": [
                {
                    "id": 1,
                    "title": "一楼",
                    "text": "中文测试",
                    "time": "2019-11-05 12:34:47",
                    "author": {
                        "id": 5,
                        "username": "cwl",
                        "permission": "USER",
                        "avatar": "media/cwl/avatars/xbd.jpg",
                        "groupstatus": "IN",
                        "group": "yjygroup"
                    },
                    "Re": null
                },
                {
                    "id": 2,
                    "title": "二楼",
                    "text": "lzsb",
                    "time": "2019-11-05 12:41:19",
                    "author": {
                        "id": 3,
                        "username": "yjy",
                        "permission": "SUPERUSER",
                        "avatar": "media/yjy/avatars/alg_ilnbA0O.jpg",
                        "groupstatus": "IN",
                        "group": "superuser"
                    },
                    "Re": "一楼"
                },
            ]
        }
    """
    msg = {}
    articlelist = []
    msg['Code'] = False
    try:
        articles = Article.objects.all()
        for article in articles:
            articlelist.append(article.to_json())
        msg['Code'] = True
        msg['Message'] = articlelist
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)

@login_required(login_url='/')
def get_groups_view(request):
    """
    @api {post} getgroups/ GetGroups
    @apiName GetGroupList
    @apiDescription Get GroupList
    @apiSuccess {json} msg GroupList
    @apiGroup GetApis
    @apiSuccessExample {json} Success-Response
        HTTP/1.1 200 OK
        {
            "Code": true,
            "Message": {
                "groups": [
                    {
                        "id": "1",
                        "name": "superuser",
                        "leader": "admin",
                        "students": [
                            {
                                "id": 1,
                                "username": "admin",
                                "permission": "USER",
                                "avatar": "media/avatars/default.svg",
                                "groupstatus": "OUT",
                                "group": "superuser"
                            },
                            {
                                "id": 2,
                                "username": "cwl",
                                "permission": "USER",
                                "avatar": "media/avatars/default.svg",
                                "groupstatus": "OUT",
                                "group": "superuser"
                            }
                        ]
                    }
                ],
                "groupid": 1
            }
        }
    """
    msg = {}
    grouplist = []
    msg['Code'] = False
    groups = Group.objects.all()
    for group in groups:
        grouplist.append(group.to_json())
    msg['Code'] = True
    newdic = {}
    newdic['groups'] = grouplist
    if request.user.extension.group is not None:
        newdic['groupid'] = request.user.extension.group.id
    else:
        newdic['groupid'] = 0
    msg['Message'] = newdic
    return JsonResponse(msg)


@login_required(login_url='/')
@admin_required
def get_users_view(request):
    """
    @api {post} getusers/ GetUsers
    @apiName GetUsers
    @apiDescription Get All Users List
    @apiSuccess {json} msg UserList
    @apiGroup GetApis
    @apiSuccessExample {json} Success-Response
        HTTP/1.1 200 OK
        {
            "Code": true,
            "Message": [
                {
                    "id": "1",
                    "username": "administrator",
                    "group": "superuser",
                    "leader": "administrator",
                    "school": "Tsinghua",
                    "email": "",
                    "mobile": "114514",
                    "permission": "ADMIN",
                    "avatar": "media/avatars/default.svg",
                    "programs": [],
                    "groups": [
                        {
                            "id": "1",
                            "name": "superuser",
                            "leader": "administrator",
                            "students": [
                                {
                                    "id": 1,
                                    "username": "administrator",
                                    "permission": "ADMIN",
                                    "avatar": "media/avatars/default.svg",
                                    "groupstatus": "OUT",
                                    "group": "superuser"
                                },
                                {
                                    "id": 2,
                                    "username": "ys",
                                    "permission": "SUPERUSER",
                                    "avatar": "media/ys/avatars/cxk_jF6Bh1f.jpg",
                                    "groupstatus": "IN",
                                    "group": "superuser"
                                },
                                {
                                    "id": 3,
                                    "username": "yjy",
                                    "permission": "SUPERUSER",
                                    "avatar": "media/yjy/avatars/alg_ilnbA0O.jpg",
                                    "groupstatus": "IN",
                                    "group": "superuser"
                                },
                                {
                                    "id": 4,
                                    "username": "wyt",
                                    "permission": "SUPERUSER",
                                    "avatar": "media/avatars/default.svg",
                                    "groupstatus": "IN",
                                    "group": "superuser"
                                }
                            ]
                        },
                        {
                            "id": "6",
                            "name": "奥里给",
                            "leader": "administrator",
                            "students": []
                        }
                    ],
                    "groupstatus": "OUT"
                },
                {
                    "id": "2",
                    "username": "ys",
                    "group": "superuser",
                    "leader": "administrator",
                    "school": "Tsinghua",
                    "email": "",
                    "mobile": "114514",
                    "permission": "SUPERUSER",
                    "avatar": "media/ys/avatars/cxk_jF6Bh1f.jpg",
                    "programs": [],
                    "groups": [
                        {
                            "id": "2",
                            "name": "ysgroup",
                            "leader": "ys",
                            "students": []
                        },
                        {
                            "id": "4",
                            "name": "bb",
                            "leader": "ys",
                            "students": []
                        }
                    ]
                    "groupstatus": "IN"
                }
            ]
        }
    @apiUse MyError
    """
    msg = {}
    userlist = []
    try:
        msg['Code'] = False
        users = UserExtension.objects.all()
        for user in users:
            userlist.append(user.to_json())
        msg['Code'] = True
        msg['Message'] = userlist
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)

@login_required(login_url='/')
def get_programs_view(request):
    """
    @api {post} getprograms/ GetPrograms
    @apiName GetPrograms
    @apiDescription Get Articles of Discussion
    @apiSuccess {json} msg ProgramList
    @apiGroup GetApis
    @apiSuccessExample {json} Success-Response
        HTTP/1.1 200 OK
        {
            "Code": true,
            "Message": {
                "programs1": [
                    {
                        "id": "1",
                        "title": "test.py",
                        "src": "media/yjy/programs/test.py",
                        "description": "1",
                        "owner": "yjy",
                        "school": "Tsinghua",
                        "status": "SENT",
                        "likes": "5",
                        "time": "2019-11-05 12:45:35",
                        "time2": "2019-11-09 16:08:56",
                        "downloads": "0",
                        "likestatus": true
                    }
                ],
                "programs2": [
                    {
                        "id": "8",
                        "title": "wrong.py",
                        "src": "media/cwl/programs/wrong.py",
                        "description": "",
                        "owner": "cwl",
                        "school": "Tsinghua",
                        "status": "SENT",
                        "likes": "2",
                        "time": "2019-11-07 09:10:52",
                        "time2": "2019-11-12 06:43:09",
                        "downloads": "0",
                        "likestatus": false
                    }
                ]
            }
        }
    """
    msg = {}
    msg['Code'] = False
    try:
        user = request.user.extension
        programs1 = get_best_programs(user)
        programs2 = get_latest_programs(user)
        dic = {}
        dic['programs1'] = programs1
        dic['programs2'] = programs2
        msg['Message'] = dic
        msg['Code'] = True
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)


@login_required(login_url='/')
def get_pending_programs_view(request):
    """
    @api {post} getpending/ GetPendingPrograms
    @apiName GetPendingPrograms
    @apiDescription Get Pending Programs
    @apiSuccess {json} msg ProgramList
    @apiGroup GetApis
    @apiSuccessExample {json} Success-Response
        HTTP/1.1 200 OK
        {
            "Code": true,
            "Message": {
                "programs": [
                    {
                        "id": "8",
                        "title": "wrong.py",
                        "src": "media/cwl/programs/wrong.py",
                        "description": "",
                        "owner": "cwl",
                        "school": "Tsinghua",
                        "status": "SENT",
                        "likes": "2",
                        "time": "2019-11-07 09:10:52",
                        "time2": "2019-11-12 06:43:09",
                        "downloads": "0",
                        "likestatus": false
                    },
                    {
                        "id": "7",
                        "title": "correct.py",
                        "src": "media/cwl/programs/correct.py",
                        "description": "",
                        "owner": "cwl",
                        "school": "Tsinghua",
                        "status": "SENT",
                        "likes": "3",
                        "time": "2019-11-07 09:10:35",
                        "time2": "2019-11-12 05:48:48",
                        "downloads": "0",
                        "likestatus": true
                    },
                    {
                        "id": "6",
                        "title": "urls.py",
                        "src": "media/yjy/programs/urls.py",
                        "description": "",
                        "owner": "yjy",
                        "school": "Tsinghua",
                        "status": "SENT",
                        "likes": "2",
                        "time": "2019-11-07 08:29:41",
                        "time2": "2019-11-13 13:26:58",
                        "downloads": "0",
                        "likestatus": false
                    }
                ]
            }
        }
    """
    msg = {}
    msg['Code'] = False
    try:
        user = request.user.extension
        programs = get_pending_programs(user)
        dic = {}
        dic['programs'] = programs
        msg['Message'] = dic
        msg['Code'] = True
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)


def get_best_programs(user):
    #...
    prolist = []
    for pro in Program.objects.all():
        if pro.status in SENT_STATUS:
            newdic = pro.to_json()
            if pro in user.likeprograms.all():
                newdic['likestatus'] = True
            else:
                newdic['likestatus'] = False
            prolist.append(newdic)
    prolist = sorted(prolist, key=lambda pro: pro['likes'])
    prolist.reverse()
    return prolist


def get_latest_programs(user):
    """
    doc
    """
    prolist = []
    for pro in Program.objects.all():
        if pro.status in SENT_STATUS:
            newdic = pro.to_json()
            if pro in user.likeprograms.all():
                newdic['likestatus'] = True
            else:
                newdic['likestatus'] = False
            prolist.append(newdic)
    prolist.reverse()
    return prolist


def get_pending_programs(user):
    """
    doc
    """
    prolist = []
    for pro in Program.objects.all():
        if pro.status in SUCCESS_STATUS:
            newdic = pro.to_json()
            if pro in user.likeprograms.all():
                newdic['likestatus'] = True
            else:
                newdic['likestatus'] = False
            prolist.append(newdic)
    prolist.reverse()
    return prolist

def search_video_view(request):
    """
    @api {post} searchvideo/ SearchVideo
    @apiGroup GetApis
    @apiName SearchVideo
    @apiDescrtion SearchVideo by keyword
    @apiSuccess {json} msg SearchedVideos
    @apiSuccessExample {json} Success-Response
        HTTP/1.1 200 OK
        {
            "Code": true,
            "Message": [
                {
                    "id": "1",
                    "header": "video1",
                    "description": "video1",
                    "owner": "cwl",
                    "src": "media/cwl/videos/2.mp4",
                    "time": "2019-11-13 14:59:26",
                    "time2": "2019-11-13 14:59:26",
                    "views": "0",
                    "likes": "0"
                }
            ]
        }
    """
    msg = {
        'Code':False,
    }
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        keyword = paramdic['search']
        all_video=Video.objects.filter(Q(title__contains=keyword)|Q(description__contains=keyword)) 
        videolist = []
        for video in all_video:
            videolist.append(video.to_json())
        msg['Message'] = videolist
        msg['Code'] = True
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)

def search_post_view(request):
    """
    @api {post} searchpost/ SearchPost
    @apiGroup GetApis
    @apiName SearchPost
    @apiDescrtion Search Post(Article) by keyword
    @apiSuccess {json} msg SearchedPosts
    @apiSuccessExample {json} Success-Response
        HTTP/1.1 200 OK
        {
            "Code": true,
            "Message": [
                {
                    "id": 1,
                    "title": "一楼",
                    "text": "中文测试",
                    "time": "2019-11-05 12:34:47",
                    "author": {
                        "id": 5,
                        "username": "cwl",
                        "permission": "USER",
                        "avatar": "media/cwl/avatars/xbd.jpg",
                        "groupstatus": "IN",
                        "group": "yjygroup"
                    },
                    "Re": null
                }
            ]
        }
    """
    msg = {
        'Code':False,
    }
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        keyword = paramdic['search']
        all_articles=Article.objects.filter(Q(title__contains=keyword)|Q(text__contains=keyword)) 
        articlelist = []
        for article in all_articles:
            articlelist.append(article.to_json())
        msg['Message'] = articlelist
        msg['Code'] = True
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)