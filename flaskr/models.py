from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from . import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String(80), unique=True, nullable=False)
    mail = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=True)
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
