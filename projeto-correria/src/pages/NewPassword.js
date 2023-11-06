import InputPassword from "../components/initial-page/InputPassword.js";
import ImageForm from "../components/initial-page/ImageForm.js";
import ButtonForm from "../components/initial-page/ButtonForm.js";
import Texto from "../components/initial-page/Texto.js";
import SubTexto from "../components/initial-page/SubTexto.js";
import React, { useState } from "react";
import "../styles/initial-page//login.css";
function NewPassword() {
  const [userPassword, setuserPassword] = useState("");
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setuserPassword(e.target.value);
  
    
  };
  const handleNewPassword=(e)=>{
    e.preventDefault();
    const userDataString = localStorage.getItem('user');
    const userData = JSON.parse(userDataString);
    const newUsePassword = {
      email: userData.email,
      senha: userPassword,
    };
    console.log(newUsePassword)
  }
  return (
    <form onSubmit={handleNewPassword} className="form_body m-auto">
      <div className="d-flex flex-column ">
        <ImageForm />
        <Texto texto="Estamos quase lá :)" />
      </div>
      <SubTexto texto="Vamos criar uma nova senha" />
      <InputPassword  text="Nova Senha"/>
      <InputPassword handlePasswordChange={handlePasswordChange}  text="Repita a Senha"/>
 

      <ButtonForm text="Alterar Senha" />
    </form>
  );
}

export default NewPassword;
