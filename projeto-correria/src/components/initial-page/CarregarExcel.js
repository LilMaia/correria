import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {handleFileUpload} from "../../logics/carregar-excel/ExcelUploadLogic";

const ExcelUploadComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [inputKey, setInputKey] = useState(Date.now());

  const onFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      handleFileUpload(file, setModalVisible, setModalMessage, setInputKey);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <h1>Fazer upload de excel</h1>
      <input
        key={inputKey}
        type="file"
        accept=".xlsx, .xls"
        onChange={onFileChange}
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
