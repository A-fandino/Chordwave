import os

from flask import Flask, send_from_directory
from flask_socketio import SocketIO, emit
from flask_cors import CORS, cross_origin


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='secret_key',
        # DATABASE=os.path.join(app.instance_path, 'flaskr.mysql')
    )
    socket = SocketIO(app,  cors_allowed_origins=["http://localhost:3000"])

    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    # try:
    #     os.makedirs(app.instance_path)
    # except OSError:
    #     pass

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        path_dir = os.path.abspath("client/dist")  # path react build
        # if path != "" and os.path.exists(os.path.join(path_dir, path)):
        #     return send_from_directory(path_dir, path)
        return send_from_directory(path_dir, 'index.html')

    @socket.on("connect")
    def connect():
        emit("test", 3333)

    @socket.on("ping")
    def ping():
        print("PONG!!!!!")

    from . import auth, api
    app.register_blueprint(auth.bp)
    app.register_blueprint(api.bp)

    return [app, socket]
