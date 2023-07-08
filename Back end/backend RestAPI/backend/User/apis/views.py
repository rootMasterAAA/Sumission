from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from User.models import UserAccountManager, User
from rest_framework import status
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db.utils import InterfaceError
import json
from io import StringIO
@api_view(["POST"])
def login_api(req:Request):
    userManagement = UserAccountManager()
    if req.method == "POST":
        if req.data.get("body"):#For React
            body = json.load(StringIO(req.data["body"]))
        else:#For spigot API
            body = req.data
        uuid, email, password = body.get("uuid"), body.get("email"), body.get("password")
        if (not email and not password) or (not uuid and not password):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            if (email):    
                isAccept, user = userManagement.authenticate(req, email=email, password=password)
            elif (uuid):
                isAccept, user = userManagement.authenticate(req, uuid=uuid, password=password)
        if isAccept == "Accepted":
            access_token, refresh_token = AccessToken.for_user(user), RefreshToken.for_user(user)
            access_token["uuid"] = user.uuid
            return Response(
                    {"Access_token": str(access_token),
                    "Refresh_token": str(refresh_token)},
                status= status.HTTP_202_ACCEPTED)
        elif isAccept == "Rejected":
            return Response("Rejected",status=status.HTTP_406_NOT_ACCEPTABLE)

@api_view(['POST'])
def signup_api(req: Request):
    body = req.data
    if req.method == 'POST':
        email, password1, name, uuid = body.get("email"), body.get("password1"), body.get("name"), body.get("uuid")
        if any([field == None for field in [email, password1, name, uuid]]):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                User.objects.create_user(email=email, uuid=uuid, name=name, password=password1)
                return Response("Done", status=status.HTTP_201_CREATED)
            except InterfaceError as emailExistence:
                return Response({
                    "Error":emailExistence
                }, status=status.HTTP_406_NOT_ACCEPTABLE)
    else:
        return Response("Faield", status=status.HTTP_406_NOT_ACCEPTABLE)

