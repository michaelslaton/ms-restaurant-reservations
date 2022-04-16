import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm"
import { Container, Row, Col } from 'react-bootstrap'
import { readReservation, updateReservation } from "../utils/api"

export default function EditReservation(){
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [reservationsError, setReservationsError] = useState(null);
  const { reservationId } = useParams();
  const history = useHistory();

// ---------------------------------------------------- Load
  useEffect(loadData, [reservationId]);

  function loadData(){
    const abortController = new AbortController();
    setReservationsError(null);
    readReservation(reservationId, abortController.signal)
      .then((response)=> {
        setFormData({
        first_name: response.first_name,
        last_name: response.last_name,
        mobile_number: response.mobile_number,
        reservation_date: response.reservation_date,
        reservation_time: response.reservation_time,
        people: response.people
      })}
      )
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  // ---------------------------------------------------- Submit
  async function handleSubmit(event){
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await updateReservation(reservationId, { data: formData }, abortController.signal);
      history.push(`/dashboard?date=${formData.reservation_date}`)
    } catch (error) {
      setReservationsError(error)
    }

    return () => abortController.abort();
  }

// ---------------------------------------------------- Cancel
  function handleCancel(){
    history.goBack();
  }

  // ---------------------------------------------------- Change
  function handleChange({ target }) {
    let value = target.value;
    if(target.name === "people") value = Number(value);
    setFormData({
      ...formData,
      [target.name]: value,
    });
  }
// ---------------------------------------------------- Return
  return (
    <Container fluid className="p-0">
      <Row className="pageHead">
        <Col className="p-0">
          <h1>{`Edit Reservation #${reservationId}`}</h1>
        </Col>
      </Row>
      <Row>
        <Col className="display-container">
          <div className="display-center">
          <ReservationForm
            first_name={formData.first_name}
            last_name={formData.last_name}
            mobile_number={formData.mobile_number}
            reservation_date={formData.reservation_date}
            reservation_time={formData.reservation_time}
            people={formData.people}
            change={handleChange}
            submit={handleSubmit}
            cancel={handleCancel}
          />
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <ErrorAlert error={reservationsError} />
      </Row>
    </Container>
  );
}