from flask_socketio import emit, send, join_room, leave_room
from flask import session
from sqlalchemy.sql.expression import func
from .models import Song
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

@socket.on("song")
def song(clientData):
    song = Song.query.order_by(func.random()).limit(1)
    with open(f"./flaskr/uploads/music/{song.id}.{song.format}", "rb") as fwav:
        data = fwav.read(2048)
        while data:
            emit("song",data, to=clientData["room"])
            data = fwav.read(2048)

@socket.on("chat message")
def chat_message(data):
    msgData = {"user": session["user"]["nickname"], "msg":data["msg"], "type":"message"}
    if msgData["msg"] != "": emit("chat message", msgData, to=data["room"])

@socket.on('disconnect')
def test_disconnect():
    print(f'{session["user"]["nickname"] if "user" in session else "Some user"} disconnected')
