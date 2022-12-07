from flask import Flask
from database import database
from routes.user_bp import user_bp
from routes.project_bp import project_bp
from routes.auth_bp import auth_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app, support_credentials=True)
    app.config.from_object("config")
    database.init_app(app)

    app.register_blueprint(user_bp, url_prefix="/users")
    app.register_blueprint(project_bp, url_prefix="/projects")
    app.register_blueprint(auth_bp, url_prefix="/auth")

    return app

if __name__ == '__main__':
    create_app().run()

