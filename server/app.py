from config.config import PORT
from routes.treino_routes import *
from routes.assessoria_routes import *
from routes.atleta_routes import *
from routes.treinador_routes import *

if __name__ == '__main__':
    app.run(debug=True, port=PORT)
