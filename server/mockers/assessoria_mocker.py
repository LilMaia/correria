from faker import Faker
from app_factory import db
from models.Assessoria import Assessoria

fake = Faker()

def generate_random_assessoria():
    assessoria = Assessoria(
        nome=fake.company(),
        email=fake.email(),
        telefone=fake.phone_number(),
        site=fake.url(),
        data_cadastro=fake.date_this_century(),
        senha=fake.password(),
    )
    return assessoria

def add_random_assessorias_to_db(num_assessorias):
    for _ in range(num_assessorias):
        random_assessoria = generate_random_assessoria()
        db.session.add(random_assessoria)
    db.session.commit()
