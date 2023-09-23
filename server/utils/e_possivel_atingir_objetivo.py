def pode_atingir_volume_final(Vi, VF, semanas):
    Limite_Aumento = 0.10  # 10%
    Vi_atual = Vi  # Inicialmente, o volume atual é igual ao volume inicial
    
    for _ in range(semanas):
        # Calcula o aumento permitido para esta semana
        aumento_permitido = Vi_atual * Limite_Aumento
        
        # Calcula o aumento necessário para atingir o volume final
        aumento_necessario = VF - Vi_atual
        
        # Se o aumento necessário for maior que o aumento permitido, não é possível atingir o volume final
        if aumento_necessario > aumento_permitido:
            return False
        
        # Atualiza o volume atual
        Vi_atual += aumento_necessario
    
    # Se chegou até aqui, é possível atingir o volume final em 'semanas' semanas
    return True