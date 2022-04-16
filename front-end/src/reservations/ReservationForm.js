import React from "react";
import { Container, Form, Col, Row } from 'react-bootstrap'

export default function ReservationForm({
  first_name,
  last_name,
  change,
  mobile_number,
  reservation_date,
  reservation_time,
  people,
  submit,
  cancel,
}) {
  
// ---------------------------------------------------- Return
  return (
    <Container fluid className="p-0">
      <Form onSubmit={submit}>
        <Row>
          <Col xs={6}>
            <Form.Group className="mb-2">
              First Name:
              <br />
              <input
                type="text"
                className=""
                id="first_name"
                name="first_name"
                onChange={change}
                value={first_name}
                required
              />
            </Form.Group>
          </Col>

          <Col xs={6}>
            <Form.Group className="mb-2">
              Last Name:
              <br />
              <input
                type="text"
                className=""
                id="last_name"
                name="last_name"
                onChange={change}
                value={last_name}
              />
            </Form.Group>
          </Col>

          </Row>
          <Row>

          <Col xs={6}>
            <Form.Group className="my-2">
              Mobile Number:
              <br />
              <input 
                type="text"
                className=""
                id="mobile_number"
                name="mobile_number"
                onChange={change}
                maxLength="10"
                value={mobile_number}
                required
              />
            </Form.Group>
          </Col>


          <Col xs={6}>
            <Form.Group className="my-2">
              Reservation Date:
              <br />
              <input
                type="date"
                className=""
                id="reservation_date"
                name="reservation_date"
                onChange={change}
                value={reservation_date}
                required
              />
            </Form.Group>
          </Col>

</Row>
<Row>

          <Col xs={6}>
            <Form.Group className="mt-2">
              Reservation Time:
              <br />
              <input
                type="time"
                className=""
                id="reservation_time"
                name="reservation_time"
                onChange={change}
                value={reservation_time}
                required
              />
            </Form.Group>
          </Col>

          <Col xs={6}>
            <Form.Group className="mt-2">
              Party Size:
              <br />
              <input
                type="number"
                className=""
                id="people"
                name="people"
                onChange={change}
                value={people}
                min="1"
                required
              />
            </Form.Group>
            <br/>
          </Col>

        </Row>
        <Row>

          <Col xs={12} className="d-flex justify-content-end mt-2">
            <button type="submit" className="form-button mr-2">
              <span className="oi oi-check"></span> Submit
            </button>
            <button className="form-button" name="cancel" onClick={cancel}>
              <span className="oi oi-x"></span> Cancel
            </button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
