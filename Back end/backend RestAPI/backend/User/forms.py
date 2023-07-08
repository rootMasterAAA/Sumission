from django.contrib.auth.forms import UserCreationForm
from .models import User 
from django import forms
class RegisterUserForm(UserCreationForm):
    email = forms.EmailField()
    name = forms.CharField(max_length=30)
    uuid = forms.UUIDField()
    class Meta:
        model = User
        fields = ('uuid', 'name', 'email', 'password1', 'password2')