import json
import os

from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import HttpResponse, JsonResponse

from login.models import Group, LikeHandle, UserExtension, Program

from .decorator import admin_required, superuser_required


@login_required(login_url='/')
@superuser_required
def delete_user_view(request):
    """
    doc
    """
    msg = {}
    msg['Code'] = False
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        id = paramdic['id']
        user = User.objects.get(id=id).extension
        user.group = None
        user.save()
        msg['Message'] = user.show()
        msg['Code'] = True
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)

@login_required(login_url='/')
def like_view(request):
    """
    doc
    """
    msg = {}
    msg['Code'] = False
    try:
        user = request.user.extension
        postbody = request.body
        paramdic = json.loads(postbody)
        id = paramdic['id']
        program = Program.objects.get(id=id)
        if program in user.likeprograms.all():
            msg['Message'] = 'already liked'
            return HttpResponse(json.dumps(msg),
                                content_type='application/json')
        LikeHandle.objects.create(user=user, program=program)
        program.like = program.like + 1
        program.save()
        msg['Code'] = True
        msg['Message'] = 'success'
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)



@login_required(login_url='/')
def append_group_view(request):
    """
    doc
    """
    msg = {}
    msg['Code'] = False
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        id = paramdic['id']
        checkuser = request.user
        user = UserExtension.objects.get(id=checkuser.extension.id)
        group = Group.objects.get(id=id)
        user.group = group
        user.gstatu = 'OUT'
        user.save()
        print(user.gstatu)
        print(user.show())
        msg['Message'] = user.show()
        msg['Code'] = True
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)



@login_required(login_url='/')
def change_password_view(request):
    """
    doc
    """
    msg = {}
    msg['Code'] = False
    try:
        username = str(request.user)
        postbody = request.body
        paramdic = json.loads(postbody)
        password = paramdic.get('password')
        newpassword = paramdic.get('newpassword')
        user = authenticate(request=request,
                            username=username,
                            password=password)
        if user is not None:
            if user.is_active:
                user.set_password(newpassword)
                user.save()
                msg['Code'] = True
                msg['Message'] = 'change success'
            else:
                msg['Message'] = 'no permission'
        else:
            msg['Message'] = 'old password error'
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)


@login_required(login_url='/')
@admin_required
def change_permission_view(request):
    """
    doc
    """
    msg = {}
    msg['Code'] = False
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        id = paramdic.get('id')
        user = UserExtension.objects.get(id=id)
        if user.permission == 'USER':
            user.group = Group.objects.get(id=1)
            user.permission = 'SUPERUSER'
        else:
            user.permission = 'USER'
            user.group = None
        user.save()
        msg['Code'] = True
        msg['Message'] = 'success'
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)


@login_required(login_url='/')
@superuser_required
def create_group_view(request):
    """
    doc
    """
    msg = {}
    msg['Code'] = False
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        name = paramdic['name']
        newgroup = Group.objects.create(name=name,
                                        leader=request.user.extension)
        msg['Code'] = True
        msg['Message'] = newgroup.to_json()
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)

@login_required(login_url='/')
def change_mobile_view(request):
    #judge register
    msg = {}
    msg['Code'] = False
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        mobile = paramdic['mobile']
        code = paramdic['code']
        code2 = request.session.get('code')
        if code == code2:
            request.user.extension.mobile = mobile
            request.user.extension.save()
            msg['Code'] = True
            msg['Message'] = request.user.extension.to_json()
        else:
            msg['Message'] = 'Code Error'
    except Exception as e:
        msg['Message'] = str(e)
    return JsonResponse(msg)

@login_required(login_url='/')
def change_email_view(request):
    #judge register
    msg = {}
    msg['Code'] = False
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        email = paramdic['email']
        code = paramdic['code']
        code2 = request.session.get('code')
        if code == code2:
            request.user.email = email
            request.user.save()
            msg['Code'] = True
            msg['Message'] = request.user.extension.to_json()
        else:
            msg['Message'] = 'Code Error'
    except Exception as e:
        msg['Message'] = str(e)
    return JsonResponse(msg)