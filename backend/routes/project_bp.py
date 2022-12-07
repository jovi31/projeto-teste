from flask import Blueprint
import controllers.ProjectController as projectController

project_bp = Blueprint("project_bp", __name__)

project_bp.route("/", methods=["POST"])(projectController.add_project)
project_bp.route("/", methods=["GET"])(projectController.get_user_projects)
project_bp.route("/<int:id>", methods=["GET"])(projectController.get_project)