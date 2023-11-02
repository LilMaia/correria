import Form from 'react-bootstrap/Form';

function CheckboxForm({text}) {
  return (
    <Form>
  
        <div key="checkbox" className="mb-3">
          <Form.Check // prettier-ignore
            type="checkbox"
            id="checkbox"
            label={text}
          />

    
        </div>
    
    </Form>
  );
}

export default CheckboxForm;