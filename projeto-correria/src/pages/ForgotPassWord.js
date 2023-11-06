import InputForm from "../components/initial-page/InputForm.js";
import React, { useState } from "react";
import ImageForm from "../components/initial-page/ImageForm.js";
import ButtonForm from "../components/initial-page/ButtonForm.js";
import Texto from "../components/initial-page/Texto.js";
import SubTexto from "../components/initial-page/SubTexto.js";
import "../styles/initial-page//login.css";
function ForgotPassWord() {
  const [userEmail, setUserEmail] = useState("");
  const handleOnChange = (e) => {
    e.preventDefault();
    setUserEmail(e.target.value);
    
  };
const handleNewPassword=(e)=>{
  e.preventDefault();
  const userData = {
    email: userEmail,
  };
  const userDataString = JSON.stringify(userData);
  localStorage.setItem('user', userDataString);
}
  return (
    <form onSubmit={handleNewPassword}className="form_body m-auto">
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
      <ButtonForm text="Prosseguir" />
    </form>
  );
}

export default ForgotPassWord;
