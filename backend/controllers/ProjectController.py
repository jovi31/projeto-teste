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
def update_project(current_user, id):
    data = request.json
    try:
        project = project = Project.query.filter_by(id=id).one()
        if project:
            if project.author_id == current_user.id:
                project.title = data.get("title")
                project.description = data.get("description")
                project.cost = data.get("cost")
                project.updated_at = db.func.current_timestamp()
                project.done = data.get("done")
                db.session.commit()
                return jsonify(project.serialize())
            else:
                return ("O projeto não pertence ao usuário", 400)

        return ("Projeto não encontrado", 400)
    except exc.SQLAlchemyError as error:
        return (str(error.__dict__["orig"]), 400)


@token_required
def delete_project(current_user, id):
    try:
        project = Project.query.filter_by(id=id).one()
        if project:
            if project.author_id == current_user.id:
                db.session.delete(project)
                db.session.commit()
                return "Projeto deletado com sucesso!", 200
            else:
                return ("O projeto não pertence ao usuário", 400)

        return ("Projeto não encontrado", 400)
    except exc.SQLAlchemyError as error:
        return (str(error.__dict__["orig"]), 400)


@token_required
def get_user_projects(current_user):
    rows_per_page = 5
    page = int(request.args["page"])
    offset = rows_per_page * (page - 1)
    try:
        projects = db.session.query(Project).filter_by(author_id=current_user.id)
        length = projects.count()
        projects = projects.offset(offset)
        projects = projects.limit(rows_per_page)
        hasNextPage = (offset + projects.count()) < length
        response = {
            "length": length,
            "page": page,
            "results": [project.serialize() for project in projects],
            "hasNextPage": hasNextPage
        }
        return jsonify(response)
    except exc.SQLAlchemyError as error:
        return (str(error.__dict__["orig"]), 400)


@token_required
def get_project(current_user, id):
    try:
        project = Project.query.filter_by(id=id, author_id=current_user.id).one()
        return jsonify(project.serialize())
    except exc.SQLAlchemyError as error:
        return (str(error.__dict__["orig"]), 400)