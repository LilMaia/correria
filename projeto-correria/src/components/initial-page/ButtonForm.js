import Button from "react-bootstrap/Button";

function Buttonform({ text,disable }) {
  return (
    <>
      <Button variant="dark" type="submit" className="text-white rounded-1  mx-2 mr-2" disabled={disable}>
        {text}
      </Button>
    </>
  );
}

export default Buttonform;
