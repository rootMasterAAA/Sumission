from django.db import models
from User.models import User
import uuid
from django.db.models import JSONField

class Transaction(models.Model):
    PROCESSING = 'processing'
    COMPLETED = 'completed'
    CANCELLED = 'cancelled'

    STATUS_CHOICES = (
        (PROCESSING, 'Processing'),
        (COMPLETED, 'Completed'),
        (CANCELLED, 'Cancelled')
    )

    CREATE = "create"
    SELL = "sell"
    BUY = "buy"

    ACTION_CHOICES = (
        (CREATE, 'Create'),
        (SELL, 'Sell'),
        (BUY, 'Buy')
    )

    transaction_id = models.UUIDField(unique=True, blank=False, default=uuid.uuid4, primary_key=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=PROCESSING)
    location = JSONField()
    action = models.CharField(max_length=20, choices=ACTION_CHOICES, default=None)




