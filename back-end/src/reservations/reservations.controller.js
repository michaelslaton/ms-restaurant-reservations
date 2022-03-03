const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const requiredFields = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

async function validateFields(req, res, next) {
  const { data = {} } = req.body;

  if (data["reservation_date"] && !data["reservation_date"].match(/\d{4}-\d{2}-\d{2}/g)) {
    return next({
      status: 400,
      message: `reservation_date does not match the pattern`,
    });
  }
  if (
    data["reservation_time"] &&
    !data["reservation_time"].match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
  ) {
    return next({
      status: 400,
      message: `reservation_time does not match pattern`,
    });
  }
  if (data["people"] && typeof data["people"] !== "number") {
    return next({
      status: 400,
      message: `people is not a number`,
    });
  }
  console.log(data);

  requiredFields.map((field) => {
    if (!data[field]) {
      return next({
        status: 400,
        message: `Required field: ${field} is missing`,
      });
    }
  });

  next();
}

async function create(req, res, next) {
  const { data = {} } = req.body;
  const newData = await service.create(data);
  res.status(201).json({ data: newData });
}

async function list(req, res) {
  const params = req.query.date;
  let data = {};

  if (params) {
    data = await service.listSpecificDate(params);
    return res.json({ data });
  }

  data = await service.list();
  return res.json({ data });
}

module.exports = {
  create: [asyncErrorBoundary(validateFields), asyncErrorBoundary(create)],
  list: [asyncErrorBoundary(list)],
};
