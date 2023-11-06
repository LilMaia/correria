from flask_sqlalchemy import SQLAlchemy
from app_factory import db

class Atleta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255))
    sobrenome = db.Column(db.String(255))
    telefone = db.Column(db.String(255), unique=True)
    email = db.Column(db.String(255), unique=True)
    data_cadastro = db.Column(db.Date)
    data_nascimento = db.Column(db.Date)
    data_objetivo_final = db.Column(db.Date)
    objetivo_distancia = db.Column(db.Float)
    velocidade_objetivo = db.Column(db.Float)
    dias_de_treino = db.Column(db.String(255)) #deve virar uma entidade no futuro
    disponibilidade_diaria = db.Column(db.String(255)) #deve virar uma entidade no futuro
    volume_semanal_atual = db.Column(db.Float)
    volume_semanal_final = db.Column(db.Float)
    
    assessoria_id = db.Column(db.Integer, db.ForeignKey('assessoria.id'), nullable=False)
    assessoria = db.relationship('Assessoria', back_populates='atletas', viewonly=True)
    
    treinador_id = db.Column(db.Integer, db.ForeignKey('treinador.id'), nullable=False)
    treinador = db.relationship('Treinador', back_populates='atletas', viewonly=True)

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'sobrenome': self.sobrenome,
            'telefone': self.telefone,
            'email': self.email,
            'data_cadastro': self.data_cadastro,
            'data_nascimento': self.data_nascimento,
            'data_objetivo_final': self.data_objetivo_final,
            'objetivo_distancia': self.objetivo_distancia,
            'velocidade_objetivo': self.velocidade_objetivo,
            'dias_de_treino': self.dias_de_treino,
            'disponibilidade_diaria': self.disponibilidade_diaria,
            'volume_semanal_atual': self.volume_semanal_atual,
            'volume_semanal_final': self.volume_semanal_final,
            'assessoria': self.assessoria.to_dict(),
            'treinador': self.treinador.to_dict()
        }

from models.Assessoria import Assessoria
from models.Treinador import Treinador