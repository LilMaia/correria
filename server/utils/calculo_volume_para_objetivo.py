def calcular_volumes_semanais(Vi, VF, semanas):
    # Calcula o aumento semanal com base no volume inicial, final e no número de semanas
    aumento_semanal = (VF - Vi) / semanas
    
    # Lista para armazenar o volume de cada semana
    volumes_semanais = []
    
    # Inicialmente, o volume atual é igual ao volume inicial
    Vi_atual = Vi
    
    # Loop para calcular os volumes de cada semana
    for _ in range(semanas):
        Vi_atual += aumento_semanal
        volumes_semanais.append(Vi_atual)
    
    # Retorna a lista de volumes semanais
    return volumes_semanais
