from django.urls import path
from .views import createWallet
urlpatterns = [
    path("wallet/create/", createWallet, name="create-wallet"),
    path("wallet/update/<str:owner>", name="update-wallet"), 
]