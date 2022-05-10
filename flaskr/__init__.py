import os

from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, emit
from flask_cors import CORS

db = SQLAlchemy()
socket = SocketIO(cors_allowed_origins=[
    "http://localhost", "http://localhost:3000"])


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True,
                template_folder=os.path.abspath("client/dist"), static_folder=os.path.abspath("client/dist"))
    app.config.from_mapping(
        SECRET_KEY='secret_key',
        SQLALCHEMY_DATABASE_URI='mysql://root:@localhost/chordwave',
        SQLALCHEMY_TRACK_MODIFICATIONS=False
        # DATABASE=os.path.join(app.instance_path, 'flaskr.mysql')
    )
    # PLUGINS INIT
    db.init_app(app)
    socket.init_app(app)

    # CORS
    cors = CORS(app, supports_credentials=True,
                origins=["http://localhost"])
    app.config['CORS_HEADERS'] = [
        'Content-Type', 'application/json', 'Location']

    # app.config['SUPPORTS_CREDENTIALS'] = True
    with app.app_context():
        from . import auth, api, routes

        # Blueprints
        app.register_blueprint(auth.bp)
        app.register_blueprint(api.bp)

        return app
