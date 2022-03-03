const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((reservation) => reservation[0]);
}

function listSpecificDate(reservation_date){
  return knex("reservations")
  .select("*")
  .where({ reservation_date })
  .orderBy("reservation_time")
}

function list(){
  return knex("reservations")
  .select("*")
  .orderBy("reservation_time")
}

module.exports = {
  create,
  listSpecificDate,
  list,
}