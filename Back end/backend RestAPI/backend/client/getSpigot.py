import requests
import socket
import urllib
import json
address = "http://192.168.1.9:8080/create/"
header = {
    "Content-Type": "application/json"
}
context = {
    "data":"123"
}
data = json.dumps(context)
respond = requests.get(address, data=data)
print(respond.content)