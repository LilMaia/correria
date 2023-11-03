from datetime import datetime
from app_factory import app, db
from werkzeug.security import generate_password_hash, check_password_hash
from models.Assessoria import Assessoria
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask import request, jsonify, send_file
from flask_jwt_extended import get_jwt_identity
from mockers.assessoria_mocker import add_random_assessorias_to_db
from utils.assessoria.gerar_codigo_email import generate_reset_code
from utils.assessoria.enviar_email import send_reset_email

# Rota para cadastro de uma nova Assesoria
@app.route('/assessoria/cadastro', methods=['POST'])
def cadastrar_assesoria():
    data = request.get_json()
    hashed_password = generate_password_hash(data['senha'], method='sha256')
    nova_assesoria = Assessoria(
        nome=data['nome'],
        email=data['email'],
        telefone=data['telefone'],
        site=data['site'],
        data_cadastro=datetime.now(),
        senha=hashed_password
    )
    db.session.add(nova_assesoria)
    db.session.commit()
    return jsonify({'message': 'Assesoria cadastrada com sucesso!'}), 201

# Rota para login de uma Assesoria
@app.route('/assessoria/login', methods=['POST'])
def login_assesoria():
    data = request.get_json()
    assesoria = Assessoria.query.filter_by(email=data['email']).first()
    if assesoria and check_password_hash(assesoria.senha, data['senha']):
        access_token = create_access_token(identity={'id': assesoria.id, 'email': assesoria.email})
        return jsonify({'access_token': access_token}), 200
    return jsonify({'message': 'Credenciais inválidas'}), 401

@app.route('/assessoria/verificar-token', methods=['GET'])
@jwt_required()
def rota_protegida():
    current_user = get_jwt_identity()
    assessoria_id = current_user['id']
    assessoria_email = current_user['email']
    return jsonify(assessoria_id=assessoria_id, assessoria_email=assessoria_email), 200

# Rota para resetar a senha
@app.route('/assessoria/resetar-senha', methods=['POST'])
def resetar_senha():
    data = request.get_json()
    email = data.get('email')

    # Verificar se o email existe na base de dados
    assessoria = Assessoria.query.filter_by(email=email).first()
    if not assessoria:
        return jsonify({'message': 'Email não encontrado'}), 404

    # Gerar um código de redefinição de senha
    reset_code = generate_reset_code()

    # Enviar o código por email
    if send_reset_email(email, reset_code):
        # Aqui você pode salvar o código de redefinição na base de dados para verificar posteriormente
        return jsonify({'message': 'Código de redefinição de senha enviado para o email.'}), 200
    else:
        return jsonify({'message': 'Erro ao enviar o código de redefinição de senha.'}), 500

#Mocker de Assessorias
@app.route('/api/assessorias/<int:num_assessorias>', methods=['POST'])
def generate_assessorias(num_assessorias):
    add_random_assessorias_to_db(num_assessorias)
    return jsonify(message=f'Generated {num_assessorias} assessorias'), 201