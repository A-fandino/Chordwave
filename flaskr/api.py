from flask import Blueprint, redirect, request, jsonify, session
from flask_cors import cross_origin, CORS
import os
import json
from .models import Genre, Song, User, db
from .auth import login_required
import librosa
bp = Blueprint('api', __name__, url_prefix='/api')


@bp.route('/testing')
def test():
    return "TEST RESPONSE!"


@bp.route('/genres')
def genres():
    return json.dumps([g.name for g in Genre.query.all()])


@bp.route('/song/<author>/<name>')
@cross_origin
def song(author, name):
    user = User.query.filter_by(nickname=author).first()
    song = None
    for x in user.songs:
        if x.name == name:
            song = x
            break
    data = {"filename": song.id, "name": song.name, "format": song.format, "duration": librosa.get_duration(
        filename='./flaskr/uploads/music/'+song.id+"."+song.format)}
    return jsonify(data)


@bp.route('/userSongs/<nickname>')
def userSongs(nickname):
    user = User.query.filter_by(nickname=nickname).first()
    return jsonify([x.serialize for x in user.songs])


@bp.route('/upload', methods=['POST'])
@cross_origin()
@login_required
def index():
    file = request.files['file']
    file.stream.seek(0)
    name = request.form["name"]
    ext = file.filename.split(".")[-1]
    path = './flaskr/uploads/music'
    if (not os.path.exists(path)):
        os.makedirs(path)
    author_id = session["user"]["id"]
    song = Song(name, ext, author_id)
    # author = User.query.get(1).first()["nickname"]
    db.session.add(song)
    db.session.commit()
    file.save(f'{path}/{song.id}.{ext}')
    return redirect(f'http://localhost/song/{song.author.nickname}/{name}')
