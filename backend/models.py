from flask import Flask
from database.database import db
from sqlalchemy import ForeignKey
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)

    def __init__(self, name, password, username):
        self.name = name
        self.password = generate_password_hash(password, method="sha256")
        self.username = username
    
    def __repr__(self):
        return "<id {}>".format(self.id)
    
    @classmethod
    def authenticate(cls, **kwargs):
        username = kwargs.get("username")
        password = kwargs.get("password")
        if not username or not password:
            return None
        
        user = cls.query.filter_by(username=username.lower()).first()
        if not user or not check_password_hash(user.password, password):
            return None
        
        return user
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "username": self.username
        }


class Project(db.Model):
    __tablename__ = "project"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    cost = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp(), nullable=False)
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), nullable=False)
    done = db.Column(db.Boolean, default=False)
    author_id = db.Column(db.Integer, ForeignKey("user.id"))

    def __init__(self, title, description, cost, created_at, updated_at, done, author_id):
        self.title = title
        self.description = description
        self.cost = cost
        self.created_at = created_at
        self.updated_at = updated_at
        self.done = done
        self.author_id = author_id
    
    def __repr__(self):
        return "<id {}>".format(self.id)
    
    def serialize(self):
        author = User.query.get(self.author_id)
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "cost": self.cost,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "done": self.done,
            "author": author.serialize()
        }