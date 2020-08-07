export const subscriptionTypes = {
  daily: "DAILY",
  weekly: "WEEKLY",
  monthly: "MONTHLY",
};

export const subscriptionTypeOptions = [
  {
    id: 1,
    label: "Daily",
    value: subscriptionTypes.daily,
  },
  {
    id: 2,
    label: "Weekly",
    value: subscriptionTypes.weekly,
  },
  {
    id: 3,
    label: "Monthly",
    value: subscriptionTypes.monthly,
  },
];

export const dayOfWeekOptions = [
  {
    label: "Sunday",
    value: "sunday",
  },
  {
    label: "Monday",
    value: "monday",
  },
  {
    label: "Tuesday",
    value: "tuesday",
  },
  {
    label: "Wednesday",
    value: "wednesday",
  },
  {
    label: "Thursday",
    value: "thursday",
  },
  {
    label: "Friday",
    value: "friday",
  },
  {
    label: "Saturday",
    value: "saturday",
  },
];

export default {
  subscriptionTypes,
  subscriptionTypeOptions,
  dayOfWeekOptions,
};
