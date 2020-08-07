import React from "react";
import DatePicker from "react-datepicker";
import InputError from "./inputError";

const DateInput = ({ name, label, error, onChange, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor="endDate">{label}</label>
      <div>
        <DatePicker
          id={name}
          className="form-control"
          onChange={onChange}
          {...rest}
        />
        <InputError message={error} />
      </div>
    </div>
  );
};

export default DateInput;
