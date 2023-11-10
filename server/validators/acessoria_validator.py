from marshmallow import fields, validates, ValidationError
from app_factory import ma

class AssessoriaSchema(ma.Schema):
    nome = fields.String(required=False)
    email = fields.Email(required=False)
    telefone = fields.String(required=False)
    site = fields.String(required=False)
    estado = fields.String(required=False)
    cidade = fields.String(required=False)
    numero_de_atletas = fields.Integer(required=False)
    senha = fields.String(required=False)

    @validates('numero_de_atletas')
    def validate_numero_de_atletas(self, value):
        if value > 500000:
            raise ValidationError('Número de atletas não pode ser maior que 500000')

assesoria_schema = AssessoriaSchema()

# Adiciona esta linha para exportar o esquema
__all__ = ['AssessoriaSchema']