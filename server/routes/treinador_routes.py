from datetime import datetime
from app_factory import app, db
from werkzeug.security import generate_password_hash, check_password_hash
from models.Treinador import Treinador
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask import request, jsonify, send_file
from flask_jwt_extended import get_jwt_identity
from mockers.treinador_mocker import add_random_treinadores_to_db

#Mocker de treinadores
@app.route('/api/treinadores/<int:num_treinadores>', methods=['POST'])
def generate_treinadores(num_treinadores):
    # Obtém o ID da assessoria do corpo da requisição JSON
    data = request.get_json()
    assessoria_id = data.get('assessoria_id', 1)  # Use 1 como valor padrão se 'assessoria_id' não estiver presente
    
    # Chama a função para adicionar atletas ao banco de dados
    add_random_treinadores_to_db(num_treinadores, assessoria_id)
    
    return jsonify(message=f'Generated {num_treinadores} random treinadores for assessoria ID {assessoria_id}.'), 201