import React from "react";
import { shallow } from "enzyme";
import SubscriptionForm from "./subscriptionForm";

const findByTestId = (component, attribute) => {
  return component.find(`[data-test='${attribute}']`);
};

const simulateInputChange = (wrapper, selector, newValue) => {
  const input = findByTestId(wrapper, selector);
  input.simulate("change", {
    target: {
      value: newValue,
    },
  });
  return findByTestId(wrapper, selector);
};

describe("<SubscriptionForm />", () => {
  it("should render without errors", () => {
    const wrapper = shallow(<SubscriptionForm />);
    const subscriptionForm = findByTestId(wrapper, "subscriptionForm");
    expect(subscriptionForm.length).toBe(1);
  });

  it("should allow me to input an amount", () => {
    const wrapper = shallow(<SubscriptionForm />);
    const amountInput = simulateInputChange(wrapper, "amount", "100");
    expect(amountInput.props().value).toEqual("100");
  });

  it("should allow me to select a type", () => {
    const wrapper = shallow(<SubscriptionForm />);
    const typeInput = simulateInputChange(wrapper, "type", "WEEKLY");
    expect(typeInput.props().value).toEqual("WEEKLY");
  });

  it("should allow me to input a week day if type is equal to 'WEEKLY'", () => {
    const wrapper = shallow(<SubscriptionForm />);
    simulateInputChange(wrapper, "type", "WEEKLY");
    const dayOfWeekInput = simulateInputChange(wrapper, "dayOfWeek", "sunday");
    expect(dayOfWeekInput.props().value).toEqual("sunday");
  });

  it("should allow me to input a month date if type is equal to 'MONTHLY'", () => {
    const wrapper = shallow(<SubscriptionForm />);
    simulateInputChange(wrapper, "type", "MONTHLY");
    const dateOfMonthInput = simulateInputChange(wrapper, "dateOfMonth", "2");
    expect(dateOfMonthInput.props().value).toEqual("2");
  });

  it("should render date picker for start date", () => {
    const wrapper = shallow(<SubscriptionForm />);
    const startDatePicker = findByTestId(wrapper, "startDate");
    expect(startDatePicker.length).toBe(1);
  });

  it("should render date picker for end date", () => {
    const wrapper = shallow(<SubscriptionForm />);
    const endDatePicker = findByTestId(wrapper, "endDate");
    expect(endDatePicker.length).toBe(1);
  });

  it("should render the submit button", () => {
    const wrapper = shallow(<SubscriptionForm />);
    const submitButton = findByTestId(wrapper, "submitButton");
    expect(submitButton.length).toBe(1);
  });
});
