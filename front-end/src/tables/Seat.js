import React, { useEffect, useState } from "react";
import { readReservation, listTables, seatReservation } from "../utils/api";
import TablesList from "./TablesList";
import ErrorAlert from "../layout/ErrorAlert";
import { useParams, useHistory } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

export default function Seat({ tables, setTables }) {
  const initialFormState = {
    reservation_id: "",
    table_id: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [reservation, setReservation] = useState({});
  const [reservationsError, setReservationsError] = useState(null);
  const { reservationId } = useParams();
  const url = process.env.REACT_APP_API_BASE_URL;
  const history = useHistory();

  // ---------------------------------------------------- Load
  useEffect(loadData, [reservationId, setTables, url]);

  function loadData() {
    const abortController = new AbortController();
    setReservationsError(null);

    readReservation(reservationId, abortController.signal)
      .then((response) => setReservation(response))
      .catch(setReservationsError);

    listTables(abortController.signal)
      .then((response) => setTables(response))
      .catch((error) => setReservationsError(error));

    return () => abortController.abort();
  }

  // ---------------------------------------------------- Submit
  async function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await seatReservation(
        formData.table_id,
        { data: { reservation_id: reservation.reservation_id } },
        abortController.signal
      );
      history.push(`/dashboard`);
    } catch (error) {
      setReservationsError(error);
    }
    return () => abortController.abort();
  }

  // ---------------------------------------------------- Change
  function changeHandler({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
      reservation_id: reservation.reservation_id,
    });
  }

  // ---------------------------------------------------- Return
  return (
    <Container fluid className="p-0">
      <Row className="pageHead">
        <Col>
          <h1>Seat Reservation</h1>
          <div>
            <h4>
              #{reservation.reservation_id} - {reservation.first_name}{" "}
              {reservation.last_name} on {reservation.reservation_date} at{" "}
              {reservation.reservation_time} for {reservation.people}
            </h4>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="display-container">
          <div className="display-center">
          <Row className="my-3">
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-2">
                Seat at:
                <select name="table_id" onChange={changeHandler}>
                  <option value>Select Table</option>
                  {tables.map((table) => {
                    return (
                      <option key={table.table_id} value={table.table_id}>
                        {table.table_name} - {table.capacity}
                      </option>
                    );
                  })}
                </select>
                <br />
                <div className="d-flex justify-content-end">
                  <button className="form-button mt-3 mr-2" type="Submit">Submit</button>
                  <button className="form-button mt-3 mr-2" onClick={() => history.goBack()}>Cancel</button>
                </div>
              </Form.Group>
            </Form>
          </Row>
          <Row className="my-3">
            <TablesList
              tables={tables}
              setTables={setTables}
              setReservationsError={setReservationsError}
            />
          </Row>
          <Row className="d-flex justify-content-center">
            <ErrorAlert error={reservationsError} />
          </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
