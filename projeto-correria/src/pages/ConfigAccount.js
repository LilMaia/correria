import InputForm from "../components/initial-page/InputForm.js";
import ImageForm from "../components/initial-page/ImageForm.js";
import ButtonForm from "../components/initial-page/ButtonForm.js";
import Texto from "../components/initial-page/Texto.js";
import SelectForm from "../components/initial-page/SelectForm.js";
import "../styles/initial-page//configaccount.css";
import { useState } from "react";
import { ENV_BASE_URL } from "../env/enviroment";
import { IoAlertCircleOutline } from "react-icons/io5";
import ModalError from "../components/initial-page/ModalError.js";
function ConfigAccount() {
  const [state, setState] = useState("");
  const [acessoria, setAcessoria] = useState("");
  const [city, setCity] = useState("");
  const [website, setwebsite] = useState("");
  const [atletas, setAtletas] = useState("");
  const [disable, setDisable] = useState(true);
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleClose = () => setShow(false);
  const validateform = (e) => {
    e.preventDefault();
    const check = state && acessoria && city && website && atletas;
    if(check){
      submitForm()
    }
else{
  setShowError(true)
}
  };
  const handleAcessoria = (e) => {
    e.preventDefault();
    setAcessoria(e.target.value);
    setShowError(false)
 
  };
  const handleAtleta = (e) => {
    e.preventDefault();
    setAtletas(e.target.value);
    setShowError(false)
 
  };
  const handleState = (e) => {
    e.preventDefault();
    setState(e.target.value);
    setShowError(false)
  };
  const handleCity = (e) => {
    e.preventDefault();
    setCity(e.target.value);
    setShowError(false)
 
  };
  const handleSite = (e) => {
    e.preventDefault();
    setwebsite(e.target.value);
    setShowError(false)
 
  };
  const submitForm = async (e) => {
 
    const userDataString = localStorage.getItem("register");
    const userData = JSON.parse(userDataString);
    const accessData = {
      nome: acessoria,
      site: website,
      email: userData.email,
      senha: userData.senha,
      telefone: userData.telefone,
      numero_de_atletas: atletas,
      estado: state,
      cidade: city,
    };

    try {
      const response = await fetch(ENV_BASE_URL + "/assessoria/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accessData),
      });
      if (response.ok) {
        window.location.href = "/login"
      }
      else {
        setShow(true)
      }


    } catch (error) {
      console.log(error);
      setShow(true);
    }

  };
  return (
    <form onSubmit={validateform} className="form_body m-auto">
      <div className="d-flex flex-column ">
        <ImageForm />
        <Texto texto="Configure sua conta" />
      </div>

      <InputForm
        type="text"
        text="Nome da acessoria"
        name="acessoria"
        placeholder="Nome da acessoria"
        handleOnChange={handleAcessoria}
      />

      <SelectForm
        text="Selecione"
        handleCity={handleCity}
        handleState={handleState}
        state={state}
      />

      <InputForm
        type="text"
        text="Site da acessoria"
        name="site"
        placeholder="www.acessoria.com.br"
        handleOnChange={handleSite}
      />
      <div className="mb-3">
        <InputForm
          type="number"
          text="Número de atletas"
          name="atletas"
          placeholder="0"
          handleOnChange={handleAtleta}
        />
      </div>
      {showError && (
        <small className="d-flex align-items-center justify-content-between p-2 mb-4">
          <div className="d-flex align-items-center gap-1  ">
            <IoAlertCircleOutline className="text-danger fw-bold" />
            <span className="text-danger ">Preencha todos os campos antes de prosseguir.</span>
          </div>
        </small>
      )}
      <ButtonForm text="Avançar" />
      <ModalError handleClose={handleClose} show={show} />
    </form>
  );
}

export default ConfigAccount;
