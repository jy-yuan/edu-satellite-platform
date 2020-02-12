'''
Basic views
'''
import os

from django.conf import settings
from django.http import FileResponse
from django.http import HttpResponse
from django.http import HttpResponseNotFound
from django.shortcuts import render
import prometheus_client as prometheus

def urltest(request):
    return render(request,'404.html')

def serve_static(request, path='index.html'):
    '''
    Return static files,
    as django.contrib.staticfiles is disabled in production mode.

    Actually, static files shall be served separately, for example with nginx.
    '''
    
    print(1)
    path = '%s/%s' % (getattr(settings, 'STATICFILES_DIR'), path)
    print(path)
    if os.path.isfile(path):
        return FileResponse(open(path, 'rb'))
    return render(request,'404.html')



def metrics(request):
    '''
    Serve prometheus metrics
    '''
    metrics_page = prometheus.generate_latest(prometheus.REGISTRY)
    return HttpResponse(metrics_page,
                        content_type=prometheus.CONTENT_TYPE_LATEST)


def page_not_found(request,exception):
    return render(request,'404.html')