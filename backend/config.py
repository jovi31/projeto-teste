import os

DEBUG = True
CORS_HEADERS = "Content-Type"
SQLALCHEMY_DATABASE_URI = "sqlite:///db.db"
SECRET_KEY = os.urandom(32)