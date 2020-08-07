const router = require("express").Router();
const moment = require("moment");
const { getDaily, getWeekly, getMonthly } = require("./invoiceDatesGenerator");
const subscriptionTypes = require("./subscriptionTypes");

router.post("/subscription", (req, res) => {
  const { amount, type, dayOfWeek, dateOfMonth, start, end } = req.body;
  let invoiceDates = [];

  // validation for max subscription (3 months)
  if (moment(end).isAfter(moment(start).add("3", "months"))) {
    res.status(400).send({
      error: {
        message:
          "Max subscription duration has been reached. Please limit it up 3 months only.",
      },
    });
  }

  const startDate = moment(start);
  const endDate = moment(end);

  if (type === subscriptionTypes.daily) {
    invoiceDates = getDaily(startDate, endDate);
  } else if (type === subscriptionTypes.weekly) {
    invoiceDates = getWeekly(dayOfWeek, startDate, endDate);
  } else if (type === subscriptionTypes.monthly) {
    invoiceDates = getMonthly(parseInt(dateOfMonth), startDate, endDate);
  }

  res.send({
    amount,
    type,
    invoiceDates,
  });
});

module.exports = router;
