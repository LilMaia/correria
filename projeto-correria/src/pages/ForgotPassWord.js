import InputForm from "../components/initial-page/InputForm.js";
import React, { useState } from "react";
import ImageForm from "../components/initial-page/ImageForm.js";
import ButtonForm from "../components/initial-page/ButtonForm.js";
import Texto from "../components/initial-page/Texto.js";
import SubTexto from "../components/initial-page/SubTexto.js";
import ModalForm from "../components/initial-page/ModalForm.js";
import "../styles/initial-page//login.css";
import { ENV_BASE_URL } from "../env/enviroment";
import { IoAlertCircleOutline } from "react-icons/io5";
function ForgotPassWord() {
  const [userEmail, setUserEmail] = useState("");
  const [showError, setShowError] = useState(false);

  const handleOnChange = (e) => {
    e.preventDefault();
    setUserEmail(e.target.value);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const genereteCode = async () => {
    try {
      const response = await fetch(
        ENV_BASE_URL + "/assessoria/gerar-token-redefinir-senha",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userEmail),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleNewPassword = async (e) => {
    e.preventDefault();
    const userData = {
      email: userEmail,
    };
    const userDataString = JSON.stringify(userData);
    localStorage.setItem("user", userDataString);
  
    try {
      const response = await fetch(
        ENV_BASE_URL + "/assessoria/verificar-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: userDataString, // Send the serialized user data, not just userEmail
        }
      );
      if (response.ok) {
        setShow(true);
        genereteCode();
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error(error);
      setShowError(true);
    }
  };

  return (
    <form onSubmit={handleNewPassword} className="form_body m-auto">
      <div className="d-flex flex-column ">
        <ImageForm />
        <Texto texto="Esqueci minha senha" />
      </div>

      <SubTexto texto="Qual é o e-mail cadastrado?" />
      <div className="mb-4">
        <InputForm
          type="email"
          text="E-mail"
          name="email"
          placeholder="email@email.com"
          handleOnChange={handleOnChange}
        />
      </div>

      {showError && (
        <small className="d-flex align-items-center justify-content-between p-2 mb-4">
          <div className="d-flex align-items-center gap-1  ">
            <IoAlertCircleOutline className="text-danger fw-bold" />
            <span className="text-danger ">
              Email inválido ou não cadastrado.
            </span>
          </div>
        </small>
      )}

      <ButtonForm text="Prosseguir" />
      <ModalForm handleClose={handleClose} show={show} text="Prosseguir" />
    </form>
  );
}

export default ForgotPassWord;
