import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

function SelectForm() {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  // Buscar a lista de estados da API do IBGE
  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => response.json())
      .then(data => {
        const sortedStates = data.sort((a, b) => a.nome.localeCompare(b.nome));
        setStates(sortedStates);
      })
      .catch(error => {
        console.error('Erro ao buscar os estados:', error);
      });
  }, []);

  // Buscar a lista de cidades de um estado selecionado
  useEffect(() => {
    if (selectedState) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`)
        .then(response => response.json())
        .then(data => {
          const sortedCities = data.sort((a, b) => a.nome.localeCompare(b.nome));
          setCities(sortedCities);
        })
        .catch(error => {
          console.error('Erro ao buscar as cidades:', error);
        });
    }
  }, [selectedState]);

  return (
    <div>
      <Row>
        <Col lg={6} md={12}>
          <Form.Group className=" text-start p-2 " >
            <Form.Label className="fw-bold">Estado</Form.Label>
            <Form.Control as="select" onChange={(e) => setSelectedState(e.target.value)}>
              <option value="">Selecione um estado</option>
              {states.map(state => (
                <option key={state.id} value={state.sigla}>
                  {state.nome}
                </option>
              ))}
            </Form.Control>
          </Form.Group >
        </Col>
        <Col >
          <Form.Group className=" text-start p-2 " >
            <Form.Label className="fw-bold">Cidade</Form.Label>
            <Form.Control as="select" onChange={(e) => setSelectedCity(e.target.value)}>
              <option value="">Selecione uma cidade</option>
              {cities.map(city => (
                <option key={city.id} value={city.nome}>
                  {city.nome}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default SelectForm;
