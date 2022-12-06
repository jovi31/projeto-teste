from flask import jsonify, request
from models import User
from database.database import db
from sqlalchemy import exc


def add_user():
    data = request.json
    try:
        user = User(
            data.get("name"),
            data.get("password"),
            data.get("username")
        )
        db.session.add(user)
        db.session.commit()
        return jsonify(user.serialize())
    except exc.SQLAlchemyError as error:
        return (str(error.__dict__["orig"]), 400)

def get_all_users():
    try:
        users = User.query.all()
        return jsonify([user.serialize() for user in users])
    except exc.SQLAlchemyError as error:
        return (str(error.__dict__["orig"]), 400)