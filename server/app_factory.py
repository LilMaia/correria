# app_factory.py

from flask import Flask
from config.config import DATABASE_URI
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate  # Importe o Flask-Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
import secrets
from datetime import timedelta

jwt_secret_key = secrets.token_hex(32) 

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['JWT_SECRET_KEY'] = jwt_secret_key  # Chave secreta para geração de token JWT
db = SQLAlchemy(app)
jwt = JWTManager(app)

migrate = Migrate(app, db)