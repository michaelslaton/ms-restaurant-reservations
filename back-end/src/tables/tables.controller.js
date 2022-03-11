const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// ----------------------------------------------------------------- Capacity Validation

async function validateCapacity(req, res, next){
  const tableId = req.params.tableId
  const body = req.body.data;
  const foundReservation = await service.readReservation(body.reservation_id);
  const foundTable = await service.readTable(tableId);

  if(!foundReservation){
    return next({
      status: 404,
      message: `Reservation ${body.reservation_id} does not exist.`,
    })
  }

  if(foundTable.reservation_id !== null){
    return next({
      status: 400,
      message: `Table is occupied.`,
    })
  }

  if(foundReservation.people > foundTable.capacity){
    console.log("validation: error")
    return next({
      status: 400,
      message: `Party size is over table capacity.`,
    })
  }
  next();
}

// ----------------------------------------------------------------- Field Validation

const requiredFieldsSeat = [
  "reservation_id",
];

const requiredFieldsTable = [
  "table_name",
  "capacity",
];

function validateFields(fields) {
  return (req, res, next) => {
    const data = req.body.data;

    if (!data) {
      return next({
        status: 400,
        message: `Missing data.`,
      });
    }

    fields.map((field) => {
      if (!data[field]) {
        return next({
          status: 400,
          message: `Required field: ${field} is missing`,
        });
      }
    });

    next();
  };
}

function validateFieldLengths(req,res,next){
  const data = req.body.data;

  if(typeof data.capacity !== "number"){
    return next({
      status: 400,
      message: `Given capacity is not a number.`,
    });
  }
  console.log(data.table_name.length)
  if(data.table_name.length < 2){ 
    return next({
      status: 400,
      message: `Field table_name is too short.`,
    });
  }
  next();
}

// ----------------------------------------------------------------- Functionality

async function create(req,res){
  const newTable = req.body.data;
  console.log("Controller New Table: ", newTable)
  const data = await service.create(newTable)
  console.log("Data: ", data)
  return res.status(201).json({ data });
}

async function list(req, res) {
  const params = req.query.date;
  let data = {};

  if (params) {
    data = await service.listSpecific(params);
    return res.json({ data });
  }

  data = await service.list();
  return res.json({ data });
}

async function updateSeat(req, res) {
  const body = req.body.data;
  const tableId = req.params.tableId
  const data = await service.seat(tableId,body.reservation_id);
  return res.status(200).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  update: [validateFields(requiredFieldsSeat), validateCapacity, asyncErrorBoundary(updateSeat)],
  create: [validateFields(requiredFieldsTable), validateFieldLengths, asyncErrorBoundary(create)],
}