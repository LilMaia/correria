import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Row from "react-bootstrap/Row";
import "./modalconfirmation.css";

import { BsCheck2 } from "react-icons/bs";

function ModalGenerics({ handleClose, show, text, subtext }) {

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="border border-0" closeButton></Modal.Header>
                <Modal.Body className="w-100">
                    <Container>
                        <Row className="d-flex justify-content-center align-items-center ">
                            <Col xs={6} md={4}>
                                <div className="image_modal  ">
                                    <BsCheck2 className="icon_size fw-bold" />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <p className="fw-bold fs-3 text-center mt-2">{text}</p>
                    <p className="mt-3 p-2">
                        {subtext}
                    </p>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default ModalGenerics;