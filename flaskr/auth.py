from flask import Blueprint, redirect, session, request
import functools
from .models import db, User
bp = Blueprint('auth', __name__, url_prefix='/auth')


def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if not "user" in session or session["user"] is None:
            return redirect("http://localhost/login")
        return view(**kwargs)
    return wrapped_view


@bp.route('/check')
def check():
    return session["user"] if "user" in session else ""


@bp.route('/login', methods=['POST'])
def login():
    identifier = request.form["identifier"]
    password = request.form["password"]

    user = db.session.query(User).filter(
        ((User.mail == identifier) | (User.nickname == identifier))).first()
    if user is None or user.verify_password(password) is False:
        return 'CREDENTIALS ERROR'
    loginUser(user)
    return redirect("http://localhost")


@bp.route('/register', methods=('POST',))
def register():
    nick = request.form["nickname"]
    mail = request.form["mail"]
    plain_pass = request.form["password"]
    newUser = User(nick, mail, plain_pass)
    newUser.save()
    loginUser(newUser)
    return redirect("http://localhost")


@bp.route('/logout')
@login_required
def logout():
    session.clear()
    return redirect("http://localhost")


def loginUser(user: User):
    session["user"] = user.serialize
