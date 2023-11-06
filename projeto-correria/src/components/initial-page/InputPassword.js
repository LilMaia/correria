import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

export default function InputPassword({text,handlePasswordChange,value}) {
  const [showPassword, setShowPassword] = useState(false);
 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <Form.Group  className="mb-3 text-start p-2">
      <Form.Label  className="fw-bold">{text}</Form.Label>
      <InputGroup>
        <Form.Control className="border border-end-0"
          type={showPassword ? 'text' : 'password'}
          placeholder="Digite sua senha"
          value={value}
          onChange={handlePasswordChange}
        />
     
          <Button className="border border-start-0"
            variant="outline-secondary"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
          </Button>
     
      </InputGroup>
    </Form.Group>
  );
}
