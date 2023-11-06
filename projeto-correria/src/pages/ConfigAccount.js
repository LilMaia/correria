import InputForm from "../components/initial-page/InputForm.js";
import ImageForm from "../components/initial-page/ImageForm.js";
import ButtonForm from "../components/initial-page/ButtonForm.js";
import Texto from "../components/initial-page/Texto.js";
import SelectForm from "../components/initial-page/SelectForm.js";
import "../styles/initial-page//configaccount.css";
import { useState } from "react";
import { ENV_BASE_URL } from "../env/enviroment";
function ConfigAccount() {
  const [state, setState] = useState("");
  const [acessoria, setAcessoria] = useState("");
  const [city, setCity] = useState("");
  const [website, setwebsite] = useState("");
  const [atletas, setAtletas] = useState("");
const handleAcessoria=(e)=>{
  e.preventDefault();
  setAcessoria(e.target.value)
}
const handleAtleta=(e)=>{
  e.preventDefault();
  setAtletas(e.target.value)
}
const handleState=(e)=>{
  e.preventDefault();
  setState(e.target.value)
}
const handleCity=(e)=>{
  e.preventDefault();
  setCity(e.target.value)
}
const handleSite=(e)=>{
  e.preventDefault();
  setwebsite(e.target.value)
}
const submitForm=(e)=>{
  e.preventDefault();
  const userDataString = localStorage.getItem('register');
  const userData = JSON.parse(userDataString);
  const accessData={
    nome:acessoria,
    site:website,
    email:userData.email,
    senha:userData.senha,
    telefone:userData.telefone,
    numero_de_atletas:atletas,
    estado:state,
    cidade:city
  }
  //como fazer um fetch do tipo post na ENV_BASE_URL + "/assessoria/cadastro
  
  try { 
    const response =  fetch(ENV_BASE_URL + "/assessoria/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accessData),
    });

    // Aqui você pode lidar com a resposta, por exemplo:
    const data =  response.json();
    console.log(data);
  } catch (error) {
    console.log(error);}
  console.log(accessData)

}
  return (
    <form onSubmit={submitForm} className="form_body m-auto">
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

      <ButtonForm text="Avançar" />
    </form>
  );
}

export default ConfigAccount;
