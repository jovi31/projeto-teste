from flask import Blueprint
import controllers.AuthController as authController

auth_bp = Blueprint("auth_bp", __name__)

auth_bp.route("/current_user", methods=["GET"])(authController.get_current_user)
auth_bp.route("/login", methods=["POST"])(authController.login)