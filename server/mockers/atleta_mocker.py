from faker import Faker
from app_factory import db
from models.Atleta import Atleta
fake = Faker()

def generate_random_atleta(assessoria_id, treinador_id):
    atleta = Atleta(
        nome=fake.first_name(),
        sobrenome=fake.last_name(),
        telefone=fake.phone_number(),
        email=fake.email(),
        data_cadastro=fake.date_this_century(),
        data_nascimento=fake.date_of_birth(minimum_age=18, maximum_age=70),
        data_objetivo_final=fake.date_this_century(),
        objetivo_distancia=fake.random_int(min=1000, max=30000) / 100.0,
        velocidade_objetivo=fake.random_int(min=10, max=20) / 10.0,
        dias_de_treino=fake.random_element(elements=('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo')),
        disponibilidade_diaria=fake.random_element(elements=('Manhã', 'Tarde', 'Noite')),
        volume_semanal_atual=fake.random_int(min=0, max=500000) / 100.0,
        volume_semanal_final=fake.random_int(min=0, max=500000) / 100.0,
        assessoria_id=assessoria_id,
        treinador_id=treinador_id
    )
    return atleta

def add_random_atletas_to_db(num_atletas, assessoria_id, treinador_id):
    for _ in range(num_atletas):
        random_atleta = generate_random_atleta(assessoria_id, treinador_id)
        db.session.add(random_atleta)
    db.session.commit()

