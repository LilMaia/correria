from models.User import User
from utils.classificar_usuario import classificar_corredor
from utils.e_possivel_atingir_objetivo import pode_atingir_volume_final
from utils.contar_semanas import calcular_semanas_faltantes
from utils.calculo_volume_para_objetivo import calcular_volumes_semanais
from utils.gerar_treino import montar_treino
from utils.criar_pdf import create_pdf

def gerar_ficha(user: User):
    
    # classificação do perfil do corredor
    condicionamento = classificar_corredor(user.distancia_teste, user.ja_corre)
    # numero de semanas para atingir o objetivo
    semanas = calcular_semanas_faltantes(user.data_objetivo_final)
    # verificar se é possível atingir o objetivo
    
    status = ""
    if(pode_atingir_volume_final(user.km_corridos, user.objetivo_distancia, semanas)) :
        status = "Você pode atingir seu objetivo"
    else:
        status = "Não é recomendado que você tente atingir seu objetivo no tempo estipulado"
    
    # volume de treino a cada semana, depois sugerir um limite personalizado pra cada categoria
    volume_treinos = calcular_volumes_semanais(user.km_corridos, user.objetivo_distancia)
    
    quantidade_de_semanas_recomendadas_para_atingir_o_objetivo = len(volume_treinos)
        
    treino_formatado = montar_treino(user.disponibilidade_treino, volume_treinos, condicionamento)

    texto = []
    texto.append(f"Nível do usuário: {condicionamento}\n")
    texto.append(f"Semanas até o objetivo estipulado: {semanas}\n")
    texto.append(f"Quantidade de semanas recomendadas para atingir o objetivo: {quantidade_de_semanas_recomendadas_para_atingir_o_objetivo}\n")
    texto.append(f"Recomendação em relação ao objetivo: {status}\n")
    texto.append("Treino para cada semana:")

    # Adicione cada semana do treino formatado como uma linha separada
    for treino in treino_formatado:
        texto.append(f"{treino}")

    nome_arquivo = f"{user.nome} ficha de treino.pdf"
      
    create_pdf(nome_arquivo, texto)
    
    return