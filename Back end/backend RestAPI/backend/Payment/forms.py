from django import forms
from .models import Wallet

class UserWalletForm(forms.Form):
    pubKey = forms.CharField(max_length = 50,unique=True)
    class Meta:
        model = Wallet
        fields = ["pubKey" , "owner"]