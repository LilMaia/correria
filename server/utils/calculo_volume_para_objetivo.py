def calcular_volumes_semanais(Vi, VF, Limite_Aumento=0.10, Limite_Max=60):
    Vi_atual = Vi  # Inicialmente, o volume atual é igual ao volume inicial
    
    # Lista para armazenar o volume de cada semana
    volumes_semanais = []
    
    # Enquanto o volume atual for menor que o volume final desejado e abaixo do limite máximo
    while Vi_atual < VF and Vi_atual < Limite_Max:
        # Calcula o aumento permitido para esta semana
        aumento_permitido = Vi_atual * Limite_Aumento
        
        # Calcula o aumento real com base na diferença entre VF e Vi_atual
        aumento_real = min(VF - Vi_atual, aumento_permitido)
        
        # Verifica se o aumento ultrapassa o limite máximo
        if Vi_atual + aumento_real > Limite_Max:
            aumento_real = Limite_Max - Vi_atual
        
        # Adiciona o aumento real ao volume atual
        Vi_atual += aumento_real
        
        # Adiciona o volume atual à lista de volumes semanais
        volumes_semanais.append(Vi_atual)
    
    # Retorna a lista de volumes semanais
    return volumes_semanais