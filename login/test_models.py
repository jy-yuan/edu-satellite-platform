"""
docstring
"""
from django.test import TestCase
from login.models import UserExtension, User, Program, Group, Video, Article, LikeHandle


# Create your tests here.
class TestLoginModels(TestCase):
    """
    docstring
    """
    def setUp(self):
        """
        docstring
        """
        u1 = User.objects.create_user(username="u1", password="u1password")
        g1 = Group.objects.create(name="g1")
        p1 = Program.objects.create(title="p1")
        v1 = Video.objects.create(title="v1")
        a1 = Article.objects.create(title="a1")
        u1.save()
        g1.save()
        v1.save()
        a1.save()
        l1 = LikeHandle.objects.create(user=u1.extension,program=p1)
        l1.save()

    def test_User(self):
        """
        docstring
        """
        result = User.objects.get(username="u1")
        self.assertEqual(result.username, "u1")

    def test_UserExtension(self):
        """
        docstring
        """
        resultu = User.objects.get(username="u1")
        resulte = resultu.extension
        self.assertEqual(str(resulte.to_json()['username']), "u1")
        self.assertEqual(str(resulte.show()['username']), "u1")

    def test_Group(self):
        """
        docstring
        """
        resultg = Group.objects.get(name="g1")
        self.assertEqual(str(resultg.to_json()['name']), "g1")
        self.assertEqual(str(resultg.show()['name']), "g1")

    def test_Program(self):
        """
        test_program
        """
        resultp = Program.objects.get(title="p1")
        self.assertEqual(str(resultp.to_json()['title']),"p1")

    def test_Video(self):
        """
        test_video
        """
        resultv = Video.objects.get(title="v1")
        self.assertEqual(str(resultv.to_json()['header']),"v1")
        self.assertEqual(str(resultv.show()['header']),"v1")
    
    def test_Article(self):
        """
        test_article
        """
        resulta = Article.objects.get(title="a1")
        self.assertEqual(str(resulta.to_json()['title']),"a1")
        self.assertEqual(str(resulta.show()['title']),"a1")