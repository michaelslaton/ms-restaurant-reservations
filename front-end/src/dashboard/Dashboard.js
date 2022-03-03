import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import { previous, next, today } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
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
  };

  function clickHandler({ target }){
    if(target.name === "previous") history.push(`/dashboard?date=${previous(date)}`)
    if(target.name === "today") history.push(`/dashboard?date=${today()}`)
    if(target.name === "next") history.push(`/dashboard?date=${next(date)}`)
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <div>
        <button className="btn btn-primary mx-1" name="previous" onClick={clickHandler}>Previous</button>
        <button className="btn btn-primary mx-1" name="today" onClick={clickHandler}>Today</button>
        <button className="btn btn-primary mx-1" name="next" onClick={clickHandler}>Next</button>
      </div>
      <hr/>
      <ErrorAlert error={reservationsError}/>
      {reservations.map((reservation) =>{
        return (
          <div key={reservation.reservation_id}>
            First Name: {reservation.first_name}<br/>
            Last Name: {reservation.last_name}<br/>
            Mobile Number: {reservation.mobile_number}<br/>
            Reservation Date: {reservation.reservation_date}<br/>
            Reservation Time: {reservation.reservation_time}<br/>
            Party Size: {reservation.people}<br/>
            <hr/>
          </div>
        )
      })}
    </main>
  );
}

export default Dashboard;
