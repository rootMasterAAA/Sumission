from typing import Iterable, Optional
from django.db import models
from User.models import User
# Create your models here.
class Wallet(models.Model):
    pubKey = models.CharField(max_length = 50,unique=True)
    onwer = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    def save(self, force_insert: bool = ..., force_update: bool = ..., using: str | None = ..., update_fields: Iterable[str] | None = ...) -> None:
        return super().save(force_insert, force_update, using, update_fields)