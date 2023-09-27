def parse_dias_disponiveis(dias_disponiveis):
    dias_disponiveis = dias_disponiveis.lower().split(',')
    dias_disponiveis = [dia.strip().capitalize() for dia in dias_disponiveis]

    # Verifica quantos dias estão na lista
    num_dias = len(dias_disponiveis)

    return num_dias, dias_disponiveis
