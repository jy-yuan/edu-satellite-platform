import json
import os
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse,JsonResponse
from dbtest.settings import MEDIA_DIR,MEDIA_ROOT
from login.models import UserExtension

def login_view(request):
    """
    @api {post} login/ Login
    @apiName Login
    @apiGroup LoginApis
    @apiDescription judge login
    @apiParam username The Only identify of user
    @apiParam password Password
    @apiSuccess {json} msg Login Success
    @apiSuccessExample {json} Success-Response
        HTTP/1.1 200 OK
        {
            "Code": true,
            "permission": "SUPERUSER",
            "Message": "login success, username is cwl, permission is SUPERUSER"
        }
    @apiError PasswordError wrong password or no such user
    @apiErrorExample {json} Error-Response
        HTTP/1.1 500
        {
            "Code": false,
            "permission": "NONE",
            "Message": "password error"
        }
        
    """
    msg = {}
    msg['Code'] = False
    msg['permission'] = 'NONE'
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        username = paramdic['username']
        password = paramdic['password']
        user = authenticate(request, username=username, password=password)
        msg['Message'] = 'password error'
        if user is not None:
            msg['permission'] = str(user.extension.permission)
            msg['Code'] = True
            msg['Message'] = 'login success, username is ' + username + ", permission is " + user.extension.permission
            if msg['permission'] == 'NONE':
                return HttpResponse(json.dumps(msg),
                                    content_type='application/json')
            login(request, user)
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)


def register_view(request):
    """
    @api {post} register/ Register
    @apiName Register
    @apiGroup LoginApis
    @apiDescription judge register
    @apiParam username The Only identify of user
    @apiParam password Password
    @apiParam mobile The mobile number of user
    @apiParam email The email of user
    @apiParam code The judge code
    @apiSuccess {json} msg Register Success
    @apiSuccessExample {json} Success-Response
        HTTP/1.1 200 OK
        {
            "Code": true,
            "Message": "success"
        }
    @apiError CodeError code is not same as the code sent
    @apiErrorExample {json} Error-Response
        HTTP/1.1 200 OK
        {
            "Code": false,
            "Message": "code error"
        }
    """
    msg = {}
    msg['Code'] = False
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        print("dasfadsfasfs", paramdic)
        username = paramdic['username']
        password = paramdic['password']
        mobile = paramdic['mobile']
        code = paramdic['code']
        email = paramdic['email']
    except:
        return JsonResponse(msg)
    try:
        user = User.objects.get(username=username)
    except:
        code2 = request.session.get('code')
        if code == code2:
            user = User.objects.create_user(username=username,
                                            email=email,
                                            password=password)
            user.extension.mobile = mobile
            user.save()
            if (os.path.exists(os.path.join(MEDIA_ROOT, username))):
                pass
            else:
                os.makedirs(os.path.join(MEDIA_ROOT, username))
                os.makedirs(os.path.join(MEDIA_ROOT, username, "programs"))
            msg['Code'] = True
            msg['Message'] = "success"
        else:
            msg['Code'] = False
            msg['Message'] = "code error"
    return JsonResponse(msg)


def logout_view(request):
    """
    @api {post} logout/ Logout
    @apiName Logout
    @apiGroup LoginApis
    @apiDescription logout the present user
    @apiSuccess {json} msg Logout Success
    """
    logout(request)
    return HttpResponse()

