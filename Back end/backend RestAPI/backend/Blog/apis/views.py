from .serializers import PostSerializer
from Blog.models import Post
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def getPost(req: Request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many = True) 
    return Response(data = serializer.data,status=status.HTTP_202_ACCEPTED)

@api_view(['POST'])
def createPost(req: Request):
    if req.method == 'POST':
        user = req.user
        title = req.data.get('title')
        content = req.data.get('content')
        if not title or not content:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_201_CREATED)

@api_view(['PUT'])
def updatePost(req: Request):
    return Response()


@api_view(['DELETE'])
def deletePost():
    return Response()