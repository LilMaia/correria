from faker import Faker
from app_factory import db
from models.User import User

fake = Faker()

def generate_random_user():
    user = User(
        nome=fake.name(),
        email=fake.email(),
        peso=fake.random_int(min=4000, max=10000) / 100.0,  # Dividir por 100.0 para obter 2 casas decimais
        altura=fake.random_int(min=150, max=220) / 100.0,  # Dividir por 100.0 para obter 2 casas decimais
        distancia_teste=fake.random_int(min=100, max=4200) / 100.0,  # Dividir por 100.0 para obter 2 casas decimais
        tempo_teste=fake.random_int(min=1000, max=30000) / 100.0,  # Dividir por 100.0 para obter 2 casas decimais
        ja_corre=fake.boolean(chance_of_getting_true=50),
        km_corridos=fake.random_int(min=0, max=500000) / 100.0,  # Dividir por 100.0 para obter 2 casas decimais
        disponibilidade_treino=fake.random_element(elements=('Manhã', 'Tarde', 'Noite')),
        data_nascimento=fake.date_of_birth(minimum_age=18, maximum_age=70),
        objetivo_tempo=fake.random_int(min=1000, max=30000) / 100.0, 
        objetivo_distancia=fake.random_int(min=1000, max=30000) / 100.0,
        data_objetivo_final=fake.date_of_birth(minimum_age=18, maximum_age=70),
        volume_semanal_final=fake.random_int(min=0, max=500000) / 100.0,
    )
    return user

def add_random_users_to_db(num_users):
    for _ in range(num_users):
        random_user = generate_random_user()
        db.session.add(random_user)
    db.session.commit()
