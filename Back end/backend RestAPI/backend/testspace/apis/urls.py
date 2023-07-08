from django.urls import path
from .views import get, getPermission

urlpatterns = [
    path("get/", get, name = "get_200"),
    path("get/permission", getPermission, name= "get_permission")
]