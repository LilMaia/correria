import InputForm from "../components/initial-page/InputForm.js";
import ImageForm from "../components/initial-page/ImageForm.js";
import ButtonForm from "../components/initial-page/ButtonForm.js";
import Texto from "../components/initial-page/Texto.js";
import SelectForm from "../components/initial-page/SelectForm.js";
import "../styles/initial-page//configaccount.css";
function ConfigAccount() {
  return (
    <div className="form_body m-auto">
      <div className="d-flex flex-column ">
        <ImageForm />
        <Texto texto="Configure sua conta" />
      </div>

      <InputForm
        type="text"
        text="Nome da acessoria"
        name="acessoria"
        placeholder="Nome da acessoria"
      />
      <div className="d-flex justify-content-around gap-2 p-2">
      <SelectForm text="Selecione"/>
      <SelectForm text="Selecione"/>
      </div>
      <InputForm
        type="text"
        text="Site da acessoria"
        name="site"
        placeholder="www.acessoria.com.br"
      />
      <InputForm
        type="number"
        text="Número de atletas"
        name="atletas"
        placeholder="0"
      />

      <ButtonForm text="Avançar" />
    </div>
  );
}

export default ConfigAccount;
