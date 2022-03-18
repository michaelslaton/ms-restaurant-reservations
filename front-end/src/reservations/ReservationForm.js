import React from "react";
import { Container, Form, Col, Row, Button } from 'react-bootstrap'

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
    <Container fluid>
      <Form onSubmit={submit}>
        <Row>
          <Col xs={4}>
            <Form.Group>
              First Name:
              <br />
              <input
                style={{width:"100%"}}
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

          <Col xs={4}>
            <Form.Group>
              Last Name:
              <br />
              <input
                style={{width:"100%"}}
                type="text"
                className=""
                id="last_name"
                name="last_name"
                onChange={change}
                value={last_name}
              />
            </Form.Group>
          </Col>

          <Col xs={4}>
            <Form.Group>
              Mobile Number:
              <br />
              <input 
                style={{width:"100%"}}
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
        </Row>
        <Row>
          <Col xs={4}>
            <Form.Group>
              Reservation Date:
              <br />
              <input
                style={{width:"100%"}}
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

          <Col xs={4}>
            <Form.Group>
              Reservation Time:
              <br />
              <input
                style={{width:"100%"}}
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

          <Col xs={4}>
            <Form.Group>
              Party Size:
              <br />
              <input
                style={{width:"100%"}}
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
          <Col xs={12}>
            <Button type="submit" className="btn btn-primary">
              Submit
            </Button>
            <Button className="btn btn-primary" name="cancel" onClick={cancel}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
