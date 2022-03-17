import React from "react";

export default function ReservationForm({
  first_name,
  last_name,
  change,
  mobile_number,
  reservation_date,
  reservation_time,
  people,
  submit,
  cancel,
}) {
  return (
    <form onSubmit={submit}>
      <div className="form-group">
        First Name:
        <input
          type="text"
          className=""
          id="first_name"
          name="first_name"
          onChange={change}
          value={first_name}
          required
        />
      </div>

      <div className="form-group">
        Last Name:
        <input
          type="text"
          className=""
          id="last_name"
          name="last_name"
          onChange={change}
          value={last_name}
        />
      </div>

      <div className="form-group">
        Mobile Number:
        <input
          type="text"
          className=""
          id="mobile_number"
          name="mobile_number"
          onChange={change}
          maxLength="10"
          value={mobile_number}
          required
        />
      </div>

      <div className="form-group">
        Reservation Date:
        <input
          type="date"
          className=""
          id="reservation_date"
          name="reservation_date"
          onChange={change}
          value={reservation_date}
          required
        />
      </div>

      <div className="form-group">
        Reservation Time:
        <input
          type="time"
          className=""
          id="reservation_time"
          name="reservation_time"
          onChange={change}
          value={reservation_time}
          required
        />
      </div>

      <div className="form-group">
        Party Size:
        <input
          type="number"
          className=""
          id="people"
          name="people"
          onChange={change}
          value={people}
          min="1"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <button className="btn btn-primary" name="cancel" onClick={cancel}>
        Cancel
      </button>
    </form>
  );
}
