import os
import json
from flask import Blueprint, redirect, request, jsonify
from .models import Genre, Song, User, db
bp = Blueprint('api', __name__, url_prefix='/api')


@bp.route('/genres')
def genres():
    return json.dumps([g.name for g in Genre.query.all()])


@bp.route('/song/<author>/<name>')
def song(author, name):
    user = User.query.filter_by(nickname=author).first()
    song = None
    for x in user.songs:
        if x.name == name:
            song = x
            break
    data = {"filename": song.id, "name": song.name, "format": song.format}
    return jsonify(data)


@bp.route('/upload', methods=['POST'])
def index():
    file = request.files['file']
    file.stream.seek(0)
    name = request.form["name"]
    ext = file.filename.split(".")[-1]
    path = './flaskr/uploads/music'
    if (not os.path.exists(path)):
        os.makedirs(path)
    song = Song(name, ext, 1)
    # author = User.query.get(1).first()["nickname"]
    db.session.add(song)
    db.session.commit()
    file.save(f'{path}/{song.id}.{ext}')
    return redirect(f'http://localhost/song/{song.author.nickname}/{name}')
