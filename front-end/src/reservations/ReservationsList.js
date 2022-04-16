import { React } from 'react';
import { changeReservationStatus } from "../utils/api"
import { Table, Button } from 'react-bootstrap'

export default function ReservationsList({ data, load, setReservationsError }){

// ---------------------------------------------------- Cancel
  async function cancelHandler(reservationId) {
    const abortController = new AbortController();
    if (window.confirm("Do you want to cancel this reservation?\n\n This cannot be undone.")) {
      try {
        await changeReservationStatus(reservationId, { data: { status: 'cancelled' }}, abortController.signal);
        load();
      } catch (error) {
        setReservationsError(error);
      }
      return () => abortController.abort();
    }
    return;
  }

// ---------------------------------------------------- Return
  return (
    <div className="aTable">
      <Table borderless responsive striped>
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
                {data.map((reservation) => {
                  
                  return (
                    <tr key={reservation.reservation_id}>
                      <td>{reservation.reservation_id}</td>
                      <td>{`${reservation.first_name} ${reservation.last_name}`}</td>
                      <td>{reservation.mobile_number}</td>
                      <td>{reservation.reservation_date}</td>
                      <td>{reservation.reservation_time}</td>
                      <td>{reservation.people}</td>
                      <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
                      <td>
                        {reservation.status === "booked" && (
                          <div className="d-flex justify-content-end">
                            <a className="table-button" href={`/reservations/${reservation.reservation_id}/seat`} size="sm">Seat</a>
                            <a className="table-button" href={`/reservations/${reservation.reservation_id}/edit`} size="sm">Edit</a>
                            <button className="table-button" onClick={()=> cancelHandler(reservation.reservation_id)} data-reservation-id-cancel={reservation.reservation_id}>Cancel</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );

                })}
              </tbody>
            </Table>
            </div>
  )
}