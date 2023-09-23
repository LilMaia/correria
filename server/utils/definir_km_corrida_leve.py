def calcular_corrida_leve(volume_semanal):
    if volume_semanal <= 30:
        return "Corrida leve: 6 a 8 km"
    elif volume_semanal <= 38:
        return "Corrida leve: 8 a 10 km"
    elif volume_semanal <= 47:
        return "Corrida leve: 10 a 12 km"
    else:
        return "Corrida leve: 12+ km"