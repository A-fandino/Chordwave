# Main router file
from flask import current_app, Response, session, render_template
from .models import User, Listen
from . import db
import os
from . import sockets

@current_app.route('/create-db/<refresh>')
@current_app.route('/create-db')
def createdb(refresh=None):
    if current_app.debug:
        if refresh == "refresh":
            db.drop_all()
        db.create_all()
        user = User("Arnau","arnauf8@gmail.com","1234")
        user.save()
        return "Done!"


# @current_app.route("/user/<nick>/<mail>/<passw>")
# def create_user(nick, mail, passw):
#     from .models import User
#     user = User(nick, mail, passw)
#     db.session.add(user)
#     db.session.commit()
#     return str(user)


# @current_app.route("/song/<name>/<format>/<author_id>")
# def create_song(name, format, author_id):
#     from .models import Song
#     song = Song(name, format, author_id)
#     db.session.add(song)
#     db.session.commit()
#     return str(song)


# @current_app.route("/song/<name>/<author_id>")
# def check_song(name, author_id):
#     from .models import Song
#     song = Song.query.filter_by(name=name, created_by=author_id).first()
#     return song.name

@current_app.route("/play/<author>/<name>")
def play(author, name):
    user = User.query.filter_by(nickname=author).first()
    song = None
    for x in user.songs:
        if x.name == name:
            song = x
            break
    song_id = song.id
    song_format = song.format
    def generate():
        with open(f"./flaskr/uploads/music/{song_id}.{song_format}", "rb") as fwav:
            data = fwav.read(2048)
            while data:
                yield data
                data = fwav.read(2048)
    listen_song = Listen(user_id=session["user"]["id"], song_id=song.id)
    listen_song.save()
    return Response(generate(), mimetype="audio/x-wav")

@current_app.route("/")
@current_app.route("/<path:p>")
def index(p = None):
    path_dir = os.path.abspath("client/dist")  # path react build
    # if path != "" and os.path.exists(os.path.join(path_dir, path)):
    #     return send_from_directory(path_dir, path)
    return render_template("index.html")