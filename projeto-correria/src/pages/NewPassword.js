import InputPassword from "../components/initial-page/InputPassword.js";
import ImageForm from "../components/initial-page/ImageForm.js";
import ButtonForm from "../components/initial-page/ButtonForm.js";
import Texto from "../components/initial-page/Texto.js";
import SubTexto from "../components/initial-page/SubTexto.js";

import "../styles/initial-page//login.css";
function NewPassword() {
  return (
    <div className="form_body m-auto">
      <div className="d-flex flex-column ">
        <ImageForm />
        <Texto texto="Estamos quase lá :)" />
      </div>
      <SubTexto texto="Vamos criar uma nova senha" />
      <InputPassword text="Nova Senha"/>
      <InputPassword   text="Repita a Senha"/>
 

      <ButtonForm text="Alterar Senha" />
    </div>
  );
}

export default NewPassword;
