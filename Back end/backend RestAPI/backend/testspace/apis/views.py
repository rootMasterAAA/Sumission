from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
import jwt
@api_view(["GET"])  
def get(req: Request):
    return Response(data = "123",status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPermission(req: Request):
    token = jwt.decode(str(req.auth), options={"verify_signature": False})
    uuid = token["uuid"]
    return Response(data = "You are welcome", status=status.HTTP_202_ACCEPTED)