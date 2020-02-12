import json
from login.models import Notice, Program, UserExtension
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .decorator import superuser_required,admin_required

def create_notice(fromuser,touser,title,text):
    newnotice = Notice.objects.create(fromuser=fromuser,touser=touser,title=title,text=text)
    newnotice.save()

@login_required(login_url='/')
def read_notice_view(request):
    msg = {
        'Code':True,
        'Message':''
    }
    try:
        userextension = request.user.extension
        for notice in userextension.notices.all():
            notice.status = 'READ'
            notice.save()
        msg['Code'] = True
        msg['Message'] = 'success'
    except Exception as e:
        msg['Message'] = str(e)
    return JsonResponse(msg)

