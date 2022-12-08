from flask import jsonify, request
from models import User
from database.database import db
from sqlalchemy import exc
from controllers.AuthController import token_required


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
        error_message = str(error.__dict__["orig"])
        return jsonify({ 'message': error_message }), 400


@token_required
def get_all_users(current_user):
    try:
        users = User.query.all()
        return jsonify([user.serialize() for user in users])
    except exc.SQLAlchemyError as error:
        return (str(error.__dict__["orig"]), 400)

