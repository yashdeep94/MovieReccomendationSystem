from django.contrib import admin
from .models import *

admin.site.register(Movie)
admin.site.register(User)
admin.site.register(UserGroup)
admin.site.register(Link)