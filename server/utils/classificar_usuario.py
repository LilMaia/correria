def classificar_corredor(km_teste_12_min, corre_regularmente):
    if not corre_regularmente:
        return "Sedentário"
    elif km_teste_12_min >= 3.0:
        return "Avançado"
    elif km_teste_12_min >= 2.2:
        return "Intermediário"
    else:
        return "Iniciante"