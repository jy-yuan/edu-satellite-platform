"""
@CopyRight NewFormosa
@Name models
@Version 1.0.0
@Description models used in satellite project
"""
from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.utils import timezone

from django.db.models.signals import post_save


def upload_to(instance, filename):
    """
    @apiName uploadtoavatars
    @apiGroup ModelFunction
    @apiDescription redefine the path of avatars uploaded to
    @apiParam {filename} filename FileName Users upload
    @apiSuccess {String} path Path of the File Saved
    @apiError IOERROR Path Not Found
    """
    return '/'.join([instance.user.username, 'avatars', filename])


def upload_to_file(instance, filename):
    """
    @apiName upload_to_programs
    @apiGroup ModelFunction
    @apiDescription redefine the path of programs uploaded to
    @apiParam {filename} filename FileName Users upload
    @apiSuccess {String} path Path of the File Saved
    @apiError IOERROR Path Not Found
    """
    return '/'.join([instance.owner.user.username, 'programs', filename])


def upload_to_video(instance, filename):
    """
    @apiName upload_to_videos
    @apiGroup ModelFunction
    @apiDescription redefine the path of videos uploaded to
    @apiParam {String} filename FileName Users upload
    @apiSuccess {String} path Path of the File Saved
    @apiError IOERROR Path Not Found
    """
    return '/'.join([instance.owner.user.username, 'videos', filename])


class UserExtension(models.Model):
    """
    @api {get} models/:modelname UserExtension
    @apiName UserExtension
    @apiGroup Models
    @apiDescription An Extension to Record the UserInfo
    @apiParam {OneToOneField} user User Extension Belongs
    @apiParam {CharField} mobile Tele of User
    @apiParam {CharField} permission User Permission
    @apiParam {ImageField} avatar User Avatar
    @apiParam {ForiegnKey} group Group User Belongs
    @apiParam {CharField} school User School
    @apiParam {CharField} gstatus User Group Status
    @apiSuccess {model.UserExtension} userextension The UserExtension request
    @apiError CREATEERROR User/UserExtension Existed
    @apiError REQUESTERROR No Such UserExtension
    @apiError DELETEERROR Permission Denied
    @apiError CHANGEERROR Permission Denied
    """
    user = models.OneToOneField(User,
                                on_delete=models.CASCADE,
                                related_name='extension')
    mobile = models.CharField(max_length=13)
    permission = models.CharField(max_length=20, default="USER")
    avatar = models.ImageField(upload_to=upload_to,
                               default='avatars/default.svg')
    group = models.ForeignKey("Group",
                              related_name="students",
                              on_delete=models.SET_NULL,
                              null=True)
    school = models.CharField(max_length=20, default='Tsinghua')
    gstatus = models.CharField(default='OUT', max_length=20)

    def __str__(self):
        """
        display name
        """
        return str(self.user)

    def to_json(self):
        """
        userinfo for developer
        """
        dic = {}
        prolist = []
        grouplist = []
        noticelist = []
        for group in self.groups.all():
            grouplist.append(group.to_json())
        for pro in self.programs.all():
            prolist.append(pro.to_json())
        dic['id'] = str(self.user.id)
        dic['username'] = str(self.user.username)
        if self.group is not None :
            dic['group'] = str(self.group.name)
            dic['leader'] = str(self.group.leader)
        else:
            dic['group'] = None
            dic['leader'] = None
        dic['school'] = str(self.school)
        dic['email'] = str(self.user.email)
        dic['mobile'] = str(self.mobile)
        dic['permission'] = str(self.permission)
        dic['avatar'] = 'media/' + str(self.avatar)
        dic['programs'] = prolist
        dic['groups'] = grouplist
        dic['groupstatus'] = self.gstatus
        unread = 0
        for notice in self.notices.all():
            noticelist.append(notice.to_json())
            if notice.status == 'UNREAD':
                unread = unread + 1
        dic['notices'] = noticelist
        dic['unread'] = unread
        return dic

    def show(self):
        """
        public info to display
        """
        dic = {}
        dic['id'] = self.id
        dic['username'] = str(self.user.username)
        dic['permission'] = str(self.permission)
        dic['avatar'] = 'media/' + str(self.avatar)
        print(self.gstatus)
        dic['groupstatus'] = self.gstatus
        if self.group is not None:
            dic['group'] = str(self.group)
        else:
            dic['group'] = None
        return dic


class Program(models.Model):
    """
    @api {get} models/:modelname Program
    @apiName Program
    @apiGroup Models
    @apiDescription Python Program User Submit
    @apiParam {CharField} title Display Program Title
    @apiParam {FileField} text Program File
    @apiParam {ForiegnKey} owner User Who Submit This Program
    @apiParam {CharField} description Description of Program
    @apiParam {TimeField} create_timestamp Submit Time
    @apiParam {TimeField} post_timestamp Do Post Action Time
    @apiParam {IntegerField} stars Number of stars
    @apiParam {IntegerField} like Number of likes
    @apiParam {ManyToManyField} likeusers LikeUsers of Program
    @apiSuccess {model.Program} program The Program request
    @apiError CREATEERROR Permission Denied
    @apiError REQUESTERROR No Such Program
    @apiError DELETEERROR Permission Denied
    @apiError CHANGEERROR Permission Denied
    """
    title = models.CharField(max_length=20)
    text = models.FileField(upload_to=upload_to_file,
                            default='programs/default.py')
    owner = models.ForeignKey("UserExtension",
                              related_name="programs",
                              on_delete=models.SET_NULL,
                              null=True)
    description = models.CharField(max_length=200)
    status = models.CharField(max_length=20, default='TOCHECK')
    create_timestamp = models.DateTimeField(default=timezone.now)
    post_timestamp = models.DateTimeField(default=timezone.now)
    stars = models.IntegerField(default=0)
    like = models.IntegerField(default=0)
    likeusers = models.ManyToManyField("UserExtension",
                                       related_name="likeprograms",
                                       through="LikeHandle")

    def __str__(self):
        """
        display name
        """
        return self.title

    def to_json(self):
        """
        info for developer
        """
        dic = {}
        dic['id'] = str(self.id)
        dic['title'] = str(self.title)
        dic['src'] = 'media/' + str(self.text)
        dic['description'] = str(self.description)
        if self.owner is not None:
            dic['owner'] = str(self.owner.user)
            dic['school'] = str(self.owner.school)
        else:
            dic['owner'] = None
            dic['school'] = None
        dic['status'] = str(self.status)
        dic['likes'] = str(self.like)
        dic['time'] = str(self.create_timestamp)[0:19]
        dic['time2'] = str(self.post_timestamp)[0:19]
        dic['downloads'] = str(self.stars)
        return dic

    def save(self, *args, **kwargs):
        """
        redefine the save function to record the last-changed time
        """
        if not self.id:
            self.create_timestamp = timezone.now()
        self.post_timestamp = timezone.now()
        return super(Program, self).save(*args, **kwargs)


class Group(models.Model):
    """
    @api {get} models/:modelname Group
    @apiName Group
    @apiGroup Models
    @apiDescription Group of Users
    @apiParam {CharField} name Display Name
    @apiParam {ForiegnKey} leader Leader of Group
    @apiSuccess {model.Group} group The Group request
    @apiError REQUESTERROR No Such Group
    @apiError DELETEERROR Permission Denied
    @apiError CHANGEERROR Permission Denied
    """
    name = models.CharField(max_length=20)
    leader = models.ForeignKey("UserExtension",
                               related_name="groups",
                               on_delete=models.SET_NULL,
                               null=True)

    def __str__(self):
        """
        display name
        """
        return self.name

    def to_json(self):
        """
        info for developer
        """
        dic = {}
        studentlist = []
        for stu in self.students.all():
            studentlist.append(stu.show())
        dic['id'] = str(self.id)
        dic['name'] = str(self.name)
        if self.leader is not None:
            dic['leader'] = str(self.leader)
        else:
            dic['leader'] = None
        dic['students'] = studentlist
        return dic

    def show(self):
        """
        public info to display
        """
        dic = {}
        dic['id'] = str(self.id)
        dic['name'] = str(self.name)
        if self.leader is not None:
            dic['leader'] = str(self.leader)
        else:
            dic['leader'] = None
        return dic

    def programs(self):
        """
        api of group's all programs
        """
        programs = []
        for stu in self.students.all():
            for pro in stu.programs.all():
                programs.append(pro.to_json())
        return programs


class Video(models.Model):
    """
    @api {get} models/:modelname Video
    @apiName Video
    @apiGroup Models
    @apiDescription Video Lecture SuperUser Submit
    @apiParam {CharField} title Display Video Title
    @apiParam {FileField} video Video File
    @apiParam {ForiegnKey} owner User Who Submit This Video
    @apiParam {CharField} description Description of Video Lecture
    @apiParam {TimeField} create_timestamp Submit Time
    @apiParam {TimeField} post_timestamp Do Post Action Time
    @apiParam {IntegerField} stars Number of stars
    @apiParam {IntegerField} like Number of likes
    @apiSuccess {model.Video} video The Video request
    @apiError CREATEERROR Permission Denied
    @apiError REQUESTERROR No Such Video
    @apiError DELETEERROR Permission Denied
    @apiError CHANGEERROR Permission Denied
    """
    title = models.CharField(max_length=20)
    video = models.FileField(default="", upload_to=upload_to_video)
    owner = models.ForeignKey("UserExtension",
                              related_name="videos",
                              on_delete=models.SET_NULL,
                              null=True)
    description = models.CharField(max_length=200)
    create_timestamp = models.DateTimeField(default=timezone.now)
    post_timestamp = models.DateTimeField(default=timezone.now)
    stars = models.IntegerField(default=0)
    like = models.IntegerField(default=0)

    def __str__(self):
        """
        display name
        """
        return self.title

    def to_json(self):
        """
        info for developer
        """
        dic = {}
        dic['id'] = str(self.id)
        dic['header'] = str(self.title)
        dic['description'] = str(self.description)
        if self.owner is not None:
            dic['owner'] = str(self.owner.user)
        else:
            dic['owner'] = None
        dic['src'] = 'media/' + str(self.video)
        dic['time'] = str(self.create_timestamp)[0:19]
        dic['time2'] = str(self.post_timestamp)[0:19]
        dic['views'] = str(self.stars)
        dic['likes'] = str(self.like)
        return dic

    def save(self, *args, **kwargs):
        """
        redefine the save function to record the last-changed time
        """
        if not self.id:
            self.create_timestamp = timezone.now()
        self.post_timestamp = timezone.now()
        return super(Video, self).save(*args, **kwargs)

    def show(self):
        """
        public info to display
        """
        dic = {}
        dic['id'] = str(self.id)
        dic['header'] = str(self.title)
        dic['description'] = str(self.description)
        if self.owner is not None:
            dic['owner'] = str(self.owner.user)
        else:
            dic['owner'] = None
        dic['src'] = 'media/' + str(self.video)
        dic['views'] = str(self.stars)
        dic['likes'] = str(self.like)
        return dic


@receiver(post_save, sender=User)
def create_user_extension(sender, instance, created, **kwargs):
    """
    one_to_one field needed
    """
    if created:
        UserExtension.objects.create(user=instance)
    else:
        instance.extension.save()


class Article(models.Model):
    """
    @api {get} models/:modelname Article
    @apiName Article
    @apiGroup Models
    @apiDescription Article User Submit in The Discussion
    @apiParam {CharField} title Article Title
    @apiParam {CharField} text Article Text
    @apiParam {ForiegnKey} author User Who Submit This Article
    @apiParam {TimeField} time Submit Time
    @apiParam {ForiegnKey} res Article Response to
    @apiError CREATEERROR Permission Denied
    @apiError REQUESTERROR No Such Video
    @apiError DELETEERROR Permission Denied
    @apiError CHANGEERROR Permission Denied
    """
    title = models.CharField(max_length=100, default="article")
    text = models.CharField(max_length=500, default="")
    time = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey("UserExtension",
                               related_name="articles",
                               on_delete=models.SET_NULL,
                               null=True)
    res = models.ForeignKey("Article",
                            related_name="responses",
                            on_delete=models.SET_NULL,
                            null=True)

    def __str__(self):
        """
        display name
        """
        return self.title

    def to_json(self):
        """
        info for developer
        """
        dic = {}
        dic['id'] = self.id
        dic['title'] = str(self.title)
        dic['text'] = str(self.text)
        dic['time'] = str(self.time)[0:19]
        if self.author is not None:
            dic['author'] = self.author.show()
        else:
            dic['author'] = None
        if self.res is not None:
            dic['Re'] = str(self.res)
        else:
            dic['Re'] = None
        return dic

    def show(self):
        """
        public info to display
        """
        dic = {}
        dic['id'] = self.id
        dic['title'] = str(self.title)
        dic['text'] = str(self.text)
        dic['time'] = str(self.time)[0:19]
        if self.author is not None:
            dic['author'] = self.author.show()
        else:
            dic['author'] = None
        if self.res is not None:
            dic['Re'] = str(self.res)
        else:
            dic['Re'] = None
        return dic


class LikeHandle(models.Model):
    """
    @api {get} models/:modelname LikeHandle
    @apiName LikeHandle
    @apiGroup Models
    @apiDescription Handler of User-Program Like-RelationShip
    @apiParam {ForeignKey} user User of The Like-RelationShip
    @apiParam {ForeignKey} program Program of The Like-RelationShip
    @apiParam {TimeField} time RelationShip Create Time
    """
    user = models.ForeignKey('UserExtension', on_delete=models.CASCADE)
    program = models.ForeignKey('Program', on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)

class Notice(models.Model):
    """
    @api {get} models/:modelname Notice
    @apiName Notice
    @apiGroup Models
    @apiDescription Notice about the program
    """
    touser = models.ForeignKey('UserExtension',on_delete=models.SET_NULL,null=True,related_name='notices')
    fromuser = models.ForeignKey('UserExtension',on_delete=models.SET_NULL,null=True,related_name='publishnotices')
    title = models.CharField(max_length=100,default='notice')
    text = models.CharField(max_length=500,default='')
    time = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10,default='UNREAD')

    def __str__(self):
        return self.title
    def to_json(self):
        dic = {}
        dic['to'] = str(self.touser)
        dic['from'] = str(self.fromuser)
        dic['title'] = str(self.title)
        dic['text'] = str(self.text)
        dic['time'] = str(self.time)[0:19]
        dic['status'] = str(self.status)
        return dic



PERMISSION_STATUS = ['NONE', 'USER', 'SUPERUSER', 'ADMIN']
PROGRAM_STATUS = [
    'PYFAILED', 'TOCHECK', 'CHECKING', 'CHECKFAILED', 'CHECKSUCCESS', 'TOSEND',
    'SENT', 'DONE'
]
SUCCESS_STATUS = ['CHECKSUCCESS', 'TOSEND']
SENT_STATUS = ['SENT']
GROUP_STATUS = ['OUT', 'IN']
NOTICE_STATUS = ['UNREAD','READ']
