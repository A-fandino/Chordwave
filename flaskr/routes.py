# Main router file
from flask import current_app
from flask_socketio import emit
from . import db, socket


@current_app.route("/")
def index():
    return "Hey! I'm using Chordwave!"


@current_app.route('/create-db/<refresh>')
@current_app.route('/create-db')
def createdb(refresh=None):
    if current_app.debug:
        from . import models
        if refresh == "refresh":
            db.drop_all()
        db.create_all()
        return "Done!"


@current_app.route("/user/<nick>/<mail>/<passw>")
def create_user(nick, mail, passw):
    from .models import User
    user = User(nick, mail, passw)
    db.session.add(user)
    db.session.commit()
    return str(user)


@current_app.route("/song/<name>/<format>/<author_id>")
def create_song(name, format, author_id):
    from .models import Song
    song = Song(name, format, author_id)
    db.session.add(song)
    db.session.commit()
    return str(song)


@current_app.route("/song/<name>/<author_id>")
def check_song(name, author_id):
    from .models import Song
    song = Song.query.filter_by(name=name, created_by=author_id).first()
    print(song)
    return song.name


@socket.on("connect")
def connect():
    emit("test", 3333)


@socket.on("ping")
def ping():
    print("PONG!!!!!")
