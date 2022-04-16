import React, { useState } from "react";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import { Container, Button, Row, Col, Form } from "react-bootstrap";

export default function NewTable() {
  const initialFormState = {
    table_name: "",
    capacity: 0,
  };
  const [formData,setFormData] = useState({ ...initialFormState });
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();

// ---------------------------------------------------- Submit
  async function handleSubmit(event){
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await createTable({ data: formData }, abortController.signal);
      history.push(`/dashboard`)
    } catch (error) {
      setReservationsError(error)
    }

    return () => abortController.abort();
  }

// ---------------------------------------------------- Change
  function handleChange({ target }) {
    let value = target.value;
    if(target.name === "capacity") value = Number(value);
    setFormData({
      ...formData,
      [target.name]: value,
    });
  }

// ---------------------------------------------------- Return
  return (
    <Container fluid className="p-0">

      <Row className="pageHead">
        <Col xs={12}>
          <div>
          <h1>Create Table</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="display-container">
          
        <div className="display-center">
      <Form onSubmit={handleSubmit} className="mb-4 mt-4">
        <Row>
          <Col xs={6}>
            <Form.Group>
              Table Name:
              <br />
              <input
                type="text"
                className="form-control"
                id="table_name"
                name="table_name"
                minLength="2"
                onChange={handleChange}
                placeholder="Table Name"
                required
              />
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group>
              Capacity:
              <br />
              <input
                type="number"
                className="form-control"
                id="capacity"
                name="capacity"
                onChange={handleChange}
                min="1"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Row>
          <Col xs={12} className="d-flex justify-content-end mt-2">
            <button type="submit" className="form-button mr-2">
              <span className="oi oi-check"></span> Submit
            </button>
            <button
              className="form-button"
              name="cancel"
              onClick={() => history.goBack()}>
              <span className="oi oi-x"></span> Cancel
            </button>
          </Col>
        </Row>
      </Form>
      </div>
      </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <ErrorAlert error={reservationsError} />
      </Row>
    </Container>
  );
}
