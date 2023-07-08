from django.urls import path
from User.models import User
from .views import signup_api, login_api
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path("login/", login_api),
    path("register/", signup_api),
    path("refresh/", TokenRefreshView.as_view()),
]