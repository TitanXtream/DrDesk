import React, { useRef, useState } from "react";

const InputBar = ({ type, label, name, required = false }) => {
  const inputRef = useRef(null);

  const managelabel = (type) => {
    const inputBar = inputRef.current;
    if (type === "focus") {
      inputBar.classList.add("active");
    }
    if (type === "blur") {
      inputBar.value === "" && inputBar.classList.remove("active");
    }
  };
  return (
    <div className="input-wrap">
      <input
        type={type}
        ref={inputRef}
        name={name}
        id={name}
        onFocus={() => managelabel("focus")}
        onBlur={() => managelabel("blur")}
        minLength="4"
        className="input-field"
        required={required}
      />
      <label htmlFor={name} className="input_label">
        {label}
      </label>
    </div>
  );
};

export default InputBar;
