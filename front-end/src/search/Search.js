import { React, useState, useEffect } from 'react';
import { findByMobileNumber } from '../utils/api'
import ReservationsList from "../reservations/ReservationsList"
import { Container, Button, Row, Col, Form, InputGroup } from 'react-bootstrap';

export default function Search(){
  const [reservationsError, setReservationsError] = useState(null);
  const [formData,setFormData] = useState('');
  const [foundNumbers, setFoundNumbers] = useState([])

  useEffect(()=>{
    setFoundNumbers([]);
  },[])

  function handleChange({ target }) {
    setFormData(target.value);
    console.log(formData)
  }

  function submitHandler(event){
    event.preventDefault();
    const abortController = new AbortController();
    console.log(formData)
    findByMobileNumber(formData, abortController.signal)
    .then((response)=> response.length ? setFoundNumbers(response) : setFoundNumbers(["No reservations found"]))
    .catch((error)=> setReservationsError(error));
    return () => abortController.abort();
  }

  return (
    <Container fluid>
      {/* <ErrorAlert error={reservationsError} /> */}
      <Row>
        <Col>
          <h1>Search Reservations</h1>
        </Col>
      </Row>
      <Form onSubmit={submitHandler}>
        <Row>
          <Col xs={10}>
            <Form.Group>
              Mobile Number:
              <br />
              <InputGroup>
                <input
                  name="mobile_number"
                  id="mobile_number"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Enter the customer's mobile number"
                  maxLength="10"
                  required
                />
                <div className="input-group-append">
                  <Button type="submit">
                    <span className="oi oi-magnifying-glass"></span> Find
                  </Button>
                </div>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row>
        {foundNumbers.length > 0 &&
          foundNumbers[0] !== "No reservations found" && 
            <ReservationsList data={foundNumbers}/>
          }
        {foundNumbers[0] === "No reservations found" && 
          "No reservations found"
        }
      </Row>
    </Container>
  );
}