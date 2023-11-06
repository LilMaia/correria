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
from datetime import datetime, timedelta

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
        estado=data['estado'],
        cidade=data['cidade'],
        numero_de_atletas=data['numero_de_atletas'],
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

#rota para verificar se o email está cadastrado
@app.route('/assessoria/verificar-email', methods=['POST'])
def verificar_email():
    data = request.get_json()
    email = data['email']
    assessoria = Assessoria.query.filter_by(email=email).first()
    if assessoria:
        return jsonify({'message': 'Email cadastrado'}), 200
    return jsonify({'message': 'Email não existe no banco'}), 404

#rota que recebe um id como parâmetro e recebe os dados do usuario
@app.route('/assessoria/<int:id>', methods=['GET'])
def get_assessoria(id):
    assessoria = Assessoria.query.get(id)
    if not assessoria:
        return jsonify({'message': 'Assessoria não encontrada'}), 404
    return jsonify(assessoria.to_dict()), 200

@app.route('/assessoria/gerar-token-redefinir-senha', methods=['POST'])
def resetar_senha():
    data = request.get_json()
    email = data.get('email')

    # Verificar se o email existe na base de dados
    assessoria = Assessoria.query.filter_by(email=email).first()
    if not assessoria:
        return jsonify({'message': 'Email não encontrado'}), 404

    # Gerar um código de redefinição de senha (token)
    token_de_resetar_senha = generate_reset_code()

    # Definir a data e hora de expiração para 5 minutos após a geração do token
    data_de_expiracao_do_token_de_resetar_senha = datetime.now() + timedelta(minutes=5)

    # Armazenar o token e a data de expiração na base de dados
    assessoria.token_de_resetar_senha = token_de_resetar_senha
    assessoria.data_de_expiracao_do_token_de_resetar_senha = data_de_expiracao_do_token_de_resetar_senha

    # Enviar o código por email
    if send_reset_email(email, token_de_resetar_senha):
        db.session.commit()  # Salvar o token e a data de expiração na base de dados
        return jsonify({'message': 'Código de redefinição de senha enviado para o email.'}), 200
    else:
        return jsonify({'message': 'Erro ao enviar o código de redefinição de senha.'}), 500
    
@app.route('/assessoria/verificar-token-redefinir-senha', methods=['POST'])
def verificar_token():
    data = request.get_json()
    email = data.get('email')
    token = data.get('token')

    # Verificar se o email existe na base de dados
    assessoria = Assessoria.query.filter_by(email=email).first()
    if not assessoria:
        return jsonify({'message': 'Email não encontrado'}), 404

    # Verificar se o token enviado pelo usuário é igual ao token na base de dados
    if assessoria.token_de_resetar_senha != token:
        return jsonify({'message': 'Token inválido'}), 400

    # Verificar se o token está dentro do prazo de validade (5 minutos)
    if assessoria.data_de_expiracao_do_token_de_resetar_senha < datetime.now():
        return jsonify({'message': 'Token expirado'}), 400

    return jsonify({'message': 'Token válido'}), 200

@app.route('/assessoria/redefinir-senha', methods=['POST'])
def redefinir_senha():
    data = request.get_json()
    email = data.get('email')
    token = data.get('token')

    # Verificar se o email existe na base de dados
    assessoria = Assessoria.query.filter_by(email=email).first()
    if not assessoria:
        return jsonify({'message': 'Email não encontrado'}), 404

    # Verificar se o token enviado pelo usuário é igual ao token na base de dados
    if assessoria.token_de_resetar_senha != token:
        return jsonify({'message': 'Token inválido'}), 400

    # Verificar se o token está dentro do prazo de validade (5 minutos)
    if assessoria.data_de_expiracao_do_token_de_resetar_senha < datetime.now():
        return jsonify({'message': 'Token expirado'}), 400

    hashed_password = generate_password_hash(data['nova_senha'], method='sha256')
    # Atualizar a senha na base de dados
    assessoria.senha = hashed_password

    # Limpar o token de redefinição de senha e a data de expiração
    assessoria.token_de_resetar_senha = None
    assessoria.data_de_expiracao_do_token_de_resetar_senha = None

    db.session.commit()  # Salvar a nova senha na base de dados

    return jsonify({'message': 'Senha alterada com sucesso'}), 200


#Mocker de Assessorias
@app.route('/api/assessorias/<int:num_assessorias>', methods=['POST'])
def generate_assessorias(num_assessorias):
    add_random_assessorias_to_db(num_assessorias)
    return jsonify(message=f'Generated {num_assessorias} assessorias'), 201