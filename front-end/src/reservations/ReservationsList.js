import { React } from 'react';
import { changeReservationStatus } from "../utils/api"
import { Container, Table, Button } from 'react-bootstrap'

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
    <Container fluid>
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
                          <>
                            <a className="btn btn-primary" href={`/reservations/${reservation.reservation_id}/seat`} size="sm">Seat</a>
                            <a className="btn btn-primary" href={`/reservations/${reservation.reservation_id}/edit`} size="sm">Edit</a>
                            <Button variant="danger" onClick={()=> cancelHandler(reservation.reservation_id)} data-reservation-id-cancel={reservation.reservation_id}>Cancel</Button>
                          </>
                        )}
                      </td>
                    </tr>
                  );

                })}
              </tbody>
            </Table>
    </Container>
  )
}