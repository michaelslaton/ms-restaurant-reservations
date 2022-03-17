import React, { useEffect } from "react";
import { listTables, finishTable, changeReservationStatus } from "../utils/api";
import { Table, Button } from "react-bootstrap";

export default function TablesList({ setReservationsError, tables, setTables, loadDashboard }) {

  useEffect(loadData, [setReservationsError, setTables]);
  
  function loadData() {
    const abortController = new AbortController();
    listTables(abortController.signal)
      .then((response)=> setTables(response))
      .catch((error)=> setReservationsError(error));
    return () => abortController.abort();
  }

  async function handleFinish(tableId, reservationId) {
    const abortController = new AbortController();
    if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {

      try {
        await finishTable(tableId, abortController.signal);
        // await changeReservationStatus(reservationId,{ data: { status: "finished" } }, abortController.signal)
        loadData();
        loadDashboard();
      } catch (error) {
        setReservationsError(error);
      }

      return () => abortController.abort();
    }

    return;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>TABLE NAME</th>
          <th>CAPACITY</th>
          <th>Free?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tables.map((table, index) => {
          return (
            <tr key={table.table_id}>
              <td>{index + 1}</td>
              <td>{`${table.table_name}`}</td>
              <td>{table.capacity}</td>
              <td data-table-id-status={table.table_id}>
                {table.reservation_id === null ? "Free" : "Occupied"}
              </td>
              <td>
                {table.reservation_id !== null && (
                  <Button
                    data-table-id-finish={table.table_id}
                    onClick={() => handleFinish(table.table_id, table.reservation_id)}
                    size="sm">
                    Finish
                  </Button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
