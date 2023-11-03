import smtplib
from email.message import EmailMessage

# Configurações do servidor SMTP
SMTP_SERVER = 'smtp.example.com'
SMTP_PORT = 587
SMTP_USERNAME = 'your_username'
SMTP_PASSWORD = 'your_password'

def send_reset_email(email, reset_code):
    msg = EmailMessage()
    msg.set_content(f'Olá! Seu código de redefinição de senha é: {reset_code}')

    msg['Subject'] = 'Redefinição de Senha'
    msg['From'] = 'your_email@example.com'
    msg['To'] = email

    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()  # Habilita a criptografia TLS
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()
        return True  # Email enviado com sucesso
    except Exception as e:
        print(f'Erro ao enviar email: {e}')
        return False  # Falha ao enviar o email