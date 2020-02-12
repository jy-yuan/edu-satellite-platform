"""
docstring
"""
from django.test import TestCase
import json
from .models import User, UserExtension, Group, Program, Article, Video


# Create your tests here.
class TestLoginApis(TestCase):
    """
    docstring
    """
    def setUp(self):
        login_user = User.objects.create_user(username="login",
                                              password="login",
                                              id=1)
        login_user.save()
        user = User.objects.create_user(username='user', password='user', id=2)
        user.save()
        super1 = User.objects.create_user(username='super',
                                          password='super',
                                          id=3)
        super1.save()
        super1.extension.permission = 'SUPERUSER'
        super1.extension.save()
        super_user = User.objects.create_superuser(username="superuser",
                                                   password="superuser",
                                                   email='',
                                                   id=4)
        super_user.save()
        super_user.extension.permission = 'ADMIN'
        super_user.extension.save()
        supergroup = Group.objects.create(name='superuser',
                                          leader=super_user.extension)
        supergroup.save()
        program1 = Program.objects.create(title='pro1',
                                          id=1,
                                          owner=user.extension)
        program1.save()
        article1 = Article.objects.create(title='art1',
                                          id=1,
                                          author=user.extension)
        article1.save()
        video1 = Video.objects.create(title='vid1',
                                      id=1,
                                      owner=super1.extension)
        video1.save()

    def test_login(self):
        """
        docstring
        """
        dict = {'username': 'login', 'password': 'login'}
        response = self.client.post(path='/api/login/',
                                    data=json.dumps(dict),
                                    content_type='application/json')
        self.assertEqual(response.json().get('Code'), True)

    def test_register(self):
        dict = {
            'username': 'register',
            'password': 'register',
            'mobile': '11451445678',
            'code': '114514',
            'email': 'dbtest@test.com'
        }
        session = self.client.session
        session['code'] = '114514'
        session.save()
        print(self.client.session.get('code'))
        response = self.client.post(path='/api/register/',
                                    data=json.dumps(dict),
                                    content_type='application/json')
        self.assertEqual(response.json().get('Code'), True)

    def test_get(self):
        self.client.login(username='login', password='login')
        response = self.client.post(path='/api/get/',
                                    content_type='application/json')
        self.assertEqual(response.json().get('Code'), True)

    def test_getarticles(self):
        self.client.login(username='login', password='login')
        response = self.client.post(path='/api/getarticles/',
                                    content_type='application/json')
        print(str(response))
        self.assertEqual(response.json().get('Code'), True)

    def test_sendmsg(self):
        dict = {'mobile': '10086'}
        response = self.client.post(path='/api/sendmsg/',
                                    data=json.dumps(dict),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_logout(self):
        self.client.login(username='login', password='login')
        response = self.client.post(path='/api/logout/')
        self.assertEqual(response.status_code, 200)

    def test_sendmail(self):
        dict = {
            'email': 'dbtest@dbtest.com',
        }
        self.client.login(username='login', password='login')
        response = self.client.post(path='/api/sendmail/',
                                    data=json.dumps(dict),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_changepassword(self):
        self.client.login(username='user', password='user')
        dict = {
            'password': 'user',
            'newpassword': 'user2',
        }
        response = self.client.post(path='/api/changepassword/',
                                    data=json.dumps(dict),
                                    content_type='application/json')
        print(response.json().get('Message'))
        self.assertEqual(response.json().get('Code'), True)

    def test_changepermission(self):
        self.client.login(username='superuser', password='superuser')
        dict = {
            'id': 2,
        }
        response = self.client.post(path='/api/changepermission/',
                                    data=json.dumps(dict),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_getprograms(self):
        self.client.login(username='login', password='login')
        response = self.client.post(path='/api/getprograms/')
        self.assertEqual(response.json().get('Code'), True)

    def test_checking(self):
        dict = {
            'id': 1,
        }
        self.client.login(username='superuser', password='superuser')
        response = self.client.post(path='/api/checking/',
                                    data=json.dumps(dict),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_getvideos(self):
        self.client.login(username='login', password='login')
        response = self.client.post(path='/api/getvideos/')
        self.assertEqual(response.json().get('Code'), True)

    def test_checkfailed(self):
        dict = {
            'id': 1,
        }
        self.client.login(username='superuser', password='superuser')
        response = self.client.post(path='/api/checkfailed/',
                                    data=json.dumps(dict),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_checksuccess(self):
        dict = {
            'id': 1,
        }
        self.client.login(username='superuser', password='superuser')
        response = self.client.post(path='/api/checksuccess/',
                                    data=json.dumps(dict),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_submit(self):
        dict = {
            'id': 1,
        }
        self.client.login(username='superuser', password='superuser')
        response = self.client.post(path='/api/submit/',
                                    data=json.dumps(dict),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_send(self):
        dict = {
            'id': 1,
        }
        self.client.login(username='superuser', password='superuser')
        response = self.client.post(path='/api/send/',
                                    data=json.dumps(dict),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_done(self):
        dict = {
            'id': 1,
        }
        self.client.login(username='superuser', password='superuser')
        response = self.client.post(path='/api/done/',
                                    data=json.dumps(dict),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_getpending(self):
        self.client.login(username='login', password='login')
        response = self.client.post(path='/api/getpending/')
        self.assertEqual(response.json().get('Code'), True)

    def test_getusers(self):
        self.client.login(username='superuser', password='superuser')
        response = self.client.post(path='/api/getusers/')
        self.assertEqual(response.json().get('Code'), True)

    def test_getgroups(self):
        self.client.login(username='super', password='super')
        response = self.client.post(path='/api/getgroups/')
        self.assertEqual(response.json().get('Code'), True)

    def test_postavatar(self):
        self.client.login(username='login', password='login')
        response = self.client.post(path='/api/postavatar/')
        self.assertEqual(response.status_code, 200)

    def test_postprogram(self):
        self.client.login(username='login', password='login')
        response = self.client.post(path='/api/postprogram/')
        self.assertEqual(response.status_code, 200)

    def test_postvideo(self):
        self.client.login(username='super', password='super')
        response = self.client.post(path='/api/postvideo/')
        self.assertEqual(response.status_code, 200)

    def test_postarticle(self):
        dict = {'title': '1', 'text': '2'}
        self.client.login(username='login', password='login')
        response = self.client.post(path='/api/postarticle/',
                                    data=json.dumps(dict),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
    
    def test_deletearticle(self):
        dict = {'id':'1'}
        self.client.login(username='login', password='login')
        response = self.client.post(path='/api/deletearticle/',
                                    data=json.dumps(dict),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_changedescription(self):
        dict = {'id':'1'}
        self.client.login(username='super',password='super')
        response = self.client.post(path='/api/changedescription/',
                                    data=json.dumps(dict),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
    
    def test_deleteuser(self):
        dict = {'id':'1'}
        self.client.login(username='super',password='super')
        response = self.client.post(path='/api/deleteuser/',
                                    data=json.dumps(dict),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
    
    def test_deletepost(self):
        dict = {'id':'1'}
        self.client.login(username='superuser',password='superuser')
        response = self.client.post(path='/api/deletepost/',
                                    data=json.dumps(dict),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_deletevideo(self):
        dict = {'id':'1'}
        self.client.login(username='superuser',password='superuser')
        response = self.client.post(path='/api/deletevideo/',
                                    data=json.dumps(dict),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
    
    def test_changemobile(self):
        dict = {'code':'0'}
        self.client.session['code'] = '0'
        self.client.login(username='login',password='login')
        response = self.client.post(path='/api/changemobile/',
                                    data=json.dumps(dict),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
    
    def test_readnotice(self):
        self.client.login(username='login',password='login')
        response = self.client.post(path='/api/changemobile/')
        self.assertEqual(response.status_code, 200)
    
    def  test_appendgroup(self):
        dict = {'id':'1'}
        self.client.login(username='login',password='login')
        response = self.client.post(path='/api/appendgroup/',
                                    data=json.dumps(dict),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
    
    def test_creategroup(self):
        dict = {'name':'1'}
        self.client.login(username='super',password='super')
        response = self.client.post(path='/api/creategroup/',
                                    data=json.dumps(dict),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)

