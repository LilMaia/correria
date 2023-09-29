import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap"; // Importe o componente Modal
import { ENV_BASE_URL } from "../../env/enviroment";

function TreinoIndividual() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    peso: "",
    altura: "",
    distancia_teste: "",
    tempo_teste: "",
    ja_corre: false,
    km_corridos: "",
    disponibilidade_treino: "",
    data_nascimento: "",
    objetivo_tempo: "",
    objetivo_distancia: "",
    data_objetivo_final: "",
    volume_semanal_final: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para controlar a exibição da modal de sucesso
  const [showErrorModal, setShowErrorModal] = useState(false); // Estado para controlar a exibição da modal de erro

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(ENV_BASE_URL + "/api/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // O usuário foi criado com sucesso, agora obtenha o ID do usuário
        const userId = await response.json();
  
        // Faça uma chamada para criar o treino para este usuário
        const treinoResponse = await fetch(`${ENV_BASE_URL}/api/create-treino/${userId}`, {
          method: "POST",
        });
  
        if (treinoResponse.ok) {
          // Baixar o arquivo PDF
          const blob = await treinoResponse.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `ficha_de_treino_${userId}.pdf`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
  
          // Exibir a modal de sucesso
          setShowSuccessModal(true);
        } else {
          // Exibir a modal de erro para a criação do treino
          setShowErrorModal(true);
        }
      } else {
        // Exibir a modal de erro para a criação do usuário
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Erro ao enviar dados para a API:", error);
      // Exibir a modal de erro geral
      setShowErrorModal(true);
    }
  };  
  
  return (
    <Container style={{ marginBottom: "100px" }}>
      <Row>
        <Col md="6" className="mx-auto text-center">
          <h2>Formulário de Cadastro</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nome" className="mb-2">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="peso" className="mb-2">
              <Form.Label>Peso (em quilos)</Form.Label>
              <Form.Control
                type="number" // Alterado para "number"
                name="peso"
                value={formData.peso}
                onChange={handleChange}
                step="0.01" // Para permitir decimais
                required
              />
            </Form.Group>

            <Form.Group controlId="altura" className="mb-2">
              <Form.Label>Altura (em centímetros)</Form.Label>
              <Form.Control
                type="number" // Alterado para "number"
                name="altura"
                value={formData.altura}
                onChange={handleChange}
                step="1" // Para permitir apenas valores inteiros
                required
              />
            </Form.Group>

            <Form.Group controlId="distancia_teste" className="mb-2">
              <Form.Label>Distância Teste (em quilômetros)</Form.Label>
              <Form.Control
                type="number" // Alterado para "number"
                name="distancia_teste"
                value={formData.distancia_teste}
                onChange={handleChange}
                step="0.01" // Para permitir decimais
                required
              />
            </Form.Group>

            <Form.Group controlId="tempo_teste" className="mb-2">
              <Form.Label>Tempo Teste (em minutos)</Form.Label>
              <Form.Control
                type="number" // Alterado para "number"
                name="tempo_teste"
                value={formData.tempo_teste}
                onChange={handleChange}
                step="1" // Para permitir apenas valores inteiros
                required
              />
            </Form.Group>

            <Form.Group controlId="ja_corre" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Já corre?"
                name="ja_corre"
                checked={formData.ja_corre}
                onChange={handleChange}
                className="form-check-inline"
              />
            </Form.Group>

            {formData.ja_corre ? (
              <Form.Group controlId="km_corridos" className="mb-4">
                <Form.Label>Kilômetros por semana</Form.Label>
                <Form.Control
                  type="number" // Alterado para "number"
                  name="km_corridos"
                  value={formData.km_corridos}
                  onChange={handleChange}
                  step="0.01" // Para permitir decimais
                />
              </Form.Group>
            ) : null}

            <Form.Group controlId="disponibilidade_treino" className="mb-2">
              <Form.Label>disponibilidade de dias para treinar</Form.Label>
              <Form.Control
                type="text"
                name="disponibilidade_treino"
                value={formData.disponibilidade_treino}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="data_nascimento" className="mb-2">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                name="data_nascimento"
                value={formData.data_nascimento}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="objetivo_tempo" className="mb-2">
              <Form.Label>Objetivo (Tempo em minutos)</Form.Label>
              <Form.Control
                type="number"
                name="objetivo_tempo"
                value={formData.objetivo_tempo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="objetivo_distancia" className="mb-2">
              <Form.Label>Objetivo (Distância em metros)</Form.Label>
              <Form.Control
                type="number"
                name="objetivo_distancia"
                value={formData.objetivo_distancia}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="data_objetivo_final" className="mb-2">
              <Form.Label>Data final para atingir o objetivo</Form.Label>
              <Form.Control
                type="date"
                name="data_objetivo_final"
                value={formData.data_objetivo_final}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="volume_semanal_final" className="mb-4">
                <Form.Label>Volume semanal final</Form.Label>
                <Form.Control
                  type="number" // Alterado para "number"
                  name="volume_semanal_final"
                  value={formData.volume_semanal_final}
                  onChange={handleChange}
                  step="0.01" // Para permitir decimais
                />
              </Form.Group>

            <Button variant="primary" type="submit" className="mt-2">
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
      
      {/* Modal de sucesso */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>Sucesso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-success" role="alert">
            Os dados foram enviados com sucesso.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSuccessModal(false)}
          >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de erro */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Erro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-danger" role="alert">
            Ocorreu um erro ao enviar os dados.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TreinoIndividual;
