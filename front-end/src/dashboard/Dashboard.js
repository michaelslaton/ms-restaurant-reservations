import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import TablesList from "../tables/TablesList"
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../reservations/ReservationsList"
import { useHistory } from "react-router-dom";
import { previous, next, today } from "../utils/date-time";
import { Container, Button, Row, Col } from "react-bootstrap";

function Dashboard({ date, tables, setTables }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();

// ---------------------------------------------------- Load
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

// ---------------------------------------------------- Click
  function clickHandler({ target }) {
    if (target.name === "previous"){
      history.push(`/dashboard?date=${previous(date)}`);
    }
    if (target.name === "today") history.push(`/dashboard?date=${today()}`);
    if (target.name === "next") history.push(`/dashboard?date=${next(date)}`);
  }

// ---------------------------------------------------- Return
  return (
      <Container fluid>        
        <Row>

          <Col>
            <h1>Dashboard</h1>
            <div className="d-md-flex mb-3">
              <h4 className="mb-0">Reservations for {date}</h4>
            </div>

            <div>
              <Button className="mx-1" name="previous" onClick={clickHandler}>Previous</Button>
              <Button className="mx-1" name="today" onClick={clickHandler}>Today</Button>
              <Button className="mx-1" name="next" onClick={clickHandler}>Next</Button>
            </div>

            <ErrorAlert error={reservationsError} />
            <ReservationsList data={reservations} load={loadDashboard} setReservationsError={setReservationsError}/>
          </Col>

          <Col>
          <TablesList tables={tables} setTables={setTables} setReservationsError={setReservationsError} load={loadDashboard}/>
          </Col>

        </Row>
      </Container>
  )
}

export default Dashboard;
