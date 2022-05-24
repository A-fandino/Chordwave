from flask import Blueprint, redirect, request, jsonify, send_file, session
from flask_cors import cross_origin, CORS
import os
import json

import sqlalchemy
from .models import Like, Genre, PlaylistUserSong, Song, User, db, Room, Playlist, Listen
from .auth import login_required
from sqlalchemy.sql.expression import func
from .auth import abortMsg

bp = Blueprint('api', __name__, url_prefix='/api')

pfpPath = 'flaskr/uploads/pfp'
musicPath = 'flaskr/uploads/music'

def serializeList(itemList):
    data = []
    for x in itemList:
        data.append(x.serialize)
    return data

@bp.route('/genres')
def genres():
    return json.dumps([g.name for g in Genre.query.all()])


@bp.route("/last-songs")
@bp.route("/last-songs/<int:limit>")
@bp.route("/last-songs/<int:limit>/<int:offset>")
def lastSongs(limit=1, offset=0):
    songs = Song.query.order_by(Song.created_at.desc()).limit(
        limit).offset(limit*offset)
    return jsonify(serializeList(songs))


@bp.route("/random-song")
@bp.route("/random-song/<int:num>")
def randomSong(num=1):
    songs = Song.query.order_by(func.random()).limit(num)
    return jsonify(serializeList(songs))

@bp.route('/similar-song/')
@bp.route('/similar-song/<string>')
def similarName(string = None):
    if (string is None): return jsonify(serializeList(Song.query.all()))
    songs = Song.query.filter(Song.name.like(f"%{string}%")).all()
    return jsonify(serializeList(songs)), 200

@bp.route('/song/<author>/<name>')
def song(author, name):
    user = User.query.filter_by(nickname=author).first()
    song = None
    for x in user.songs:
        if x.name == name:
            song = x
            break
    data = song.serialize
    return jsonify(data)


@bp.route('/userSongs/<nickname>')
def userSongs(nickname):
    user = User.query.filter_by(nickname=nickname).first()
    return jsonify([x.serialize for x in user.songs])


@bp.route('/upload', methods=['POST'])
@cross_origin()
@login_required
def upload():
    try:
        file = request.files['file']
        file.stream.seek(0)
        name = request.form["name"]
        ext = file.filename.split(".")[-1]
        if (not os.path.exists(musicPath)):
            os.makedirs(musicPath)
        author_id = session["user"]["id"]
        song = Song(name, ext, author_id)
        db.session.add(song)
        db.session.commit()
        file.save(f'{musicPath}/{song.id}.{ext}')
        return redirect(f'http://localhost/song/{song.author.nickname}/{name}')
    except:
        return redirect("http://localhost/upload")

@bp.route('/room', methods=["POST"])
def postRoom():
    data = json.loads(request.data.decode())
    if not "max" in data: abortMsg("No 'max user count' found")
    if data["max"] > 8: abortMsg("Cannot have more than 8 users")
    if data["max"] < 2: abortMsg("Cannot have less than 2 users")
    user = User.query.get(session["user"]["id"])
    
    if (user.getActiveRoom()): abortMsg("You already have an active room.")
    room = Room(session["user"]["id"], data["max"])
    room.save()
    return "", 200

@bp.route("/purge-room",methods=["DELETE"])
def delRoom():
    db.session.delete(User.query.get(session["user"]["id"]).getActiveRoom())
    db.session.commit()
    return "", 200

@bp.route("/room-exists")
def roomExists():
    return str(int(bool(User.query.get(session["user"]["id"]).getActiveRoom())))

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

@bp.route("/liked")
def liked():
    if not "user" in session: return "[]"
    data = []
    for s in User.query.get(session["user"]["id"]).likes:
        data.append(s.songs.serialize)
    return jsonify(data)


@bp.route("/history")
@bp.route("/history/<offset>")
def history(offset = 0):
    count = 10
    if not "user" in session: return "[]"
    reprod = User.query.get(session["user"]["id"]).history.order_by(Listen.date.desc()).limit(count).offset(offset).all()
    data = []
    for r in reprod:
        data.append(r.songs.serialize)
    return jsonify(data)


@bp.route("/pfp/<id>")
def pfp(id):
    if os.path.exists(f"{pfpPath}/{id}.png"):
        return send_file(f"../{pfpPath}/{id}.png")
    return send_file("./default.jpg")
    

@bp.route("/changePFP", methods=("POST",))
def changePFP():
    if (not os.path.exists(pfpPath)):
        os.makedirs(pfpPath)
    file = request.files["file"]
    ext = "png" #file.filename.split(".")[-1]
    file.save(f'{pfpPath}/{session["user"]["id"]}.{ext}')
    return "", 200

@bp.route("/new-playlist/<name>", methods=("POST",))
def newPlaylist(name):
    try:
        pl = Playlist(session["user"]["id"], name)
        pl.save()
        return  "", 200
    except sqlalchemy.exc.IntegrityError as err:
        abortMsg("A playlist with that name already exists")

@bp.route("/get-playlists")
@bp.route("/get-playlists/<user_id>")
def getPlaylists(user_id=None): 
    user = User.query.get(user_id if user_id else session["user"]["id"])
    return  jsonify(serializeList(user.playlists.all())), 200

@bp.route("/playlist-songs/<username>/<name>")
def playlistSongs(username, name):
    pl = User.query.filter_by(nickname=username).first().playlists.filter_by(name=name).first()
    data = []
    for p in pl.added:
        data.append(p.song.serialize)
    return jsonify(data)


@bp.route("/modify-playlist/<plName>/<song_id>", methods=("POST","DELETE"))
def modifyPlaylist(plName, song_id):
    # song = Song.query.get(id)
    user_id = session["user"]["id"] #Temporally used to save to self PL
    playlist_id = User.query.get(user_id).playlists.filter_by(name=plName).first().id
    if request.method == "POST":
        plSongUser = PlaylistUserSong(user_id=user_id, playlist_id=playlist_id, song_id=song_id)
        plSongUser.save()
        return "", 200
    if request.method == "DELETE":
        plSongUser = PlaylistUserSong.query.filter_by(playlist_id=playlist_id, song_id=song_id).first()
        db.session.delete(plSongUser)
        db.session.commit()
        return "", 200