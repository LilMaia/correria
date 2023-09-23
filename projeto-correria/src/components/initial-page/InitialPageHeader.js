import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importe o Link do React Router
import "../../styles/initial-page/InitialPageHeader.css";

const InitialPageHeader = () => {
  return (
    <>
      <Navbar expand="lg" className="navbar" style={{ width: "100%" }}>
        <Container className="container">
          <Navbar.Brand href="#home">
          <Link to="/" className="navbar-brand">
            <img
              src="logo.png"
              alt="Correr.ia"
              className="header-logo"
              width={200}
            />
          </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="ml-auto">
            <Nav className="me-auto">
              {/* Use o Link para navegar para a rota "/treino-individual" */}
              <Link to="/treino-individual" className="nav-link">
                Treino individual
              </Link>
              <Link to="/carregar-excel" className="nav-link">
                Carregar Excel
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default InitialPageHeader;
