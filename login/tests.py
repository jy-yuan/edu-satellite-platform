"""
docstring
"""
from django.test import TestCase


# Create your tests here.
class TestURL(TestCase):
    """
    docstring
    """
    def test_get(self):
        """
        docstring
        """
        response = self.client.get('/urltest/')
        self.assertEqual(response.status_code, 200)
