python manage.py migrate
python manage.py collectstatic --noinput
gunicorn 'dbtest.wsgi' -b 0.0.0.0:80 --access-logfile - --log-level info