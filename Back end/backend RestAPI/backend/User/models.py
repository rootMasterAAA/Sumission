from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.utils import timezone

class UserAccountManager(UserManager):
    def _createUser(self, email, password, uuid, name, **role):
        email = self.normalize_email(email)
        user = self.model(email = email, name = name, uuid = uuid, **role)
        user.set_password(password)
        user.save(using = self._db)
        return user
    
    def create_user(self, email, password, uuid, name, **role):
        role.setdefault('is_staff', False)
        role.setdefault('is_superuser', False)
        return self._createUser(email=email, password=password, uuid=uuid, name=name, **role)
    
    def create_superuser(self, email, password, **role):
        role.setdefault('is_staff', True)
        role.setdefault('is_superuser', True)
        return self._createUser(email, password, **role)
    
    def authenticate(self, request, email=None, password=None, uuid = None, **kwargs):
        try:
            if email: 
                user = User.objects.get(email=email)
            elif uuid:
                user = User.objects.get(uuid = uuid)
        except User.DoesNotExist:
            return ("Rejected", "The user not exist")
        if not user.check_password(password):
            return ("Rejected", "The password is in-correct")
        return ("Accepted", user)


    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True, blank=True, default='')
    name = models.CharField(max_length=255, blank=True, default='')
    uuid = models.CharField(max_length=36, unique=True)
    date_joined = models.DateTimeField(default = timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = UserAccountManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [
        'uuid'
    ]
    class Meta:
        verbose_name = "User"
        verbose_name_plural= "Users"