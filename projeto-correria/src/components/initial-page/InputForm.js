import React from "react";
import Form from "react-bootstrap/Form";
function InputForm({ type, text, name, placeholder, handleOnChange, value }) {
  return (
    <Form>
      <Form.Group className=" text-start p-2 " controlId={name}>
        <Form.Label className="fw-bold">{text}</Form.Label>
        <Form.Control
          type={type}
          name={name}       
          placeholder={placeholder}
          onChange={handleOnChange}
          value={value}
        />
      </Form.Group>
    </Form>
  );
}

export default InputForm;
