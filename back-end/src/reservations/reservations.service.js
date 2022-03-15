const knex = require("../db/connection");

const database = "reservations";

function create(reservation) {
  return knex(database)
    .insert(reservation)
    .returning("*")
    .then((reservation) => reservation[0]);
}

function listSpecificDate(reservation_date){
  return knex(database)
  .select("*")
  .where({ reservation_date })
  .whereNotIn("status", ["finished", "canceled"])
  .orderBy("reservation_time")
}

function list(){
  return knex(database)
  .select("*")
  .whereNotIn("status", ["finished", "canceled"])
  .orderBy("reservation_time")
}

function read(reservation_id){ 
  return knex(database)
  .select("*")
  .where({ reservation_id })
  .first();
}

function updateStatus(reservation_id, status){
  return knex("reservations")
    .where({ reservation_id })
    .update({ status })
}

module.exports = {
  create,
  listSpecificDate,
  list,
  read,
  updateStatus,
}