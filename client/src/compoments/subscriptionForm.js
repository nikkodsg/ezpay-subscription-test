import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import Input from "./common/input";
import Select from "./common/select";
import DateInput from "./common/dateInput";
import {
  subscriptionTypes,
  subscriptionTypeOptions,
  dayOfWeekOptions,
} from "./subscriptionFormConstants";
import "react-datepicker/dist/react-datepicker.css";
import "./subscriptionForm.css";

class SubscriptionForm extends Component {
  state = {
    amount: "",
    type: "",
    dayOfWeek: "",
    dateOfMonth: "",
    startDate: null,
    endDate: null,
    errors: {},
  };

  clearForm = () => {
    this.setState({
      amount: "",
      type: "",
      dayOfWeek: "",
      dateOfMonth: "",
      startDate: null,
      endDate: null,
    });
  };

  validate = () => {
    const errors = {};
    const {
      amount,
      type,
      dayOfWeek,
      dateOfMonth,
      startDate,
      endDate,
    } = this.state;

    if (amount === "") {
      errors.amount = "Amount is required";
    }
    if (type === "") {
      errors.type = "Type is required";
    }
    if (type === subscriptionTypes.weekly && dayOfWeek === "") {
      errors.dayOfWeek = "Day of the week is required";
    }
    if (type === subscriptionTypes.monthly && dateOfMonth === "") {
      errors.dateOfMonth = "Date of the month is required";
    }
    if (startDate === null) {
      errors.startDate = "Start date is required";
    }
    if (endDate === null) {
      errors.endDate = "End date is required";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  onChangeAmount = (event) => {
    this.setState({ amount: event.target.value });
  };

  onChangeType = (event) => {
    this.setState({
      type: event.target.value,
      dayOfWeek: "",
      dateOfMonth: "",
    });
  };

  onChangeDayOfWeek = (event) => {
    this.setState({ dayOfWeek: event.target.value });
  };

  onChangeDateOfMonth = (event) => {
    this.setState({ dateOfMonth: event.target.value });
  };

  onChangeStartDate = (date) => {
    this.setState({ startDate: date, endDate: null });
  };

  onChangeEndDate = (date) => {
    this.setState({ endDate: date });
  };

  onSubmit = async (event) => {
    event.preventDefault();

    const {
      amount,
      type,
      dayOfWeek,
      dateOfMonth,
      startDate,
      endDate,
    } = this.state;

    const errors = this.validate();
    if (errors !== null) {
      this.setState({ errors });
      return;
    }

    // validation for max subscription (3 months)
    if (moment(endDate).isAfter(moment(startDate).add("3", "months"))) {
      alert(
        "Max subscription duration has been reached. Please limit it up 3 months only."
      );
      return;
    }

    // build the request data
    const data = {
      amount,
      type,
      start: startDate,
      end: endDate,
    };
    if (dayOfWeek) {
      data.dayOfWeek = dayOfWeek;
    }
    if (dateOfMonth) {
      data.dateOfMonth = dateOfMonth;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/subscription",
        data
      );
      alert(JSON.stringify(response.data));
      this.clearForm();
    } catch (ex) {
      if (ex.response.status === 400) {
        alert(ex.response.data.error.message);
      }
    }
  };

  render() {
    const {
      amount,
      type,
      dayOfWeek,
      dateOfMonth,
      startDate,
      endDate,
      errors,
    } = this.state;

    return (
      <div className="subscription-form" data-test="subscriptionForm">
        <h2>Create a subscription</h2>
        <form onSubmit={this.onSubmit}>
          <Input
            name="amount"
            label="Amount"
            value={amount}
            type="number"
            error={errors.amount}
            autoFocus
            onChange={this.onChangeAmount}
            data-test="amount"
          />
          <Select
            name="type"
            label="Type"
            placeholder="Choose a type"
            value={type}
            options={subscriptionTypeOptions}
            error={errors.type}
            onChange={this.onChangeType}
            data-test="type"
          />
          {type === subscriptionTypes.weekly && (
            <Select
              name="dayOfWeek"
              label="Day of the week"
              placeholder="Choose a day"
              value={dayOfWeek}
              options={dayOfWeekOptions}
              error={errors.dayOfWeek}
              onChange={this.onChangeDayOfWeek}
              data-test="dayOfWeek"
            />
          )}
          {type === subscriptionTypes.monthly && (
            <Input
              name="dateOfMonth"
              label="Date of the month"
              value={dateOfMonth}
              type="number"
              error={errors.dateOfMonth}
              onChange={this.onChangeDateOfMonth}
              data-test="dateOfMonth"
            />
          )}
          <DateInput
            name="startDate"
            label="Start date"
            selected={startDate}
            error={errors.endDate}
            onChange={this.onChangeStartDate}
            data-test="startDate"
          />
          <DateInput
            name="endDate"
            label="End date"
            selected={endDate}
            minDate={startDate}
            error={errors.endDate}
            onChange={this.onChangeEndDate}
            data-test="endDate"
          />
          <button
            type="submit"
            className="btn btn-secondary btn-md"
            data-test="submitButton"
          >
            Create
          </button>
        </form>
      </div>
    );
  }
}

export default SubscriptionForm;
