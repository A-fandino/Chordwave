from flask_socketio import emit, send, join_room, leave_room
from flask import session
from sqlalchemy.sql.expression import func
from .models import Song, User, Room
from . import db, socket

@socket.on("connect")
def connect():
    emit("welcome")

@socket.on("join")
def on_join(data):
    username = session["user"]["nickname"]
    room_name = data["room"]
    room = User.query.filter_by(nickname=data["room"]).first().getActiveRoom()
    if (room.max_users <= len(room.users)):
        return "ROOM IS FULL",500
    updatedUser = User.query.get(session["user"]["id"])
    updatedUser.actual_room_id = room.id
    db.session.commit()
    join_room(room_name)
    emit("user_join",{"type":"join","user":username}, to=room_name, broadcast=True)
    print(username,"Joined")
    return "Joined", 200

@socket.on("leave")
def on_leave(data):
    username = session["user"]["nickname"]
    room = data["room"]
    updatedUser = User.query.get(session["user"]["id"])
    updatedUser.actual_room_id = None
    db.session.commit()
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
