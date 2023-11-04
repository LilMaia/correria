import InputForm from "../components/initial-page/InputForm.js";
import InputPassword from "../components/initial-page/InputPassword.js";
import ImageForm from "../components/initial-page/ImageForm.js";
import ButtonForm from "../components/initial-page/ButtonForm.js";
import Texto from "../components/initial-page/Texto.js";
import CheckboxForm from "../components/initial-page/CheckboxForm.js";
import ButtonGoogle from "../components/initial-page/ButtonGoogle.js";
import { Link } from "react-router-dom";
import "../styles/initial-page/configaccount.css";
function Register() {
  return (
    <div className="form_body m-auto ">
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
      />
      <div className="d-md-flex justify-content-md-between gap-1">
        <InputForm 
          type="email"
          text="E-mail"
          name="Email"
          placeholder="Digite seu e-mail"
        />
        <InputForm
          type="tel"
          text="Telefone (opcional)"
          name="telephone"
          placeholder="(31)999999999"
        />
      </div>
      <InputPassword text="Senha" />
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
      <ButtonForm text="Criar conta" />
      <p className="mt-1 ms-2 d-flex justify-content-center fs-6 p-2">
        <Link
          to="/login"
          className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
        >
          <small>Já tenho conta</small>
        </Link>
      </p>
    </div>
  );
}

export default Register;
