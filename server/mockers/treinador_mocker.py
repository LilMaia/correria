from faker import Faker
from app_factory import db
from models.Treinador import Treinador

fake = Faker()

def generate_random_treinador(assessoria_id):
    treinador = Treinador(
        nome=fake.first_name(),
        sobrenome=fake.last_name(),
        telefone=fake.phone_number(),
        email=fake.email(),
        data_cadastro=fake.date_this_century(),
        registro_profissional=fake.uuid4(),
        role=fake.random_element(elements=('Treinador', 'Assistente', 'Fisioterapeuta', 'Nutricionista')),
        senha=fake.password(),
        assessoria_id=assessoria_id
    )
    return treinador

def add_random_treinadores_to_db(num_treinadores, assessoria_id):
    for _ in range(num_treinadores):
        random_treinador = generate_random_treinador(assessoria_id)
        db.session.add(random_treinador)
    db.session.commit()
