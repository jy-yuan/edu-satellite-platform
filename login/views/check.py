from .decorator import superuser_required, admin_required
import json
from django.contrib.auth.models import User
import os
from dbtest.settings import MEDIA_ROOT
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from login.models import Program, UserExtension
from .notice import create_notice


@login_required(login_url='/')
@superuser_required
def checking_view(request):
    """
    doc
    """
    msg = {}
    msg['Code'] = False
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        id = paramdic['id']
        program = Program.objects.get(id=id)
        if program.owner.group.leader.user != request.user and request.user.extension.permission != 'ADMIN':
            msg['Message'] = 'Permission Denied'
        else:
            msg['Code'] = True
            if program.status == 'TOCHECK':
                program.status = 'CHECKING'
                program.save()
                create_notice(fromuser=request.user.extension,
                              touser=program.owner,
                              title='程序审核中',
                              text='您的程序 ' + str(program) + ' 正在审核中，处理人：' +
                              str(request.user))
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)


@login_required(login_url='/')
@superuser_required
def checksuccess_view(request):
    msg = {}
    msg['Code'] = False
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        id = paramdic['id']
        program = Program.objects.get(id=id)
        if request.user.extension.permission != 'ADMIN' and program.owner.group.leader.user != request.user:
            msg['Message'] = 'Permission Denied'
        else:
            msg['Code'] = True
            if program.status == 'CHECKING':
                if request.user.extension.permission == 'ADMIN':
                    program.status = 'SENT'
                else:
                    program.status = 'CHECKSUCCESS'
                create_notice(fromuser=request.user.extension,
                    touser=program.owner,
                    title='程序审核成功',
                    text='您的程序 ' + str(program) + ' 审核成功，处理人：' +
                    str(request.user))
                program.save()
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)


@login_required(login_url='/')
@superuser_required
def submit_view(request):
    """
    doc
    """
    msg = {}
    msg['Code'] = False
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        id = paramdic['id']
        program = Program.objects.get(id=id)
        if request.user.extension.permission != 'ADMIN' and program.owner.group.leader.user != request.user:
            msg['Message'] = 'Permission Denied'
        else:
            msg['Code'] = True
            if program.status == 'CHECKSUCCESS':
                if request.user.extension.permission == 'ADMIN':
                    program.status = 'SENT'
                    create_notice(fromuser=request.user.extension,
                        touser=program.owner,
                        title='程序上星成功',
                        text='您的程序 ' + str(program) + ' 上星成功，处理人：' +
                        str(request.user))
                else:
                    program.status = 'TOSEND'
                program.save()
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)


@login_required(login_url='/')
@superuser_required
def checkfailed_view(request):
    """
    doc
    """
    msg = {}
    msg['Code'] = False
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        id = paramdic['id']
        program = Program.objects.get(id=id)
        if request.user.extension.permission != 'ADMIN' and program.owner.group.leader.user != request.user :
            msg['Message'] = 'Permission Denied'
        else:
            msg['Code'] = True
            if program.status == 'CHECKING':
                program.status = 'CHECKFAILED'
                create_notice(fromuser=request.user.extension,
                    touser=program.owner,
                    title='程序审核失败',
                    text='您的程序 ' + str(program) + ' 审核失败，处理人：' +
                    str(request.user))
                program.save()
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)


@login_required(login_url='/')
@admin_required
def send_view(request):
    """
    doc
    """
    msg = {}
    msg['Code'] = False
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        id = paramdic['id']
        program = Program.objects.get(id=id)
        msg['Code'] = True
        if program.status == 'TOSEND':
            program.status = 'SENT'
            create_notice(fromuser=request.user.extension,
                touser=program.owner,
                title='程序上星成功',
                text='您的程序 ' + str(program) + ' 上星成功，处理人：' +
                str(request.user))
            program.save()
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)


@login_required(login_url='/')
@admin_required
def done_view(request):
    """
    doc
    """
    msg = {}
    msg['Code'] = False
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        id = paramdic['id']
        program = Program.objects.get(id=id)
        msg['Code'] = True
        program.status = 'DONE'
        create_notice(fromuser=request.user.extension,
                touser=program.owner,
                title='程序运行完毕',
                text='您的程序 ' + str(program) + ' 运行完毕，处理人：' +
                str(request.user))
        program.save()
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)


def check_group_view(request):
    """
    doc
    """
    msg = {}
    msg['Code'] = False
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        username = paramdic['username']
        checkuser = User.objects.get(username=username)
        userextension = UserExtension.objects.get(id=checkuser.extension.id)
        id = paramdic['id']
        user = request.user
        group = user.extension.groups.get(id=id)
        if userextension.group == group:
            userextension.gstatu = 'IN'
            userextension.save()
            print(userextension.gstatu)
            msg['Message'] = userextension.show()
            msg['Code'] = True
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)
