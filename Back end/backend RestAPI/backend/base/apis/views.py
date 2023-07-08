from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from rest_framework import status
from User.models import User
@api_view(["GET"])
def check_exist_uuid(req: Request):
    body = req.data
    uuid = body.get("uuid")
    print(uuid)
    if uuid:
        try:
            user = User.objects.get(uuid = uuid)
            return Response(status=status.HTTP_409_CONFLICT)
        except User.DoesNotExist:
            return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)
@api_view(["GET"])
def serverTestRespond(req: Request):
    return Response(status=status.HTTP_200_OK)
