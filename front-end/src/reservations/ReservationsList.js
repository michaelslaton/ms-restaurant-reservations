import { React } from 'react';
import { Container, Col, Row, Table } from 'react-bootstrap'

export default function ReservationsList({ data }){

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
                {data.map((reservation,index) => {
                  
                  return (
                    <tr key={reservation.reservation_id}>
                      <td>{index + 1}</td>
                      <td>{`${reservation.first_name} ${reservation.last_name}`}</td>
                      <td>{reservation.mobile_number}</td>
                      <td>{reservation.reservation_date}</td>
                      <td>{reservation.reservation_time}</td>
                      <td>{reservation.people}</td>
                      <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
                      <td></td>
                      <td>
                        {reservation.status === "booked" && (
                          <a className="btn btn-primary" href={`/reservations/${reservation.reservation_id}/seat`} size="sm">Seat</a>
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