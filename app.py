from flaskr import create_app


if __name__ == "__main__":
    app, socket = create_app()
    app.debug = True
    app.host = '0.0.0.0'
    socket.run(app)
