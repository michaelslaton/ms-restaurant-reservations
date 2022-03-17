import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm"
import { createReservation } from "../utils/api"
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

  function handleChange({ target }) {
    let value = target.value;
    if(target.name === "people") value = Number(value);
    setFormData({
      ...formData,
      [target.name]: value,
    });
  }

  function handleCancel(){
    history.goBack();
  }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   console.log("submit called")
  //   fetch(`${url}/reservations`,
  //   {
  //     method: "POST",
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //     body: JSON.stringify({ data: formData}),
  //   })
  //   .then((response)=>response.json())
  //   .then((payload)=> {
  //     if (payload.error) {
  //       return Promise.reject({ message: payload.error });
  //     }
  //     setFormData({ ...initialFormState })
  //   })
  //   .catch((error)=> setReservationsError(error))
  // }

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

  return (
    <div>
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
    </div>
  )
}