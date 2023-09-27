from flask import request, jsonify, send_file
from app_factory import app, db
from models.User import User
from mockers.user_mocker import add_random_users_to_db
from utils.gerar_ficha import gerar_ficha
from io import BytesIO

# Definir uma rota com parâmetros
@app.get('/api/get-user/<int:user_id>')
def get_user(user_id):
    # Obter o usuário com o ID especificado
    user = User.query.get(user_id)
    # Retornar o usuário como um dicionário JSON
    return jsonify(user.to_dict())

@app.get('/api/verify-if-user-exists/<string:email>')
def verify_if_user_exists(email):
    # Obter o usuário com o ID especificado
    user = User.query.filter_by(email=email).first()
    #retorne verdadeiro se o usuário existir
    if user:
        return jsonify(True)
    else:
        return jsonify(False)
    

# Rota para criar um novo usuário (método POST)
@app.route('/api/create-user', methods=['POST'])
def create_user():
    # Obter os dados do usuário a partir do corpo da requisição
    user_data = request.json
    # Criar um novo usuário a partir dos dados recebidos
    new_user = User(
        nome=user_data['nome'],
        email=user_data['email'],
        peso=user_data['peso'],
        altura=user_data['altura'],
        distancia_teste=user_data['distancia_teste'],
        tempo_teste=user_data['tempo_teste'],
        ja_corre=user_data['ja_corre'],
        km_corridos=user_data['km_corridos'],
        disponibilidade_treino=user_data['disponibilidade_treino'],
        data_nascimento=user_data['data_nascimento'],
        objetivo_tempo=user_data['objetivo_tempo'],
        objetivo_distancia=user_data['objetivo_distancia'],
        data_objetivo_final=user_data['data_objetivo_final'],
        volume_semanal_final=user_data['volume_semanal_final'],
    )
    # Adicionar o novo usuário ao banco de dados
    db.session.add(new_user)
    db.session.commit()
    # Retornar o novo usuário como JSON
    return jsonify(new_user.id)

@app.route('/api/create-treino/<int:user_id>', methods=['POST'])
def create_treino(user_id):
    # Obter o usuário com o ID especificado
    user = User.query.get(user_id)

    # Verificar se o usuário existe
    if user is None:
        return jsonify({'error': 'Usuário não encontrado'}), 404

    # Gerar a ficha do usuário (PDF)
    pdf_buffer = BytesIO()
    gerar_ficha(user, pdf_buffer)

    # Salvar o PDF em um arquivo temporário (opcional)
    temp_file_name = f"ficha_de_treino_{user_id}.pdf"
    with open(temp_file_name, "wb") as temp_file:
        temp_file.write(pdf_buffer.getvalue())

    # Retornar o PDF como uma resposta HTTP para download
    pdf_buffer.seek(0)
    return send_file(pdf_buffer, as_attachment=True, download_name=f"ficha_de_treino_{user_id}.pdf")

#Mocker de usuários
@app.route('/api/user/<int:num_users>', methods=['POST'])
def generate_users(num_users):
    add_random_users_to_db(num_users=num_users)
    return f'Generated {num_users} random users'  # Uma resposta de exemplo

#Rota para verificar funcionamento
@app.route('/')
def index():
    return 'Bem-vindo à página inicial do meu aplicativo!'