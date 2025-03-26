from django.urls import path
from . import views

urlpatterns = [
    path('auth/createuser/', views.create_user),
    path('auth/login/', views.user_login),
    path('movie/', views.movie),
    path('user/', views.user),
    path('recommended/', views.reccomendation),
    path('posters/<str:path>', views.poster_image),
    path('verifyemail/', views.verifyEmail),
]