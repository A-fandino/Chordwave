from time import sleep
from flask import Blueprint, redirect, request, jsonify, send_file, send_from_directory, session
from flask_cors import cross_origin, CORS
import os
import json
from .models import Like, Genre, Song, User, db, Room
from .auth import login_required
from sqlalchemy.sql.expression import func
from .auth import abortMsg

bp = Blueprint('api', __name__, url_prefix='/api')

pfpPath = 'flaskr/uploads/pfp'
musicPath = 'flaskr/uploads/music'

@bp.route('/testing')
def test():
    return "TEST RESPONSE!"


@bp.route('/genres')
def genres():
    return json.dumps([g.name for g in Genre.query.all()])


@bp.route("/last-songs")
@bp.route("/last-songs/<int:limit>")
@bp.route("/last-songs/<int:limit>/<int:offset>")
def lastSongs(limit=1, offset=0):
    songs = Song.query.order_by(Song.created_at.desc()).limit(
        limit).offset(limit*offset)
    data = []
    for s in songs:
        data.append(s.serialize)
    return jsonify(data)


@bp.route("/random-song")
@bp.route("/random-song/<int:num>")
def randomSong(num=1):
    songs = Song.query.order_by(func.random()).limit(num)
    data = []
    for s in songs:
        data.append(s.serialize)
    return jsonify(data)


@bp.route('/song/<author>/<name>')
def song(author, name):
    user = User.query.filter_by(nickname=author).first()
    song = None
    for x in user.songs:
        if x.name == name:
            song = x
            break
    data = {"filename": song.id, "name": song.name, "format": song.format, "author": author
            # "duration": librosa.get_duration(filename='./flaskr/uploads/music/'+song.id+"."+song.format)
            }
    return jsonify(data)


@bp.route('/userSongs/<nickname>')
def userSongs(nickname):
    user = User.query.filter_by(nickname=nickname).first()
    return jsonify([x.serialize for x in user.songs])


@bp.route('/upload', methods=['POST'])
@cross_origin()
@login_required
def index():
    try:
        file = request.files['file']
        file.stream.seek(0)
        name = request.form["name"]
        ext = file.filename.split(".")[-1]
        if (not os.path.exists(musicPath)):
            os.makedirs(musicPath)
        author_id = session["user"]["id"]
        song = Song(name, ext, author_id)
        # author = User.query.get(1).first()["nickname"]
        db.session.add(song)
        db.session.commit()
        file.save(f'{musicPath}/{song.id}.{ext}')
        return redirect(f'http://localhost/song/{song.author.nickname}/{name}')
    except:
        return redirect("http://localhost/upload")

@bp.route('/room', methods=["POST"])
def postRoom():
    data = json.loads(request.data.decode())
    print(data)
    if not "max" in data: abortMsg("No 'max user count' found")
    if data["max"] > 8: abortMsg("Cannot have more than 8 users")
    if data["max"] < 2: abortMsg("Cannot have less than 2 users")
    user = User.query.get(session["user"]["id"])
    
    if (user.getActiveRoom()): abortMsg("You already have an active room.")
    room = Room(session["user"]["id"], data["max"])
    room.save()
    return "", 200

@bp.route('/get-rooms')
@bp.route('/get-rooms/<int:limit>')
@bp.route('/get-rooms/<int:limit>/<int:offset>')
def getRooms(limit = 9, offset=0):
    rooms = Room.query.filter_by(active=1).limit(
        limit).offset(limit*offset)
    data = []
    for r in rooms:
        data.append(r.serialize)
    return jsonify(data)

@bp.route("/like/<id>", methods=("POST","DELETE"))
def like(id):
    song = Song.query.get(id)
    if request.method == "POST":
        like = Like(session["user"]["id"], id)
        like.save()
        return "", 200
    if request.method == "DELETE":
        like = Like.query.filter_by(user_id=session["user"]["id"], song_id=id).first()
        if song is None or like is None: abortMsg("Song not found", 404)
        db.session.delete(like)
        db.session.commit()
        return "", 200

@bp.route("/pfp/<id>")
def pfp(id):
    if os.path.exists(f"{pfpPath}/{id}.png"):
        return send_file(f"../{pfpPath}/{id}.png")
    # for f in os.listdir(pfpPath):
    #     if f.split(".")[0] == id:
    #         return send_file(f"../{pfpPath}/{f}")
    return send_file("./default.jpg")
    

@bp.route("/changePFP", methods=("POST",))
def changePFP():
    if (not os.path.exists(pfpPath)):
        os.makedirs(pfpPath)
    file = request.files["file"]
    ext = "png" #file.filename.split(".")[-1]
    file.save(f'{pfpPath}/{session["user"]["id"]}.{ext}')
    return "", 200