import Button from "react-bootstrap/Button";

function Buttonform({ text }) {
  return (
    <>
      <Button variant="dark" className="text-white rounded-1  mx-2 mr-2">
        {text}
      </Button>
    </>
  );
}

export default Buttonform;
