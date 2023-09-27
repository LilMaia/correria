from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from io import BytesIO
from models.User import User
from utils.classificar_usuario import classificar_corredor
from utils.e_possivel_atingir_objetivo import pode_atingir_volume_final
from utils.contar_semanas import calcular_semanas_faltantes
from utils.calculo_volume_para_objetivo import calcular_volumes_semanais
from utils.gerar_treino import montar_treino

def gerar_ficha(user: User, file: BytesIO):
    doc = SimpleDocTemplate(file, pagesize=letter)
    styles = getSampleStyleSheet()
    story = []

    condicionamento = classificar_corredor(user.distancia_teste, user.ja_corre)
    semanas = calcular_semanas_faltantes(user.data_objetivo_final)
    status = ""

    if pode_atingir_volume_final(user.km_corridos, user.objetivo_distancia, semanas):
        status = "Você pode atingir seu objetivo"
    else:
        status = "Não é recomendado que você tente atingir seu objetivo no tempo estipulado"

    volume_treinos = calcular_volumes_semanais(user.km_corridos, user.volume_semanal_final, semanas)
    quantidade_de_semanas_recomendadas_para_atingir_o_objetivo = len(volume_treinos)
    treino_formatado = montar_treino(user.disponibilidade_treino, volume_treinos, condicionamento)

    story.append(Paragraph(f"Nível do usuário: {condicionamento}", styles["Normal"]))
    story.append(Paragraph(f"Semanas até o objetivo estipulado: {semanas}", styles["Normal"]))
    story.append(Paragraph(f"Quantidade de semanas recomendadas para atingir o objetivo: {quantidade_de_semanas_recomendadas_para_atingir_o_objetivo}", styles["Normal"]))
    story.append(Paragraph(f"Recomendação em relação ao objetivo: {status}", styles["Normal"]))
    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph("Treino para cada semana:", styles["Normal"]))
    story.append(Paragraph("----------------------------------------------------------------------------------------------------------------------------------", styles["Normal"]))
    story.append(Spacer(1, 0.2 * inch))
     
    for treino in treino_formatado:
        story.append(Paragraph(f"{treino}", styles["Normal"]))

    doc.build(story)

    # Não é necessário salvar o PDF em um arquivo, pois agora você está retornando o PDF como um objeto BytesIO
    return file.getvalue()
