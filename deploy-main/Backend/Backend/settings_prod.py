from .settings import *

# run manage.py with --settings=Backend.settings_prod

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'dj',
        'USER': 'root',
        'PASSWORD': 'y74612218',
        'HOST': 'dj_mysql',
        'PORT': '3306',
    }
}

ALLOWED_HOSTS = [
    "wd0206.coe.psu.ac.th"
]
CSRF_TRUSTED_ORIGINS = [
    "https://wd0206.coe.psu.ac.th"
]

DEBUG = False
