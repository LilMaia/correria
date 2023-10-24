from flask import request, jsonify, send_file
from app_factory import app, db
from models.User import User
from mockers.user_mocker import add_random_users_to_db
from utils.gerar_ficha import gerar_ficha
from io import BytesIO
import os
import zipfile
import io
import logging

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

@app.route('/api/gerar-zip', methods=['GET'])
def gerar_zip():
    diretorio = 'C:/Users/rafae/Documents/correr.ia/correria/server/'
    arquivos_pdf = [os.path.join(diretorio, arquivo) for arquivo in os.listdir(diretorio) if arquivo.lower().endswith('.pdf')]

    try:
        # Cria um arquivo ZIP na memória
        temp_zip = io.BytesIO()
        with zipfile.ZipFile(temp_zip, 'w', zipfile.ZIP_DEFLATED, allowZip64=True) as zip_file:
            for arquivo_pdf in arquivos_pdf:
                try:
                    # Adiciona o arquivo PDF ao ZIP com seu caminho completo como nome interno
                    zip_file.write(arquivo_pdf, os.path.basename(arquivo_pdf))
                except Exception as e:
                    logging.error(f"Erro ao ler o arquivo PDF {arquivo_pdf}: {e}")

        # Retorna o arquivo ZIP como uma resposta HTTP para download
        temp_zip.seek(0)  # Volta ao início do arquivo antes de lê-lo
        response = send_file(temp_zip, as_attachment=True, download_name='arquivos.zip', mimetype='application/zip')
        response.headers["Content-Length"] = len(temp_zip.getvalue())
        return response

    except Exception as e:
        logging.error(f"Erro ao criar o arquivo ZIP: {e}")
        return "Erro ao criar o arquivo ZIP", 500
        
@app.route('/api/listar-arquivos', methods=['GET'])
def listar_arquivos():
    diretorio = 'C:/Users/rafae/Documents/correr.ia/correria/server/'
    arquivos = [arquivo for arquivo in os.listdir(diretorio) if arquivo.lower().endswith('.pdf')]
    return jsonify(arquivos)
        
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
    return send_file(pdf_buffer, as_attachment=True, download_name=f"ficha_de_treino_{user_id}.pdf", mimetype='application/pdf')

#Mocker de usuários
@app.route('/api/user/<int:num_users>', methods=['POST'])
def generate_users(num_users):
    add_random_users_to_db(num_users=num_users)
    return f'Generated {num_users} random users'  # Uma resposta de exemplo

#Rota para verificar funcionamento
@app.route('/')
def index():
    return 'Bem-vindo à página inicial do meu aplicativo!'