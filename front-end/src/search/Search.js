import { React, useState, useEffect } from "react";
import { findByMobileNumber } from "../utils/api";
import ReservationsList from "../reservations/ReservationsList";
import ErrorAlert from "../layout/ErrorAlert";
import { Container, Button, Row, Col, Form, InputGroup } from "react-bootstrap";

export default function Search() {
  const [reservationsError, setReservationsError] = useState(null);
  const [formData, setFormData] = useState("");
  const [foundNumbers, setFoundNumbers] = useState([]);

  // ---------------------------------------------------- Load
  useEffect(() => {
    setFoundNumbers([]);
  }, []);

  // ---------------------------------------------------- Change
  function handleChange({ target }) {
    setFormData(target.value);
  }

  // ---------------------------------------------------- Submit
  function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();

    findByMobileNumber(formData, abortController.signal)
      .then((response) =>
        response.length
          ? setFoundNumbers(response)
          : setFoundNumbers(["No reservations found"])
      )
      .catch((error) => setReservationsError(error));
    return () => abortController.abort();
  }

  // ---------------------------------------------------- Return
  return (
    <Container fluid className="p-0">
      <Row className="pageHead">
        <Col className="p-0">
          <h1>Search Reservations</h1>
        </Col>
      </Row>

      <Row>
        <Col className="display-container">
          <div className="display-center">
            <Form onSubmit={submitHandler}>
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
            </Form>
          </div>
        </Col>
      </Row>
      <Row>
        {foundNumbers.length > 0 &&
          foundNumbers[0] !== "No reservations found" && (
            <ReservationsList data={foundNumbers} />
          )}
        {foundNumbers[0] === "No reservations found" && "No reservations found"}
      </Row>
      <Row className="d-flex justify-content-center">
        <ErrorAlert error={reservationsError} />
      </Row>
    </Container>
  );
}
