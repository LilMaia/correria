from datetime import date

def calcular_semanas_faltantes(data_objetivo_final):
    # Obtém a data atual
    data_atual = date.today()

    # Calcula a diferença entre a data objetivo final e a data atual
    diferenca = data_objetivo_final - data_atual

    # Calcula o número de semanas faltantes
    semanas_faltantes = diferenca.days // 7

    return semanas_faltantes