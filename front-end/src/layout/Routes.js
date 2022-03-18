import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NewReservation from "../reservations/NewReservation";
import EditReservation from "../reservations/EditReservation";
import Seat from "../tables/Seat";
import Search from "../search/Search.js"
import NewTable from "../tables/NewTable";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import { useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Routes() {
  const [tables, setTables] = useState([]);
  const query = useQuery();
  let date = query.get("date");

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route exact={true} path="/reservations/new">
        <NewReservation />
      </Route>

      <Route exact={true} path="/reservations/:reservationId/seat">
        <Seat tables={tables} setTables={setTables} />
      </Route>

      <Route exact={true} path="/reservations/:reservationId/edit">
        <EditReservation />
      </Route>

      <Route exact={true} path="/search">
        <Search />
      </Route>

      <Route exact={true} path="/tables/new">
        <NewTable />
      </Route>

      <Route path="/dashboard">
        <Dashboard
          tables={tables}
          setTables={setTables}
          date={date ? date : today()}
        />
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
