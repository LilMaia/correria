def calcular_volumes_semanais(Vi, VF, Limite_Aumento=0.10):
    Vi_atual = Vi  # Inicialmente, o volume atual é igual ao volume inicial
    
    # Lista para armazenar o volume de cada semana
    volumes_semanais = []
    
    # Enquanto o volume atual for menor que o volume final desejado
    while Vi_atual < VF:
        # Calcula o aumento permitido para esta semana
        aumento_permitido = Vi_atual * Limite_Aumento
        
        # Calcula o aumento real com base na diferença entre VF e Vi_atual
        aumento_real = min(VF - Vi_atual, aumento_permitido)
        
        # Adiciona o aumento real ao volume atual
        Vi_atual += aumento_real
        
        # Adiciona o volume atual à lista de volumes semanais
        volumes_semanais.append(Vi_atual)
    
    # Retorna a lista de volumes semanais
    return volumes_semanais