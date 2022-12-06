from flask import Blueprint
import controllers.UserController as userController

user_bp = Blueprint("user_bp", __name__)

user_bp.route("/", methods=["POST"])(userController.add_user)
user_bp.route("/", methods=["GET"])(userController.get_all_users)