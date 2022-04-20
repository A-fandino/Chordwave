import os

from flask import Flask, send_from_directory


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='secret_key',
        # DATABASE=os.path.join(app.instance_path, 'flaskr.mysql')
    )

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

    from . import auth
    app.register_blueprint(auth.bp)

    return app
