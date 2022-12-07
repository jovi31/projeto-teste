import jwt
from flask import request, make_response, current_app, jsonify
from functools import wraps
from models import User
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # jwt is passed in the request header
        if "Authorization" in request.headers:
            token = request.headers.get("Authorization")
        # return 401 if token is not passed
        if not token:
            return jsonify({"message" : "token está faltando"}), 401

         # decoding the payload to fetch the stored details
        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
            current_user = User.query.filter_by(id=data["sub"]).first()
        except:
            return jsonify({
                "message" : "O token é inválido ou expirou"
            }), 401
        # returns the current logged in users contex to the routes
        return  f(current_user, *args, **kwargs)
  
    return decorated


def login():
    auth = request.authorization
    user = User.authenticate(**auth)

    if not user:
        return jsonify({ 'message': 'Credenciais inválidas', 'authenticated': False }), 401

    token = jwt.encode({
        'sub': user.id,
        'iat': datetime.now(),
        'exp': datetime.now() + timedelta(hours=12)},
        current_app.config['SECRET_KEY'])
    return jsonify({'message': 'Validado com sucesso', 
                    'token': token,
                    'iat': datetime.now(),
                    'exp': datetime.now() + timedelta(hours=12)
                    })


@token_required
def get_current_user(current_user):
    return jsonify(current_user.serialize())