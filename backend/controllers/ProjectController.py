from flask import jsonify, request
from models import Project
from database.database import db
from sqlalchemy import exc
from controllers.AuthController import token_required


@token_required
def add_project(current_user):
    data = request.json
    try:
        project = Project(
            data.get("title"),
            data.get("description"),
            data.get("cost"),
            data.get("created_at"),
            data.get("updated_at"),
            data.get("done"),
            current_user.id
        )
        db.session.add(project)
        db.session.commit()
        return jsonify(project.serialize())
    except exc.SQLAlchemyError as error:
        return (str(error.__dict__["orig"]), 400)


@token_required
def get_user_projects(current_user):
    try:
        projects = Project.query.filter_by(author_id=current_user.id)
        return jsonify([project.serialize() for project in projects])
    except exc.SQLAlchemyError as error:
        return (str(error.__dict__["orig"]), 400)


@token_required
def get_project(current_user, id):
    try:
        project = Project.query.filter_by(id=id, author_id=current_user.id).one()
        return jsonify(project.serialize())
    except exc.SQLAlchemyError as error:
        return (str(error.__dict__["orig"]), 400)