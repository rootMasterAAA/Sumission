from django.shortcuts import render
from django.http import HttpRequest
from django.contrib.auth.forms import UserCreationForm
def register(req: HttpRequest):
    if req.method == 'POST':
        pass
    