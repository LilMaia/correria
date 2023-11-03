import Button from 'react-bootstrap/Button';

function Buttonform({text}) {
  return (
    <>     
      <Button variant="dark"  className="w-100     text-white rounded-1">{text}</Button>
 
    </>
  );
}

export default Buttonform;