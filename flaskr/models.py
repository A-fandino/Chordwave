from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
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


# Model Tables

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String(80), unique=True, nullable=False)
    mail = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=True)
    songs = db.relationship("Song", backref="author", lazy=True)
    created_at = db.Column(db.DateTime, nullable=False)

    def __init__(self, nickname, mail, plain_pass):
        self.nickname = nickname
        self.password = generate_password_hash(plain_pass)
        self.mail = mail
        self.active = True
        self.created_at = datetime.now()

    def __repr__(self) -> str:
        return f"<User {self.nickname}>"

    def verify_password(self, pwd):
        return check_password_hash(self.password, pwd)


class Song(db.Model):

    ID_LENGTH = SONG_ID_LENGTH if (SONG_ID_LENGTH) else 20

    id = db.Column(db.String(ID_LENGTH), primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    format = db.Column(db.String(10), nullable=False)
    # uploader_id = db.Column(
    #     db.Integer, db.ForeignKey("user.id"), nullable=False)
    author_id = db.Column(
        db.Integer, db.ForeignKey("user.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    genres = db.relationship("Genre", secondary=SongGenre, lazy="subquery",
                             backref=db.backref('songs', lazy=True))
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

    def __repr__(self) -> str:
        return f"<Song {self.name}>"


class Genre(db.Model):
    name = db.Column(db.String(80), primary_key=True)
