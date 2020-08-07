import React from "react";
import InputError from "./inputError";

const Input = ({ name, label, type, value, error, onChange, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className="form-control"
        name={name}
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
      />
      <InputError message={error} />
    </div>
  );
};

export default Input;
