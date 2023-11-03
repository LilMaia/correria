import secrets

def generate_reset_code():
    reset_code = secrets.token_hex(4)  # Gera um código hexadecimal com 4 bytes (8 caracteres)
    return reset_code