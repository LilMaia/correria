import React from "react";
import { Toast } from "react-bootstrap";

const ToastMessage = ({ show, onClose, message }) => {
  return (
    <div
      className="toast-container"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      {show && (
        <Toast onClose={onClose} show={show} delay={3000} autohide>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Erro</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      )}
    </div>
  );
};

export default ToastMessage;
