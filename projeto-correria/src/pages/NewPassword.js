import InputPassword from "../components/initial-page/InputPassword.js";
import ImageForm from "../components/initial-page/ImageForm.js";
import ButtonForm from "../components/initial-page/ButtonForm.js";
import Texto from "../components/initial-page/Texto.js";
import SubTexto from "../components/initial-page/SubTexto.js";
import React, { useState } from "react";
import "../styles/initial-page//login.css";
import { ENV_BASE_URL } from "../env/enviroment";
import { IoAlertCircleOutline } from "react-icons/io5";
function NewPassword() {
  const [userPassword, setuserPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setuserPassword(e.target.value);
  };
  const handlePassword = (e) => {
    e.preventDefault();
    setNewPassword(e.target.value);
  };
  const handleNewPassword = (e) => {
    e.preventDefault();
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    const newUserPassword = {
      email: userData.email,
      senha: userPassword,
    };
    try {
      const response = fetch(ENV_BASE_URL + "/assessoria/erificar-email", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserPassword),
      });
      if (response.ok) {
      
      } 
    } catch (error) {
      console.log(error);
    }
  };
  function verifyPassword() {
    const pass = userPassword;
    const newPass = newPassword;
    if (pass === newPass) {
      handleNewPassword();
    } else {
      setShowError(true);
    }
  }
  return (
    <form onSubmit={verifyPassword} className="form_body m-auto">
      <div className="d-flex flex-column ">
        <ImageForm />
        <Texto texto="Estamos quase lá :)" />
      </div>
      <SubTexto texto="Vamos criar uma nova senha" />
      <InputPassword handlePasswordChange={handlePassword} text="Nova Senha" />
      <InputPassword
        handlePasswordChange={handlePasswordChange}
        text="Repita a Senha"
      />

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
