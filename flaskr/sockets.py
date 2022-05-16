from flask_socketio import emit, send, join_room, leave_room
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
    emit("user_join",f"{username} just connected.", to=room, broadcast=True)
    print(username,"Joined")
    return "Joined", 200

@socket.on("leave")
def on_leave(data):
    username = session["user"]["nickname"]
    room = data["room"]
    join_room(room)
    emit("user_join",f"{username} left.", to=room)

@socket.on("txt")
def txt(string):
    print(string)

@socket.on('disconnect')
def test_disconnect():
    print(f'{session["user"]["nickname"] if "user" in session else "Some user"} disconnected')
