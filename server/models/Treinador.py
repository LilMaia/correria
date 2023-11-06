from flask_sqlalchemy import SQLAlchemy
from app_factory import db


class Treinador(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255))
    sobrenome = db.Column(db.String(255))
    telefone = db.Column(db.String(255), unique=True)  # Adicione unique=True aqui
    email = db.Column(db.String(255), unique=True)  # Adicione unique=True aqui
    data_cadastro = db.Column(db.Date)
    registro_profissional = db.Column(db.String(255))
    role = db.Column(db.String(255))
    senha = db.Column(db.String(255))
    
    assessoria_id = db.Column(db.Integer, db.ForeignKey('assessoria.id'), nullable=False)
    assessoria = db.relationship('Assessoria', back_populates='treinadores', viewonly=True)

    atletas = db.relationship('Atleta', back_populates='treinador', viewonly=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'sobrenome': self.sobrenome,
            'telefone': self.telefone,
            'email': self.email,
            'data_cadastro': self.data_cadastro,
            'registro_profissional': self.registro_profissional,
            'role': self.role,
            'senha': self.senha,
            'assessoria': self.assessoria.to_dict(),
            'atletas': [atleta.to_dict() for atleta in self.atletas]
        }

from models.Assessoria import Assessoria
from models.Atleta import Atleta