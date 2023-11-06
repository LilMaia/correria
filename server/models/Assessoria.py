from flask_sqlalchemy import SQLAlchemy
from app_factory import db

class Assessoria(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True)
    telefone = db.Column(db.String(255), unique=True)
    site = db.Column(db.String(255))
    estado = db.Column(db.String(255))
    cidade = db.Column(db.String(255))
    numero_de_atletas = db.Column(db.Integer)
    data_cadastro = db.Column(db.Date)
    senha = db.Column(db.String(255))

    # Relacionamento com treinadores
    treinadores = db.relationship('Treinador', backref='assessoria_treinador', lazy='dynamic')

    # Relacionamento com atletas
    atletas = db.relationship('Atleta', backref='assessoria_atleta', lazy='dynamic')

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'email': self.email,
            'telefone': self.telefone,
            'site': self.site,
            'estado': self.estado,
            'cidade': self.cidade,
            'numero_de_atletas': self.numero_de_atletas,
            'data_cadastro': self.data_cadastro,
            'senha': self.senha,
            'treinadores': [treinador.to_dict() for treinador in self.treinadores],
            'atletas': [atleta.to_dict() for atleta in self.atletas]
        }

from models.Treinador import Treinador
from models.Atleta import Atleta