def calcular_aquecimento_arrefecimento(categoria_atleta):
    if categoria_atleta == "Iniciante":
        aquecimento = 1.5
        arrefecimento = 0.5
    elif categoria_atleta == "Intermediario":
        aquecimento = 2
        arrefecimento = 1
    elif categoria_atleta == "Avançado":
        aquecimento = 3
        arrefecimento = 1
    else:
        aquecimento = 0
        arrefecimento = 0  # Categoria desconhecida

    return aquecimento, arrefecimento