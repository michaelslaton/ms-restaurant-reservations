import React, { useEffect, useState } from "react";
import { listTables } from "../utils/api";
import { Table } from "react-bootstrap";

export default function TablesList({ setReservationsError }) {
  const [tables, setTables] = useState([]);

  useEffect(loadDashboard, [setReservationsError]);
  
  function loadDashboard() {
    const abortController = new AbortController();
    listTables(abortController.signal)
      .then((response)=> setTables(response))
      .catch((error)=> setReservationsError(error));
    return () => abortController.abort();
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>TABLE NAME</th>
          <th>CAPACITY</th>
          <th>Free?</th>
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
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
