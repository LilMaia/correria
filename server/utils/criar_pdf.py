from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch

def create_pdf(file_name, text):
    doc = SimpleDocTemplate(file_name, pagesize=letter)
    styles = getSampleStyleSheet()
    story = []

    # Adicione cada linha de texto ao conteúdo do PDF
    for line in text:
        paragraph = Paragraph(line, styles["Normal"])
        story.append(paragraph)
        story.append(Spacer(1, 0.2 * inch))  # Espaçamento entre as linhas

    doc.build(story)