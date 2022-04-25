from flaskr import create_app


if __name__ == "__main__":
    app, socket = create_app()
    app.debug = True
    socket.run(app)
