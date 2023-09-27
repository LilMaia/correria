import React, { useState } from "react";
import * as XLSX from "xlsx";
import { ENV_BASE_URL } from "../../env/enviroment.js";
import { Button, Modal } from "react-bootstrap";
import { converterNumeroParaData } from "../../utils/excel_data_to_js_data.js";

const ExcelUploadComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [inputKey, setInputKey] = useState(Date.now()); // Chave para recriar o input

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json(sheet);

          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const {
              nome,
              email,
              peso,
              altura,
              distancia_teste,
              tempo_teste,
              ja_corre,
              km_corridos,
              disponibilidade_treino,
              data_nascimento,
              objetivo_tempo,
              objetivo_distancia,
              data_objetivo_final,
              volume_semanal_final,
            } = row;

            if (email) {
              // Verifique se o email já existe no banco de dados
              try {
                const emailIsRegistered = await fetch(
                  `${ENV_BASE_URL}/api/verify-if-user-exists/${email}`
                );

                const emailExist = await emailIsRegistered.json();

                if (emailExist) {
                  //não faz nada, pois o usuário já existe
                } else {
                  // Se o email não existe, crie-a o treino no banco de dados
                  let ja_corre_boolean = false
                  ja_corre === "sim" ? (ja_corre_boolean = true) : (ja_corre_boolean= false);

                  //converterStringParaData é uma função que está no arquivo excel_data_to_js_data.js
                  const dataNascimento = converterNumeroParaData(data_nascimento);
                  const dataObjetivoFinal = converterNumeroParaData(data_objetivo_final);

                  const response = await fetch(
                    ENV_BASE_URL + "/api/create-user",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        nome,
                        email,
                        peso,
                        altura,
                        distancia_teste,
                        tempo_teste,
                        ja_corre: ja_corre_boolean,
                        km_corridos,
                        disponibilidade_treino,
                        data_nascimento: dataNascimento,
                        objetivo_tempo,
                        objetivo_distancia,
                        data_objetivo_final: dataObjetivoFinal,
                        volume_semanal_final,
                      }),
                    }
                  );
          
                  if (response.ok) {
                    // O usuário foi criado com sucesso, agora obtenha o ID do usuário
                    const userId = await response.json();
          
                    // Faça uma chamada para criar o treino para este usuário
                    await fetch(`${ENV_BASE_URL}/api/create-treino/${userId}`, {
                      method: "POST",
                    });
                  }
                }
              }catch (error) {
                console.log("Erro ao cadastrar o treino :" + error);
                console.log(true);
              }
            }
          }
        };
        reader.readAsArrayBuffer(file);
        setModalMessage("Tabela carregada no banco com sucesso!");
        setModalVisible(true);
      } catch (error) {
        setModalMessage("Erro ao ler o arquivo Excel:" + error);
        setModalVisible(true);
      } finally {
        setInputKey(Date.now());
      }
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <h1>Fazer upload de excel</h1>
      <input
        key={inputKey} // Definir uma chave diferente para recriar o input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="mt-4"
      />

      <Modal show={modalVisible}>
        <Modal.Header>
          <Modal.Title>Status do Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ExcelUploadComponent;
