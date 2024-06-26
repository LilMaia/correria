import InputForm from "../components/initial-page/InputForm.js";
import InputPassword from "../components/initial-page/InputPassword.js";
import ImageForm from "../components/initial-page/ImageForm.js";
import ButtonForm from "../components/initial-page/ButtonForm.js";
import Texto from "../components/initial-page/Texto.js";
import CheckboxForm from "../components/initial-page/CheckboxForm.js";
import ButtonGoogle from "../components/initial-page/ButtonGoogle.js";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import "../styles/initial-page/configaccount.css";
import { IoAlertCircleOutline } from "react-icons/io5";


function Register() {
  const [name, setName] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
 
 
  const validateform = (e) => {
    e.preventDefault();
    const check = name && email && password;
    if(check){
      submitForm()
    }
else{
  setShowError(true)
}
  };
  const handleOnName = (e) => {
    e.preventDefault();
    setName(e.target.value);
    setShowError(false)
 
  };
  const handleOnTelefone = (e) => {
    e.preventDefault();
    setTelefone(e.target.value);

  };
  const handleOnEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    setShowError(false)
   
  };
  const handleOnPassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    setShowError(false)
   
  };

  const submitForm = () => {
   
    const userData = {
      name: name,
      telefone: telefone,
      senha: password,
      email: email,
    };
    const userDataString = JSON.stringify(userData);
    localStorage.setItem("register", userDataString);
   window.location.href="/configaccount"
  };

  return (
    <form onSubmit={validateform} className="form_body m-auto ">
      <div className="d-flex flex-column ">
        <ImageForm />
        <Texto texto="Crie sua conta" />
        <ButtonGoogle text="Seguir com o Google" />
      </div>

      <p className="text-start fw-bold p-0 mt-4 ms-2 me-2 d-flex justify-content-around">
        {" "}
        <span className="span_border"></span>ou<span></span>
      </p>

      <InputForm
        type="text"
        text="Nome completo"
        name="name"
        placeholder="Seu nome"
        handleOnChange={handleOnName}
      />
      <div className="d-md-flex justify-content-md-between gap-1">
        <InputForm
          type="email"
          text="E-mail"
          name="Email"
          placeholder="Digite seu e-mail"
          handleOnChange={handleOnEmail}
        />
        <InputForm
          type="tel"
          text="Telefone (opcional)"
          name="telephone"
          placeholder="(31)999999999"
          handleOnChange={handleOnTelefone}
        />
      </div>
      <InputPassword text="Senha" handlePasswordChange={handleOnPassword} />
      <div className="d-flex gap-1  p-2">
        <CheckboxForm />
        <small>
          Li e aceitos os{" "}
          <a
            className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
            href="/"
          >
            Termos de Uso
          </a>{" "}
          e{" "}
          <a
            className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
            href="/"
          >
            Política de Privacidade{" "}
          </a>
        </small>
      </div>
      {showError && (
        <small className="d-flex align-items-center justify-content-between p-2 mb-4">
          <div className="d-flex align-items-center gap-1  ">
            <IoAlertCircleOutline className="text-danger fw-bold" />
            <span className="text-danger ">Preencha os campos de nome, e-mail e senha antes de prosseguir.</span>
          </div>
        </small>
      )}
      <ButtonForm text="Criar conta" />
      <p className="mt-1 ms-2 d-flex justify-content-center fs-6 p-2">
        <Link
          to="/login"
          className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
        >
          <small>Já tenho conta</small>
        </Link>
      </p>
  
 
    </form>
  );
}

export default Register;
