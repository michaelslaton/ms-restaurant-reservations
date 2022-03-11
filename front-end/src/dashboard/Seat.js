import React, { useEffect, useState } from "react";
import { readReservation, listTables, seatReservation } from "../utils/api";
import TablesList from "./TablesList"
import ErrorAlert from "../layout/ErrorAlert";
import { useParams, useHistory } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";

export default function Seat(){
  const initialFormState = {
    reservation_id: "",
    table_id: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const [reservation, setReservation] = useState({});
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const { reservationId } = useParams();
  const url = process.env.REACT_APP_API_BASE_URL;
  const history = useHistory();

  useEffect(loadData, [reservationId, url]);

  function loadData() {
    const abortController = new AbortController();
    setReservationsError(null);

    readReservation(reservationId, abortController.signal)
      .then((response)=>setReservation(response))
      .catch(setReservationsError);

    listTables(abortController.signal)
    .then((response)=> setTables(response))
    .catch((error)=> setReservationsError(error));

    return () => abortController.abort();
  }

  async function handleSubmit(event){
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await seatReservation(formData.table_id,{ data: { reservation_id: reservation.reservation_id} }, abortController.signal);
      history.push(`/dashboard`)
    } catch (error) {
      setReservationsError(error)
    }
    
    return () => abortController.abort();
  }

  function changeHandler({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
      reservation_id: reservation.reservation_id,
    });
  }

  return (
    <Container fluid>
      <Row>
        <Col>
      <h1>Seat Reservation</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">#{reservation.reservation_id} - {reservation.first_name} {reservation.last_name} on {reservation.reservation_date} at {reservation.reservation_time} for {reservation.people}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      </Col>
      </Row>
      <Row>
        <form onSubmit={handleSubmit}>
        <label htmlFor="table_id">Seat at:</label>
        <select name="table_id" onChange={changeHandler}>
          <option value>Select Table</option>
          {tables.map((table)=>{
            return ( <option key={table.table_id} value={table.table_id}>{table.table_name} - {table.capacity}</option> )
          })}
        </select>
        <Button type="Submit" size="sm">Submit</Button>
        <Button size="sm" onClick={() => history.goBack()}>Cancel</Button>
      </form>
      </Row>
      <Row>
      <TablesList setReservationsError={setReservationsError} />
      </Row>
    </Container>
  );
}