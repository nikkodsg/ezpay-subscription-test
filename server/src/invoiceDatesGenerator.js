const moment = require("moment");

function generateDates(start, end, period) {
  const invoiceDates = [];
  let currentDate = moment(start);
  let endDate = moment(end);

  while (currentDate <= endDate) {
    invoiceDates.push(moment(currentDate).format("DD/MM/YYYY"));
    currentDate.add("1", period);
  }

  return invoiceDates;
}

function getDaily(startDate, endDate) {
  return generateDates(startDate, endDate, "day");
}

function getWeekly(day, startDate, endDate) {
  let currentDate = moment(startDate).day(day);
  console.log({ currentDate, startDate, endDate });

  if (currentDate < startDate) {
    currentDate.add("1", "week");
  }

  return generateDates(currentDate, endDate, "week");
}

function getMonthly(date, startDate, endDate) {
  let currentDate = moment(startDate).date(date);
  console.log({ currentDate, startDate, endDate });

  if (currentDate < startDate) {
    currentDate.add("1", "month");
  }

  return generateDates(currentDate, endDate, "month");
}

module.exports = {
  getDaily,
  getWeekly,
  getMonthly,
  generateDates,
};
