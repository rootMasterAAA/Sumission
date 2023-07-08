from Payment.models import Wallet
from Payment.forms import UserWalletForm
from rest_framework.decorators import permission_classes, api_view
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
@permission_classes
@api_view(["POST"])
def createWallet():
    pass
@permission_classes
@api_view(["PUT"])
def updateWallet(req: Request, owner):
    try:
        user = Wallet.objects.get(owner=owner)
    except Wallet.DoesNotExist:
        return Response


