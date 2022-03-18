import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";
import { createReservation } from "../utils/api";
import { Container } from 'react-bootstrap';
// const url = process.env.REACT_APP_API_BASE_URL

export default function NewReservation(){
  const history = useHistory();
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [formData,setFormData] = useState({ ...initialFormState });
  const [reservationsError, setReservationsError] = useState(null);

// ---------------------------------------------------- Change
  function handleChange({ target }) {
    let value = target.value;
    if(target.name === "people") value = Number(value);
    setFormData({
      ...formData,
      [target.name]: value,
    });
  }

// ---------------------------------------------------- Cancel
  function handleCancel(){
    history.goBack();
  }

// ---------------------------------------------------- Submit
  async function handleSubmit(event){
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await createReservation({ data: formData }, abortController.signal);
      history.push(`/dashboard?date=${formData.reservation_date}`)
    } catch (error) {
      setReservationsError(error)
    }

    return () => abortController.abort();
  }

// ---------------------------------------------------- Return
  return (
    <Container fluid>
      <h1>Create Reservation</h1>
      <ErrorAlert error={reservationsError}/>
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
    </Container>
  )
}