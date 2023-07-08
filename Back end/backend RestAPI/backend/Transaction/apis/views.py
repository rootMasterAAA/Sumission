from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from backend.settings import SECRET_KEY
from django.core.exceptions import ValidationError

from ..models import Transaction
from User.models import User

from io import StringIO
import json
import jwt

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createTransaction(req: Request):
    body = req.data
    if not isinstance(body, dict):
        body = json.load(StringIO(body))
    if (req.method == "POST"):
        return Response(status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTransaction(req: Request, transaction_id: str):
    try:
        transaction = Transaction.objects.get(transaction_id = transaction_id)
    except ValidationError as err:
        return Response({"error_msg":"Invalid UUID"},  status=status.HTTP_400_BAD_REQUEST)
    if not transaction:
        return Response({"error_msg":"Not Found"}, status=status.HTTP_404_NOT_FOUND)
    transaction_id = transaction.transaction_id
    
    transaction_owner_uuid = transaction.owner.uuid

    auth_token = req.auth
    if  auth_token:
        user_decode = jwt.decode(str(auth_token).encode("utf-8"), SECRET_KEY, algorithms=["HS256"])
        user_uuid = user_decode["uuid"]
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    if (transaction_owner_uuid != user_uuid):
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
    
    transaction_owner = transaction.owner.name
    transaction_location = transaction.location
    transaction_status = transaction.status
    transaction_action = transaction.action

    return Response({
        "transaction_id": str(transaction_id),
        "owner": str(transaction_owner),
        "location": json.dumps(transaction_location),
        "status": str(transaction_status),
        "action": str(transaction_action)
    },status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createTransactionAdmin(req: Request):
    auth_token = req.auth
    if auth_token:
        user_decode = jwt.decode(str(auth_token).encode("utf-8"), SECRET_KEY, algorithms=["HS256"])
        user_uuid = user_decode["uuid"]
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    user = User.objects.get(uuid = user_uuid)
    location = {
       "upper_location": {
        "x": req.data["upper_x"],
        "z": req.data["upper_z"]
       },
       "lower_location": {
        "x": req.data["lower_x"],
        "z": req.data["lower_z"]
       }
    }
    location = json.dumps(location)
    new_transaction = Transaction.objects.create(
        owner = user,
        location = location,
        action = Transaction.CREATE,
        status = Transaction.PROCESSING,
    )
    return Response(new_transaction.transaction_id, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllTransactionFromUser(req: Request):
    auth_token = req.auth
    if auth_token:
        user_decode = jwt.decode(str(auth_token).encode("utf-8"), SECRET_KEY, algorithms=["HS256"])
        user_uuid = user_decode["uuid"]
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    user = User.objects.get(uuid = user_uuid)
    query_transactions = Transaction.objects.get(owner = user)
    transaction_list = []
    for transaction in query_transactions:
        transaction_list.append({
            "transaction_id":str(transaction.owner.uuid),
            "transaction_action":str(transaction.action),
            "transaction_status":str(transaction.status)}
        )
    return Response(transaction_list, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def deleteTransaction(req:Request, transaction_uuid):
    try:
        transaction = Transaction.objects.get(transaction_id = transaction_uuid)
    except ValidationError as err:
        return Response({"error_msg":"Invalid UUID"},status=status.HTTP_400_BAD_REQUEST)
    if not transaction:
        return Response({"error_msg":"Transaction is null"},status=status.HTTP_404_NOT_FOUND)
    transaction_owner = transaction.owner.uuid
    auth_token = req.auth
    if  auth_token:
        user_decode = jwt.decode(str(auth_token).encode("utf-8"), SECRET_KEY, algorithms=["HS256"])
        user_uuid = user_decode["uuid"]
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    if user_uuid == transaction_owner:
        transaction.delete()
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
    