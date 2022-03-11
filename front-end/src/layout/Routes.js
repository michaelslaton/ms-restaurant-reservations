import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NewReservation from "../dashboard/NewReservation";
import Seat from "../dashboard/Seat";
import NewTable from "../dashboard/NewTable";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import { useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Routes() {
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
        <Seat />
      </Route>

      <Route exact={true} path="/tables/new">
        <NewTable />
      </Route>

      <Route path="/dashboard">
        <Dashboard date={date ? date : today()} />
      </Route>

      <Route>
        <NotFound />
      </Route>

    </Switch>
  );
}
