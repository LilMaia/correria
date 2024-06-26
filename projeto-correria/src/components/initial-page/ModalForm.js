import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import "./modalform.css";
import InputForm from "./InputForm";
import { RiMailSendLine } from "react-icons/ri";
import { ENV_BASE_URL } from "../../env/enviroment";
import { IoAlertCircleOutline } from "react-icons/io5";
function ModalForm({ handleClose, show, text, handleOnChange }) {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [fourth, setFourth] = useState("");
  const [fifth, setFifth] = useState("");
  const [sixth, setSixth] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const handleFirst = (e) => {
    e.preventDefault();
    const newValue = e.target.value.trim();
    setFirst(newValue);
  };
  const handleSecond = (e) => {
    e.preventDefault();
    const newValue = e.target.value.trim();
    setSecond(newValue);
  };
  const handleThird = (e) => {
    e.preventDefault();
    const newValue = e.target.value.trim();
    setThird(newValue);
  };
  const handleFourth = (e) => {
    e.preventDefault();
    const newValue = e.target.value.trim();
    setFourth(newValue);
  };
  const handleFifth = (e) => {
    e.preventDefault();
    const newValue = e.target.value.trim();
    setFifth(newValue);
  };
  const handleSixth = (e) => {
    e.preventDefault();
    const newValue = e.target.value.trim();
    setSixth(newValue);
  };
  const genereteCodeAgain = async (e) => {
    e.preventDefault();
    setShowAlert(false);
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    const newCode = {
      email: userData.email,
    };
    try {
      const response = await fetch(
        ENV_BASE_URL + "/assessoria/gerar-token-redefinir-senha",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCode),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    const codigo = first + second + third + fourth + fifth + sixth;
    console.log(codigo);
    const userCodde = {
      email: userData.email,
      token: codigo,
    };
    const userCodeString = JSON.stringify(userCodde);
    localStorage.setItem("code", userCodeString);

    try {
      const response = await fetch(
        ENV_BASE_URL + "/assessoria/verificar-token-redefinir-senha",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userCodde),
        }
      );

      if (response.ok) {
        window.location.href = "/newpassword";
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.log(error);
    }
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
                  <RiMailSendLine className="icon_size" />
                </div>
              </Col>
            </Row>
          </Container>
          <p className="fw-bold fs-3 text-center mt-2">Código Enviado!</p>
          <p className="mt-3 p-2">
            Enviamos um código verficador para seu e-mail (confira a caixa de
            spam). Por favor, digite ocódigo abaixo:
          </p>
          <div className="d-flex ">
            <InputForm
              className="input_size"
              handleOnChange={handleFirst}
              name="first"
              type="text"
              value={first}
            />
            <InputForm
              className="input_size"
              handleOnChange={handleSecond}
              name="second"
              type="text"
            />
            <InputForm
              className="input_size"
              handleOnChange={handleThird}
              name="third"
              type="text"
            />
            <InputForm
              className="input_size"
              handleOnChange={handleFourth}
              name="fourth"
              type="text"
            />
            <InputForm
              className="input_size"
              handleOnChange={handleFifth}
              name="fifth"
              type="text"
            />
            <InputForm
              className="input_size"
              handleOnChange={handleSixth}
              name="sixth"
              type="text"
            />
          </div>
          <div className="d-flex align-items-center justify-content-between">
            {showAlert && (
              <small className=" mt-3">
                <div className="d-flex align-items-center gap-1  ">
                  <IoAlertCircleOutline className="text-danger fw-bold" />
                  <span className="text-danger ">Código inválido.</span>
                </div>
              </small>
            )}

            <small className=" mt-3">
              <a
                onClick={genereteCodeAgain}
                href="/"
                className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
              >
                Reenviar código
              </a>
            </small>
          </div>
        </Modal.Body>
        <Modal.Footer className="border border-0">
          <Button
            className="m-auto text-white rounded-1"
            variant="dark"
            onClick={handleSubmit}
            type="submit"
          >
            {text}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalForm;
