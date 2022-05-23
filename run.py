from flaskr import create_app, socket

if __name__ == "__main__":
    app = create_app()
    app.debug = True
    socket.run(app, host="0.0.0.0", port=80)
