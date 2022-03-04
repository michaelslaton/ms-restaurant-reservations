const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// ----------------------------------------------------------------- Time Validation

function currentTime() {
  const time = new Date();
  return [time.getHours(),
  time.getMinutes()]
}

function validateTime(req,res,next){
  const resTime = req.body.data.reservation_time;

  const theirTime = resTime.split(":").map((value)=>value = parseInt(value));

  const myTime = currentTime()

  const pastErr = {
    status: 400,
    message: `The reservation date is in the past. Only future reservations are allowed.`,
  }

  if(theirTime[0] <= 10){
    if(theirTime[1] < 30){ return next({
      status: 400,
      message: `No reservations can be made before we open at 10:30AM.`,
    }) }
  }

  if(theirTime[0] > 21){
    return next({
      status: 400,
      message: `No reservations can be made after 9:30PM.`,
    })
  } else if(theirTime[0] == 21 && theirTime[1] >= 30){
    return next({
      status: 400,
      message: `No reservations can be made after 9:30PM.`,
    })
}

  if(theirTime[0] < myTime[0]) return next(pastErr)
  if(theirTime[0] === myTime[0] && theirTime[1] < myTime[1]) return next(pastErr)

  next();
}

// ----------------------------------------------------------------- Date Validation

function currentDate() { // returns the current date in an array [00,00,00]
  const date = new Date();
  return [date.getFullYear(),
  (date.getMonth() + 1),
  date.getDate(),]
}

function aDate(year,month,day){ // returns the value of the day integer value 0-6 of the week of an entered date
  const myDate = new Date();
  myDate.setFullYear(year);
  myDate.setMonth(month - 1);
  myDate.setDate(day);
  return myDate.getDay();
}

function validateDate(req, res, next){ // validates the date is in the future and not a tuesday
  const resDate = req.body.data.reservation_date;
  const theirDate = resDate.split("-").map((value)=>value = parseInt(value));
  const myDate = currentDate();

  const pastErr = {
    status: 400,
    message: `The reservation date is in the past. Only future reservations are allowed.`,
  };

  if(theirDate[0] < myDate[0]){ return next(pastErr) };
  if(theirDate[0] === myDate[0] && theirDate[1] < myDate[1]){ return next(pastErr) };
  if(theirDate[0] === myDate[0] && theirDate[1] === myDate[1] && theirDate[2] < myDate[2]){ return next(pastErr) };

  if(aDate(theirDate[0],theirDate[1],theirDate[2]) == 2){ return next({
      status: 400,
      message: `The reservation date is a Tuesday as the restaurant is closed on Tuesdays.`,
    })
  };

  next();
}

// ----------------------------------------------------------------- Field Validation

const requiredFields = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function validateFields(req, res, next) {
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

// ----------------------------------------------------------------- Functionality

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
  create: [validateDate, validateTime, asyncErrorBoundary(validateFields), asyncErrorBoundary(create)],
  list: [asyncErrorBoundary(list)],
};
