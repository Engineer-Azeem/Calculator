import React from "react";
import "../assets/css/style.css";

function CalculatorButton({ btnValue, btnClass, onClick }) {
  return (
    <>
      <button className={`${btnClass}`} onClick={() => onClick(btnValue)}>
        {btnValue}{" "}
      </button>
    </>
  );
}

export default CalculatorButton;
