from django.urls import path
from .views import check_exist_uuid, serverTestRespond
urlpatterns = [
    path("utils/checkuuid/", check_exist_uuid, name="check-exist-uuid"),
    path("utils/checkstatus/",serverTestRespond, name="server-test-respond" )
    ]