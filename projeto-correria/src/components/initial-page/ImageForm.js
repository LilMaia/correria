import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

function ImageForm() {
  return (
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image
            className="mt-4"
            src="teste.jpg/171x180"
            alt="Logo da empresa"
            thumbnail
          />
        </Col>
      </Row>
    </Container>
  );
}

export default ImageForm;
