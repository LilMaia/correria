import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./modalerror.css";

import { BsPersonFillSlash } from "react-icons/bs";

function ModalError({ handleClose, show }) {
  const changePage = () => {
    window.location.href = "/register";
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="border border-0" closeButton></Modal.Header>
        <Modal.Body className="w-100">
          <Container>
            <Row className="d-flex justify-content-center align-items-center ">
              <Col xs={6} md={4}>
                <div className="image_modal  ">
                  <BsPersonFillSlash className="icon_size fw-bold" />
                </div>
              </Col>
            </Row>
          </Container>
          <p className="fw-bold fs-3 text-center mt-2">     Ops, sua conta ainda não foi criada</p>
          <p className="mt-3 p-2">
            Ocorreu um erro inesperado. Você pode tentar novamente e caso o erro persista, entre em contato conosco.
          </p>
        </Modal.Body>
        <Modal.Footer className="border border-0">
          <Button
            className="m-auto text-white rounded-1"
            variant="dark"
            onClick={changePage}
          >
            Tentar Novamente
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalError;