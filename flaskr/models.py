from datetime import datetime
from linecache import lazycache
from re import M
from flask import jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import librosa
from . import db

SONG_ID_LENGTH = 20
# MANY TO MANY tables

SongGenre = db.Table(
    'song_genre',
    db.Column("song_id", db.String(SONG_ID_LENGTH),
              db.ForeignKey("song.id"), primary_key=True),
    db.Column("genre_id", db.String(80),
              db.ForeignKey("genre.name"), primary_key=True)
)


class Listen(db.Model):
    user_id = db.Column(db.Integer,
                        db.ForeignKey("user.id"), primary_key=True)
    song_id = db.Column(db.String(SONG_ID_LENGTH),
                        db.ForeignKey("song.id"), primary_key=True)
    count = db.Column(db.Integer, db.Sequence(
        'seq_listen_id', start=1, increment=1), primary_key=True)
    date = db.Column(db.DateTime, nullable=False)

    def __init__(self, user_id, song_id):
        self.user_id = user_id
        self.song_id = song_id
        self.date = datetime.now()


class Like(db.Model):
    user_id = db.Column(db.Integer,
                        db.ForeignKey("user.id"), primary_key=True)
    song_id = db.Column(db.String(SONG_ID_LENGTH),
                        db.ForeignKey("song.id"), primary_key=True)
    date = db.Column(db.DateTime, nullable=False)

    def __init__(self, user_id, song_id):
        self.user_id = user_id
        self.song_id = song_id
        self.date = datetime.now()


# Model Tables
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String(80), unique=True, nullable=False)
    mail = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(102), nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=True)
    songs = db.relationship("Song", backref="author", lazy=True)
    created_at = db.Column(db.DateTime, nullable=False)
    listents = db.relationship("Listen", lazy="subquery", backref="users")
    likes = db.relationship("Like",
                            lazy="subquery", backref="users")
    playlists = db.relationship("Playlist", backref="user", lazy=True)
    rooms = db.relationship("Room", backref="admin", lazy=True)

    def __init__(self, nickname, mail, plain_pass):
        self.nickname = nickname
        self.password = generate_password_hash(plain_pass)
        self.mail = mail
        self.active = True
        self.created_at = datetime.now()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def getActiveRoom(self):
        room = Room.query.filter_by(user_id=self.id, active=1).first()
        return room

    @property
    def serialize(self):
        return {
            "id": self.id,
            "nickname": self.nickname,
            "mail": self.mail,
            "pretty_date": self.created_at.strftime("%B %dth %Y"),
            "ddmmyy": self.created_at.strftime("%d/%m/%Y"),
            "mmddyy": self.created_at.strftime("%m/%d/%Y"),
        }

    def __repr__(self) -> str:
        return f"<User {self.nickname}>"

    def verify_password(self, pwd):
        print(len(generate_password_hash(pwd)))
        return check_password_hash(self.password, pwd)


class Song(db.Model):

    ID_LENGTH = SONG_ID_LENGTH if (SONG_ID_LENGTH) else 20

    id = db.Column(db.String(ID_LENGTH), primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    format = db.Column(db.String(10), nullable=False)
    author_id = db.Column(
        db.Integer, db.ForeignKey("user.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    genres = db.relationship("Genre", secondary=SongGenre,
                             lazy="subquery", backref=db.backref('songs', lazy=True))
    listents = db.relationship(
        "Listen", lazy="subquery", backref="songs")
    likes = db.relationship("Like",
                            lazy="subquery", backref="songs")
    __table_args__ = (db.UniqueConstraint(
        "name", "author_id", name="author_name"),)

    def __init__(self, name, format, author_id):
        self.id = self.generate_id()
        self.name = name
        self.format = format
        # self.uploader = uploader_id
        self.author_id = author_id
        self.created_at = datetime.now()

    def generate_id(self):
        from random import choice
        from string import ascii_letters, digits
        id = ''
        for _ in range(self.ID_LENGTH):
            id += choice(ascii_letters + digits)
        return id

    @property
    def serialize(self):
        return {
            "name": self.name,
            "format": self.format,
            # "duration": librosa.get_duration(
            #     filename='./flaskr/uploads/music/'+self.id+"."+self.format),
            "author": self.author.nickname
        }

    def __repr__(self) -> str:
        return f"<Song {self.name}>"


class Genre(db.Model):
    name = db.Column(db.String(80), primary_key=True)


class Playlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey("user.id"), unique=True)
    name = db.Column(db.String(80), unique=True)
    created_at = db.Column(db.DateTime, nullable=False)
    __table_args__ = (db.UniqueConstraint(
        "user_id", "name", name="user_name"),)

    def __init__(self, user_id, name):
        self.user_id = user_id
        self.name = name
        self.created_at = datetime.now()


class PlaylistUserSong(db.Model):
    playlist_id = db.Column(
        db.Integer, db.ForeignKey("playlist.id"), primary_key=True)
    song_id = db.Column(db.String(SONG_ID_LENGTH),
                        db.ForeignKey("song.id"), primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey("user.id"), primary_key=True)
    uploaded_at = db.Column(db.DateTime, nullable=False)

    def __init__(self, author_id, playlist_name, user_id, name):
        self.author_id = author_id
        self.playlist_name = playlist_name
        self.user_id = user_id
        self.name = name
        self.upload_at = datetime.now()


class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey("user.id"), nullable=False)
    max_users = db.Column(db.Integer, nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.DateTime, nullable=False)

    def __init__(self, user_id, max_users):
        self.user_id = user_id
        self.max_users = max_users
        self.created_at = datetime.now()
    

    def save(self):
        db.session.add(self)
        db.session.commit()
