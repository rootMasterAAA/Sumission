from django.urls import path
from .views import checkAndTransferToken
urlpatterns = [
path("admin/validation/<str:network>&<str:token_address>/",checkAndTransferToken) 
]