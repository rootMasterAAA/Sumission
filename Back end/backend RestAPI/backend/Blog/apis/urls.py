from django.urls import path
from .views import getPost
urlpatterns = [
    path("api/post", getPost)
]