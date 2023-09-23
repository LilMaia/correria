from flask_sqlalchemy import SQLAlchemy
from app_factory import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True)  # Adicione unique=True aqui
    peso = db.Column(db.Float)
    altura = db.Column(db.Float)
    distancia_teste = db.Column(db.Float)
    tempo_teste = db.Column(db.Float)
    ja_corre = db.Column(db.Boolean)
    km_corridos = db.Column(db.Float)
    disponibilidade_treino = db.Column(db.String(255))
    data_nascimento = db.Column(db.Date)
    objetivo_tempo = db.Column(db.Float)
    objetivo_distancia = db.Column(db.Float)
    data_objetivo_final = db.Column(db.Date)
    classificacao = db.Column(db.String(255))

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'email': self.email,
            'peso': self.peso,
            'altura': self.altura,
            'distancia_teste': self.distancia_teste,
            'tempo_teste': self.tempo_teste,
            'ja_corre': self.ja_corre,
            'km_corridos': self.km_corridos,
            'disponibilidade_treino': self.disponibilidade_treino,
            'data_nascimento': self.data_nascimento,
            'objetivo_tempo': self.objetivo_tempo,
            'objetivo_distancia': self.objetivo_distancia,
            'data_objetivo_final': self.data_objetivo_final,
            'classificacao': self.classificacao
        }
