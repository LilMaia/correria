from utils.definir_aquecimento_e_arrefecimento import calcular_aquecimento_arrefecimento
from utils.numero_dias_possivel_treino import parse_dias_disponiveis
from utils.definir_km_corrida_leve import calcular_corrida_leve


def montar_treino(dias_semana_disponiveis, volumes_semanais, categoria_atleta):
    # Calcula o aquecimento e arrefecimento com base na categoria do atleta
    aquecimento, arrefecimento = calcular_aquecimento_arrefecimento(categoria_atleta)
    num_dias, dias_de_treino = parse_dias_disponiveis(dias_semana_disponiveis)

    treino_formatado = []

    for i in range(len(volumes_semanais)):
        treino_formatado.append(f"Semana {i+1} do treino\n")
        treino_formatado.append(f"Volume da semana {i+1} : {volumes_semanais[i]:.1f}\n\n")
        # Verificar se o número de dias é 2
        if num_dias == 2:
            if "sabado" in dias_de_treino or "domingo" in dias_de_treino:
                # Calcula o treino de vo2max e longo
                vo2max = (0.25 * volumes_semanais[i]) - (aquecimento + arrefecimento)
                longo = 0.75 * volumes_semanais[i]

                treino_formatado.append(
                    f"{dias_de_treino[0]} fazer o treino de VO2Max realizando um aquecimento de {aquecimento} km um vo2max de {vo2max:.1f} km e para finalizar um arrefecimento de {arrefecimento} km\n"
                )

                treino_formatado.append(
                    f"{dias_de_treino[1]} fazer um treino longo de {longo:.1f} km\n"
                )
            else:
                # Calcula o treino de limiar e vo2max
                limiar = (0.5 * volumes_semanais[i]) - (aquecimento + arrefecimento)
                vo2max = (0.5 * volumes_semanais[i]) - (aquecimento + arrefecimento)

                treino_formatado.append(
                    f"{dias_de_treino[0]} fazer o treino de limiar anaeróbio realizando um aquecimento de {aquecimento} km um limiar anaeróbico de {limiar:.1f} km e para finalizar um arrefecimento de {arrefecimento} km\n"
                )

                treino_formatado.append(
                    f"{dias_de_treino[1]} fazer o treino de VO2Max realizando um aquecimento de {aquecimento} km um vo2max de {vo2max:.1f} km e para finalizar um arrefecimento de {arrefecimento} km\n"
                )

        # Se o número de dias for 3
        elif num_dias == 3:
            vo2max = (0.25 * volumes_semanais[i]) - (aquecimento + arrefecimento)
            limiar = (0.30 * volumes_semanais[i]) - (aquecimento + arrefecimento)
            longo = 0.45 * volumes_semanais[i]

            treino_formatado.append(
                f"{dias_de_treino[0]} fazer o treino de VO2Max realizando um aquecimento de {aquecimento} km um vo2max de {vo2max:.1f} km e para finalizar um arrefecimento de {arrefecimento} km\n"
            )

            treino_formatado.append(
                f"{dias_de_treino[1]} fazer o treino de limiar anaeróbio realizando um aquecimento de {aquecimento} km um limiar anaeróbico de {limiar:.1f} km e para finalizar um arrefecimento de {arrefecimento} km\n"
            )

            treino_formatado.append(
                f"{dias_de_treino[2]} fazer um treino longo de {longo:.1f} km\n"
            )

        # Se o número de dias for 4 ou mais
        else:
            vo2max = (0.25 * volumes_semanais[i]) - (aquecimento + arrefecimento)
            limiar = (0.30 * volumes_semanais[i]) - (aquecimento + arrefecimento)
            longo = 0.45 * volumes_semanais[i]
            corrida_leve = calcular_corrida_leve(volumes_semanais[i])

            # Primeiro dia
            dia = 0
            treino_formatado.append(
                f"{dias_de_treino[dia]} fazer o treino de VO2Max realizando um aquecimento de {aquecimento} km um vo2max de {vo2max:.1f} km e para finalizar um arrefecimento de {arrefecimento} km\n"
            )

            # Segundo dia
            dia += 1
            treino_formatado.append(
                f"{dias_de_treino[dia]} realizar corrida leve de {corrida_leve} km\n"
            )

            # Terceiro dia
            dia += 1
            treino_formatado.append(
                f"{dias_de_treino[dia]} fazer o treino de limiar anaeróbio realizando um aquecimento de {aquecimento} km um limiar anaeróbico de {limiar:.1f} km e para finalizar um arrefecimento de {arrefecimento} km\n"
            )

            # Adicione o treino de corrida leve entre Limiar Anaeróbico e Longo, se possível
            if num_dias >= 5:
                dia += 1
                treino_formatado.append(
                    f"{dias_de_treino[dia]} realizar corrida leve de {corrida_leve} km\n"
                )

            # Quarto dia
            dia += 1
            treino_formatado.append(
                f"{dias_de_treino[2]} fazer um treino longo de {longo:.1f} km\n"
            )

            # Adicione o treino de corrida leve entre VO2 Max e Limiar Anaeróbico, se possível
            if num_dias >= 6:
                dia += 1
                treino_formatado.append(
                    f"{dias_de_treino[dia]} realizar corrida leve de {corrida_leve} km\n"
                )

            # Adicione o treino de corrida leve entre VO2 Max e Limiar Anaeróbico, se possível
            if num_dias >= 7:
                dia += 1
                treino_formatado.append(
                    f"{dias_de_treino[dia]} realizar corrida leve de {corrida_leve} km\n"
                )
        treino_formatado.append(f"----------------------------------------------------------------------------------------------------------------------------------")

    return treino_formatado
