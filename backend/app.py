from flask import Flask
from database import database
from routes.user_bp import user_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object("config")
    database.init_app(app)

    app.register_blueprint(user_bp, url_prefix="/users")

    return app

if __name__ == '__main__':
    create_app().run()