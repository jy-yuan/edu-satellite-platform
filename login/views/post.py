from .decorator import superuser_required,admin_required
import json
import os
from dbtest.settings import MEDIA_ROOT
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from login.models import UserExtension,Program,Video,Article
from django.contrib.auth.models import User
from .notice import create_notice

@login_required(login_url='/')
def post_article_view(request):
    """
    doc
    """
    msg = {}
    msg['Code'] = False
    try:
        postbody = request.body
        paramdic = json.loads(postbody)
        title = paramdic['title']
        text = paramdic['text']
        user = request.user
        newarticle = Article.objects.create(title=title,
                                            text=text,
                                            author=user.extension)
        newarticle.save()
        msg['Message'] = newarticle.to_json()
        msg['Code'] = True
        return JsonResponse(msg)
    except Exception as e:
        msg['Message'] = str(e)
        return JsonResponse(msg)



@login_required(login_url='/')
def post_avatar_view(request):
    """
    post avatar of user
    """
    msg = {}
    msg['Code'] = False
    try:
        username = request.user.username
        user_this = request.user
        avatar = request.FILES.get('avatar', None)
        print(1)
        if not avatar:
            print(2)
            return HttpResponse(json.dumps(msg),
                                content_type='application/json')
        tmp = open(os.path.join(MEDIA_ROOT, username, "tmp"), mode='w')
        tmp.close()
        destination = open(os.path.join(MEDIA_ROOT, username, "tmp"),
                           'wb+')  # 打开特定的文件进行二进制的写操作
        for chunk in avatar.chunks():  # 分块写入文件
            destination.write(chunk)
        user_this.extension.avatar.save(avatar.name, destination)
        destination.close()
        os.remove(os.path.join(MEDIA_ROOT, username, "tmp"))
        msg['Code'] = True
        msg['Message'] = 'media/' + str(user_this.extension.avatar)
    except Exception as e:
        msg['Message'] = str(e)
        pass
    return JsonResponse(msg)


@login_required(login_url='/')
def post_program_view(request):
    """
    post program
    """
    msg = {}
    msg['Code'] = False
    msg['Message'] = 'nofile'
    try:
        user_this = request.user
        username = user_this.username
        program = request.FILES.get('program', None)
        description = request.POST.get('description',"")
        if not program:
            return HttpResponse(json.dumps(msg),
                                content_type='application/json')
        tmp = open(os.path.join(MEDIA_ROOT, username, "tmp_pro"), mode='w')
        tmp.close()
        destination = open(os.path.join(MEDIA_ROOT, username, "tmp_pro"),
                           'wb+')  # 打开特定的文件进行二进制的写操作
        for chunk in program.chunks():  # 分块写入文件
            destination.write(chunk)
        new_program = Program.objects.create(title=program.name,
                                             owner=user_this.extension,
                                             description=description)
        new_program.text.save(program.name, destination)
        destination.close()
        testpath = os.path.join(MEDIA_ROOT, username, "tmp_pro")
        testcmd = 'pyflakes ' + testpath
        testans = os.popen(testcmd).read()
        os.remove(os.path.join(MEDIA_ROOT, username, "tmp_pro"))
        if len(testans) == 0:
            msg['Code'] = True
            msg['Message'] = 'media/' + str(new_program.text)
        else:
            msg['Message'] = testans
            create_notice(fromuser=request.user.extension,
                touser=program.owner,
                title='程序语法检查失败',
                text='您的程序 ' + str(program) + ' 语法检查失败')
            new_program.status = 'PYFAILED'
            new_program.save()
    except Exception as e:
        print(e)
        msg['Message'] = str(e)
        pass
    return JsonResponse(msg)


@login_required(login_url='/')
@superuser_required
def post_video_view(request):
    """
    post video
    """
    msg = {}
    print('start')
    msg['Code'] = False
    msg['Message'] = 'nofile'
    try:
        user_this = request.user
        username = user_this.username
        video = request.FILES.get('program', None)
        description = request.POST.get('description',"")
        if not video:
            print(2)
            return HttpResponse(json.dumps(msg),
                                content_type='application/json')
        tmp = open(os.path.join(MEDIA_ROOT, username, "tmp_vid"), mode='w')
        tmp.close()
        destination = open(os.path.join(MEDIA_ROOT, username, "tmp_vid"),
                           'wb+')  # 打开特定的文件进行二进制的写操作
        for chunk in video.chunks():  # 分块写入文件
            destination.write(chunk)
        new_video = Video.objects.create(title=video.name,
                                         owner=user_this.extension,
                                         description=description)
        new_video.video.save(video.name, destination)
        destination.close()
        os.remove(os.path.join(MEDIA_ROOT, username, "tmp_vid"))
        msg['Code'] = True
        msg['Message'] = 'media/' + str(new_video.video)
    except Exception as e:
        print(e)
        msg['Message'] = str(e)
        pass
    return JsonResponse(msg)

