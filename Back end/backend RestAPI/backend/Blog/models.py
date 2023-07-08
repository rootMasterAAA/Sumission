from django.db import models
from User.models import User
from django.utils import timezone
class Post(models.Model):
    title = models.TextField(max_length=100)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    date_posted = models.DateTimeField(default=timezone.now)
    content = models.TextField()
    def __str__(self):
        return self.title