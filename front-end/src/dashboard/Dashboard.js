import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import TablesList from "../tables/TablesList"
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../reservations/ReservationsList"
import { useHistory } from "react-router-dom";
import { previous, next, today } from "../utils/date-time";
import { Container, Row, Col } from "react-bootstrap";
import * as AiIcons from 'react-icons/ai'

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
    <Container fluid className="p-0">
      <Row className="pageHead">
        <Col>
          <div>
            <h1>Dashboard</h1>
            <h4>Reservations for {date}</h4>
          </div>
          <ErrorAlert error={reservationsError} />
        </Col>
      </Row>
      <Row>
        <Col className="display-container">
          <div className="display-center">
            <div className="dashboard-controls">
              <button
                className="dashboard-button"
                name="previous"
                onClick={clickHandler}
              >
                <span className="oi oi-chevron-left"></span> Previous
              </button>
              <button
                className="dashboard-button"
                name="today"
                onClick={clickHandler}
              >
                Today
              </button>
              <button
                className="dashboard-button"
                name="next"
                onClick={clickHandler}
              >
                Next <span className="oi oi-chevron-right"></span>
              </button>
            </div>

            <div className="my-3">
              <ReservationsList
                data={reservations}
                load={loadDashboard}
                setReservationsError={setReservationsError}
              />
            </div>

            <div className="my-4">
              <TablesList
                tables={tables}
                setTables={setTables}
                setReservationsError={setReservationsError}
                load={loadDashboard}
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
