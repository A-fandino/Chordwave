import json
import re
from flask import abort, jsonify, make_response
from flask import Blueprint, redirect, session, request
from flask_cors import cross_origin
import functools
from .models import db, User

bp = Blueprint('auth', __name__, url_prefix='/auth')

def isValidMail(string):
    from email.utils import parseaddr
    return '@' in parseaddr(string)[1]

def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if not "user" in session or session["user"] is None:
            return redirect("http://localhost/login")
        return view(**kwargs)
    return wrapped_view


@bp.route('/check')
@bp.route('/check/<nickname>')
def check(nickname=None):
    if (nickname is None):
        return session["user"] if "user" in session else {}
    user = User.query.filter_by(nickname=nickname).first()
    if (user):
        return user.serialize
    abort(404)


@bp.route('/login', methods=['POST'])
def login():
    try:
        data = json.loads(request.data.decode())
        identifier = data["identifier"]
        password = data["password"]
        user = getUserByIdentifier(identifier)
        if user is None:
            return abortMsg("User does not exist")
        if user.verify_password(password) is False:
            return abortMsg('Incorrect password')
        loginUser(user)
        return "", 200
    except KeyError as kerr:
        abortMsg(f"Missing field {kerr.args[0]}")


@bp.route('/register', methods=('POST',))
@cross_origin(supports_credentials=True, origins="http://localhost")
def register():
    try:
        data = json.loads(request.data.decode())
        nick = data["nickname"]
        mail = data["mail"]
        plain_pass = data["password"]
        verify_pass = data["passwordVerif"]

        # SERVER VALIDATION
        if isValidMail(nick) is True: abortMsg("Nickname cannot be a valid mail address")
        if len(nick) < 3: abortMsg('Nickname must have 3 characters') 
        if (not re.match("^\w+$", nick)): abortMsg("Nickname cannot contain special characters")

        if isValidMail(mail) is False: abortMsg("Email address is not correctly formatted")

        if User.query.filter_by(nickname=nick).first() is not None:
            abortMsg("Nickname already exists")
        if User.query.filter_by(mail=mail).first() is not None:
            abortMsg("Mail already exists")
        if (not re.match('(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}', plain_pass)): abortMsg("Password must contain 8 characters, 1 Uppercase, 1 Lowercase and 1 Number")
        if (plain_pass != verify_pass):
            abortMsg("Password don't match")

        newUser = User(nick, mail, plain_pass)
        newUser.save()
        loginUser(newUser)
        # return redirect("http://localhost/profile")
        return "", 200
    except KeyError as kerr:
        abortMsg(f"Missing field {kerr.args[0]}")


@bp.route('/a', methods=('POST',))
def a():
    print(request.args)
    return "fg"


@bp.route('/logout')
@login_required
def logout():
    session.clear()
    return redirect("http://localhost")


@bp.route('/exists/<identifier>')
def exists(identifier):
    if getUserByIdentifier(identifier):
        return "", 200
    abort(404)


def loginUser(user: User):
    session["user"] = user.serialize


def getUserByIdentifier(identifier):
    if (isValidMail(identifier)):
        return User.query.filter_by(mail=identifier).first()
    return User.query.filter_by(nickname=identifier).first()
    # return db.session.query(User).filter(
    #     ((User.mail == identifier) | (User.nickname == identifier))).first()


def abortMsg(msg="SERVER ERROR", code=500):
    abort(make_response(jsonify({"msg": msg}), code))
