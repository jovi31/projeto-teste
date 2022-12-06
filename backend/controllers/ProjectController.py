from flask import jsonify, request
from models import Project
from database.database import db
from sqlalchemy import exc


def add_project(current_user):
    data = request.json
    try:
        project = Project(
            data.get("title")
            data.get("description")
            data.get("cost")
            data.get("created_at")
            data.get("updated_at")
            data.get("done")
            data.get("author")
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