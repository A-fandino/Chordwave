# Main router file
from flask import current_app
from . import db


@current_app.route("/")
def index():
    return "Hey! I'm using Chordwave!"


@current_app.route('/create-db')
def createdb():
    if current_app.debug:
        from . import models
        db.drop_all()
        db.create_all()
        return "Done!"
