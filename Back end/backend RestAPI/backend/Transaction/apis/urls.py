from django.urls import path
from .views import createTransactionAdmin, createTransaction, getTransaction,getAllTransactionFromUser
urlpatterns = [
    path("create/", createTransaction, name="create-transaction"),
    path("get/<str:transaction_id>/", getTransaction, name="get-transaction"),
    path("get/all/",getAllTransactionFromUser, name="get-all-transaction"),
    path("admin/create", createTransactionAdmin, name="admin-create-transaction")
]