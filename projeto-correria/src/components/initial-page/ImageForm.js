import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import "./imageform.css";

function ImageForm() {
  return (
    <Container>
      <Row className="d-flex justify-content-center mt-4 mb-4">
        <Col xs={6} md={4} >
          <Image className="img_format mt-3 "
            
            src="CORRERIA.svg"
            alt="Logo da empresa"
            thumbnail
          />
        </Col>
      </Row>
    </Container>
  );
}

export default ImageForm;
