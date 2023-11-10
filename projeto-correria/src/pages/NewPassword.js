import InputPassword from "../components/initial-page/InputPassword.js";
import ImageForm from "../components/initial-page/ImageForm.js";
import ButtonForm from "../components/initial-page/ButtonForm.js";
import Texto from "../components/initial-page/Texto.js";
import SubTexto from "../components/initial-page/SubTexto.js";
import React, { useState } from "react";
import "../styles/initial-page//login.css";
import { ENV_BASE_URL } from "../env/enviroment";
import { IoAlertCircleOutline } from "react-icons/io5";
import ModalConfirmation from "../components/initial-page/ModalConfirmation.js";
import { BsCheck2 } from "react-icons/bs";
function NewPassword() {
  const [userPassword, setuserPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [show, setShow] = useState(false);
  const [maiuscula, setMaiuscula] = useState(false);
  const [especial, setEspecial] = useState(false);
  const [comprimento, setComprimento] = useState("");
  const [numero, setNumero] = useState(false);
  const [disable, setDisable] = useState(true)
  const ableTheButton = () => {
    const check = maiuscula && especial && numero && userPassword && newPassword;
    setDisable(!check);
  };
  const verifySenha = () => {
    const contemMaiusculas = /[A-Z]/.test(newPassword);
    setMaiuscula(contemMaiusculas);
    const contemEspeciais = /[!@#$%^&*]/.test(newPassword);
    setEspecial(contemEspeciais);
    const contemNumeros = /[0-9]/.test(newPassword);
    setNumero(contemNumeros);
    const tamanho = newPassword.length;
    setComprimento(tamanho);
    ableTheButton();
  };
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setuserPassword(e.target.value);
    ableTheButton();
  };
  const handlePassword = (e) => {
    e.preventDefault();
    setNewPassword(e.target.value);
    verifySenha();
    ableTheButton();
  };
  const verifySmaePass = async (e) => {
    e.preventDefault();
    const chekPass = {
      senha: newPassword,
      confirmar_senha: userPassword
    }
    try {
      const response = await fetch(
        ENV_BASE_URL + "assessoria/validar-senhas-iguais",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(chekPass),
        }
      );
      if (response.ok) {
        handleNewPassword();
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.log(error);
      setShowError(true);
    }
  }
  const handleNewPassword = async (e) => {
    e.preventDefault();
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    const userCodeString = localStorage.getItem("code");
    const userCode = JSON.parse(userCodeString);
    const newUserPassword = {
      email: userData.email,
      token: userCode.token,
      nova_senha: newPassword,
    };
    try {
      const response = await fetch(
        ENV_BASE_URL + "/assessoria/redefinir-senha",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUserPassword),
        }
      );
      if (response.ok) {
        setShow(true);
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.log(error);
      setShowError(true);
    }
  };

  return (
    <form onSubmit={handleNewPassword} className="form_body m-auto">
      <div className="d-flex flex-column ">
        <ImageForm />
        <Texto texto="Estamos quase lá :)" />
      </div>
      <SubTexto texto="Vamos criar uma nova senha" />

      <InputPassword handlePasswordChange={verifySmaePass} text="Nova Senha" />
      {/* <small className="d-flex flex-column mb-2 p-2">
        
        <div className="d-flex align-items-center gap-1  ">
        {maiuscula ?  <BsCheck2 className="fw-bold" /> :<IoAlertCircleOutline className="text-danger fw-bold" /> }
         
          <span className="text-dark ">Possui letras maiúscula</span>
        </div>
        <div className="d-flex align-items-center gap-1  ">
        {numero ?  <BsCheck2 className="fw-bold" /> :<IoAlertCircleOutline className="text-danger fw-bold" /> }
         
          <span className="text-dark ">Possui números</span>
        </div>
        <div className="d-flex align-items-center gap-1  ">
        {especial ?  <BsCheck2 className="fw-bold" /> :<IoAlertCircleOutline className="text-danger fw-bold" /> }
         
          <span className="text-dark ">Possui caractere especial</span>
        </div>
        <div className="d-flex align-items-center gap-1  ">
        {comprimento.length>=8 ?  <BsCheck2 className="fw-bold" /> :<IoAlertCircleOutline className="text-danger fw-bold" /> }
         
          <span className="text-dark ">Possui mais de 8 caracteres</span>
        </div>
      </small> */}
      <InputPassword
        handlePasswordChange={handlePasswordChange}
        text="Repita a Senha"
      />
      <ModalConfirmation show={show} />
      {showError && (
        <small className="d-flex align-items-center justify-content-between p-2 mb-4">
          <div className="d-flex align-items-center gap-1  ">
            <IoAlertCircleOutline className="text-danger fw-bold" />
            <span className="text-danger ">As senhas não são iguais.</span>
          </div>
        </small>
      )}
      <ButtonForm text="Alterar Senha" />
    </form>
  );
}

export default NewPassword;
