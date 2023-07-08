from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated

from .utils import HEADER, HEADER_WITHOUT_KEY

import requests
import json
from io import StringIO

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def checkAndTransferToken(req: Request, network: str, token_address: str):
    if not token_address:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    url = f"https://api.shyft.to/sol/v1/nft/read?network={network}&token_address={token_address}"
    shyftAPI = requests.get(url=url, headers=HEADER)
    json_respond = (json.load(StringIO(shyftAPI.content.decode("utf-8"))))
    if json_respond["success"]:
        uri_metadata = json_respond["metadata_uri"]
        meta_respond = requests.get(url=uri_metadata,headers=HEADER_WITHOUT_KEY)
        meta_json_respond = json.load(StringIO(meta_json_respond))
        address_name = meta_respond[0]["name"]
        print(address_name)
        # json_attr = json.load(StringIO(m  eta_respond["attributes"]))
        # print(json_attr[0]["id"])
        address = token_address
        return Response(status=status.HTTP_200_OK)


