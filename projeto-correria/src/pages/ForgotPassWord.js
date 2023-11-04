import InputForm from "../components/initial-page/InputForm.js";

import ImageForm from "../components/initial-page/ImageForm.js";
import ButtonForm from "../components/initial-page/ButtonForm.js";
import Texto from "../components/initial-page/Texto.js";
import SubTexto from "../components/initial-page/SubTexto.js";
import "../styles/initial-page//login.css";
function ForgotPassWord() {
  return (
    <div className="form_body m-auto">
      <div className="d-flex flex-column ">
        <ImageForm  />
      <Texto texto="Esqueci minha senha"/>
     
      </div>
  
      <SubTexto texto="Qual é o e-mail cadastrado?"/>
      <div className="mb-4"> 
      <InputForm
        type="email"
        text="E-mail"
        name="email"
        placeholder="email@email.com"
      />
 </div>
      <ButtonForm text="Prosseguir" />
 
    </div>
  );
}

export default ForgotPassWord;
