import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function ButtonGoogle({text}) {
  return (
    <>
      <Button variant="outline-light" className="border border-black border-3 ms-2 me-2">
   
        <Link className="text-decoration-none d-flex align-items-center justify-content-center " to="/">
        <FcGoogle />
          <span className="px-2 text-dark ">{text}</span>
        </Link>
      </Button>
    </>
  );
}

export default ButtonGoogle;
