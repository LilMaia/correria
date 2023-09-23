# app_factory.py

from flask import Flask
from config.config import DATABASE_URI
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate  # Importe o Flask-Migrate
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
db = SQLAlchemy(app)


migrate = Migrate(app, db)