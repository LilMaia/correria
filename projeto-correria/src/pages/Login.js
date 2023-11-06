import InputForm from "../components/initial-page/InputForm.js";
import InputPassword from "../components/initial-page/InputPassword.js";
import ImageForm from "../components/initial-page/ImageForm.js";
import ButtonForm from "../components/initial-page/ButtonForm.js";
import Texto from "../components/initial-page/Texto.js";
import React, { useState } from "react";
import ButtonGoogle from "../components/initial-page/ButtonGoogle.js";
import { Link } from "react-router-dom";
import "../styles/initial-page//login.css";
import { ENV_BASE_URL } from "../env/enviroment";
function Login() {
  const [formInfo, setFormInfo] = useState("");
  const [password, setPassword] = useState("");
  const handleOnChange = (e) => {
    e.preventDefault();
    setFormInfo(e.target.value);
  };
  //faça um useSate 
  


  
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const handleLogin = async (event) => {
    event.preventDefault();

    const loginData = {
      email: formInfo,
      senha: password,
    };
    console.log(loginData);
    try {
      const response = await fetch(ENV_BASE_URL + "/assessoria/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
     
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleLogin} className="form_body m-auto">
      <div className="d-flex flex-column ">
        <ImageForm />
        <Texto texto="Acesse sua conta" />
        <ButtonGoogle text="Login com o Google" />
      </div>
      <p className="text-start fw-bold p-0 mt-4 ms-2 me-2">ou</p>

      <InputForm
        type="email"
        text="E-mail"
        name="email"
        placeholder="email@email.com"
        handleOnChange={handleOnChange}
      />
      <InputPassword text="Senha" handlePasswordChange={handlePasswordChange}  />
      <p className="mb-4 ms-2 d-flex justify-content-end p-2">
        <Link
          to="/forgotpassword"
          className="me-2 link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
        >
          Esqueci minha senha
        </Link>
      </p>
      <ButtonForm text="Login" />
      <p className="mt-3 ms-2 d-flex justify-content-center fs-6 p-2">
        <Link
          to="/register"
          className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
        >
          Quero me cadastrar gratuitamente
        </Link>
      </p>
    </form>
  );
}

export default Login;
