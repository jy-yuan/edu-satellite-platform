import json
import os
import random
from django.contrib.auth.models import User
from aliyunsdkcore.client import AcsClient
from aliyunsdkcore.request import CommonRequest
from django.core.mail import send_mail
from django.http import HttpResponse, JsonResponse

from dbtest.settings import DEFAULT_FROM_EMAIL


def send_mail_view(request):
    """
    doc
    """
    msg = {}
    msg['Code'] = False
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        email = paramdic['email']
    except:
        return JsonResponse(msg)
    try:
        user = User.objects.get(email=email)
        return JsonResponse(msg)
    except:
        pass
    code = get_code()
    rec = []
    rec.append(email)
    send_mail('code', str(code), DEFAULT_FROM_EMAIL, rec)
    se = request.session
    se['code'] = code
    msg['Code'] = True
    return JsonResponse(msg)


def send_msg_view(request):
    """
    doc
    """
    msg = {}
    msg['Code'] = False
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        mobile = paramdic['mobile']
    except:
        return JsonResponse(msg)
    try:
        userextension = UserExtension.objects.get(mobile=mobile)
        return JsonResponse(msg)
    except:
        pass
    print(mobile)
    client = AcsClient('LTAI4FtP4aHC9LsJSjXVP7E1',
                       'WVbkP1n4AyKnR7oaSYmYT0N1nqDNfO', 'cn-hangzhou')
    msgrequest = CommonRequest()
    msgrequest.set_accept_format('json')
    msgrequest.set_domain('dysmsapi.aliyuncs.com')
    msgrequest.set_method('POST')
    msgrequest.set_protocol_type('https')  # https | http
    msgrequest.set_version('2017-05-25')
    msgrequest.set_action_name('SendSms')
    msgrequest.add_query_param('RegionId', "cn-hangzhou")
    msgrequest.add_query_param('PhoneNumbers', mobile)
    msgrequest.add_query_param('SignName', "卫星程序平台")
    msgrequest.add_query_param('TemplateCode', "SMS_175061331")
    param = {}
    param['code'] = get_code()
    print(param['code'])
    msgrequest.add_query_param('TemplateParam', json.dumps(param))
    response = client.do_action_with_exception(msgrequest)
    res = str(response, encoding='utf-8')
    resdic = json.loads(res)
    if resdic['Code'] == 'OK':
        msg['Code'] = True
        se = request.session
        se['code'] = param['code']
    else:
        print(resdic['Code'])
    return JsonResponse(msg)


def get_code():
    """
    doc
    """
    code = ''
    for i in range(0, 6):
        code = code + str(random.randint(0, 9))
    return code


def check_filename_available(filename):
    """
    doc
    """
    n = [0]

    def check_meta(file_name):
        file_name_new = file_name
        if os.path.isfile(file_name):
            file_name_new = file_name[:file_name.rfind('.')] + '_' + str(
                n[0]) + file_name[file_name.rfind('.'):]
            n[0] += 1
        if os.path.isfile(file_name_new):
            file_name_new = check_meta(file_name)
        return file_name_new

    return_name = check_meta(filename)
    return return_name
