import json

from django.http import HttpResponse, JsonResponse


def post_required(function):
    """
    post_required
    """
    def _inner(request, *args, **kwargs):
        if not request.method == 'POST':
            msg = {}
            msg['Code'] = False
            msg['Message'] = 'use post'
            return JsonResponse(msg)
        return function(request, *args, **kwargs)

    return _inner


def admin_required(function):
    """
    admin_required
    """
    def _inner(request, *args, **kwargs):
        if not request.user.extension.permission == "ADMIN":
            msg = {}
            msg['Code'] = False
            msg['Message'] = 'Permission Denied'
            return JsonResponse(msg)
        return function(request, *args, **kwargs)

    return _inner


def superuser_required(function):
    """
    superuser_required
    """
    def _inner(request, *args, **kwargs):
        if not (request.user.extension.permission == "SUPERUSER"
                or request.user.extension.permission == "ADMIN"):
            msg = {}
            msg['Code'] = False
            msg['Message'] = 'Permission Denied'
            return JsonResponse(msg)
        return function(request, *args, **kwargs)

    return _inner
