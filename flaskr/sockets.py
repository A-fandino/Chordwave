from flask_socketio import emit, send, join_room, leave_room, rooms
from flask import session
from . import db, socket

@socket.on("connect")
def connect():
    emit("welcome")

@socket.on("join")
def on_join(data):
    username = session["user"]["nickname"]
    room = data["room"]
    join_room(room)
    emit("user_join",{"type":"join","user":username}, to=room, broadcast=True)
    print(username,"Joined")
    return "Joined", 200

@socket.on("leave")
def on_leave(data):
    username = session["user"]["nickname"]
    room = data["room"]
    leave_room(room)
    emit("user_leave",{"type":"leave","user":username}, to=room, broadcast=True)


@socket.on("chat message")
def chat_message(data):
    msgData = {"user": session["user"]["nickname"], "msg":data["msg"], "type":"message"}
    if msgData["msg"] != "": emit("chat message", msgData, to=data["room"])

@socket.on('disconnect')
def test_disconnect():
    print(f'{session["user"]["nickname"] if "user" in session else "Some user"} disconnected')
