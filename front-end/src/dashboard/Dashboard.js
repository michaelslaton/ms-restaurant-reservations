import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import TablesList from "./TablesList"
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import { previous, next, today } from "../utils/date-time";
import { Container, Button, Table, Row, Col } from "react-bootstrap";

function Dashboard({ date, tables, setTables }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function clickHandler({ target }) {
    if (target.name === "previous"){
      history.push(`/dashboard?date=${previous(date)}`);
    }
    if (target.name === "today") history.push(`/dashboard?date=${today()}`);
    if (target.name === "next") history.push(`/dashboard?date=${next(date)}`);
  }

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
            <Table responsive striped size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>NAME</th>
                  <th>PHONE</th>
                  <th>DATE</th>
                  <th>TIME</th>
                  <th>PEOPLE</th>
                  <th>STATUS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation,index) => {
                  return (
                    <tr key={reservation.reservation_id}>
                      <td>{index + 1}</td>
                      <td>{`${reservation.first_name} ${reservation.last_name}`}</td>
                      <td>{reservation.mobile_number}</td>
                      <td>{reservation.reservation_date}</td>
                      <td>{reservation.reservation_time}</td>
                      <td>{reservation.people}</td>
                      <td>{reservation.status}</td>
                      <td><a className="btn btn-primary" href={`/reservations/${reservation.reservation_id}/seat`} size="sm">Seat</a></td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          <Col>
          <TablesList tables={tables} setTables={setTables} setReservationsError={setReservationsError}/>
          </Col>
        </Row>
      </Container>
  )
}

export default Dashboard;
