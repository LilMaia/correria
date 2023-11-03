from datetime import datetime
from app_factory import app, db
from werkzeug.security import generate_password_hash, check_password_hash
from models.Atleta import Atleta
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask import request, jsonify, send_file
from flask_jwt_extended import get_jwt_identity
from mockers.atleta_mocker import add_random_atletas_to_db

# Mocker de atletas
@app.route('/api/atletas/<int:num_atletas>', methods=['POST'])
def generate_atletas(num_atletas):
    # Obtém o ID da assessoria e o ID do treinador do corpo da requisição JSON
    data = request.get_json()
    assessoria_id = data.get('assessoria_id', 1)  # Use 1 como valor padrão se 'assessoria_id' não estiver presente
    treinador_id = data.get('treinador_id',1)  # Obtém o ID do treinador do corpo da requisição JSON
    
    # Chama a função para adicionar atletas ao banco de dados
    add_random_atletas_to_db(num_atletas, assessoria_id, treinador_id)
    
    return jsonify(message=f'Generated {num_atletas} random atletas for assessoria ID {assessoria_id} and treinador ID {treinador_id}.'), 201