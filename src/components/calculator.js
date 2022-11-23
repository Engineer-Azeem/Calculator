import React, { useState, useEffect } from "react";
import CalculatorButton from "./calculatorButton";
import "../App.css";
import "../assets/css/style.css";

function Calculator() {
  const [prevValue, setPrevValue] = useState("");
  const [nextValue, setNextValue] = useState("");
  const [nextDigit, setNextDigit] = useState("");
  const [operation, setOperation] = useState(null);
  const [calculation, setCalculation] = useState("");
  const [lastOperation, setLastOperation] = useState(null);
  const [clickEqualButton, setClickEqualButton] = useState(false);
  const [clickPercentageButton, setClickPercentageButton] = useState(false);
  const [lastBeforePercentagevalue, setLastBeforePercentagevalue] =
    useState("");
  const [singleOperationCalculation, setSingleOperationCalculation] =
    useState("");

  useEffect(() => {}, [operation, nextValue, prevValue]);

  const handleClear = () => {
    setPrevValue("");
    setNextValue("");
    setNextDigit("");
    setCalculation("");
    setSingleOperationCalculation("");
    setLastOperation(null);
    setClickEqualButton(false);
    setClickPercentageButton(false);
    setLastBeforePercentagevalue("");
    setOperation(null);
  };

  const isNewInputs = () => {
    setTimeout(() => {
      if (singleOperationCalculation !== "") {
        handleClear();
      }
      if (calculation !== "") {
        handleClear();
      }
    }, 1);
  };

  const appendNumber = (value) => {
    if (value === "." && nextValue.includes(".")) {
      return;
    }
    setNextValue(nextValue.toString() + value);
    if (operation != null) {
      setNextDigit(nextDigit.toString() + value);
    }
  };

  const handleNumber = (value) => {
    isNewInputs();
    appendNumber(value);
  };

  const handleDelete = (value) => {
    if (nextValue === "") {
      return;
    }
    if (clickEqualButton === true) {
      if (lastOperation === "-" || lastOperation === "÷") {
        setTimeout(() => {
          let temp = prevValue.toString().slice(0, -1);
          setPrevValue(nextValue);
          setNextValue(temp);
        }, 100);
      }
      setTimeout(() => {
        setOperation(null);
        setPrevValue("");
        setClickEqualButton(false);
      }, 100);
    }
    if (clickPercentageButton === true) {
      setTimeout(() => {
        setClickPercentageButton(false);
      }, 100);
      setTimeout(() => {
        setNextValue(lastBeforePercentagevalue);
      }, 100);
      setTimeout(() => {
        setLastBeforePercentagevalue("");
      }, 100);
    } else {
      setNextValue(nextValue.toString().slice(0, -1));
    }
  };

  const calculationProcess = (prev, operation, current) => {
    let computation = "";
    switch (operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        break;
    }
    return computation;
  };

  const computeResult = () => {
    let computation;
    const prev = parseFloat(prevValue);
    const current = parseFloat(nextValue);
    if (isNaN(prev) || isNaN(current)) {
      return;
    }
    computation = calculationProcess(prev, operation, current);
    if (computation === "") {
      return;
    }
    setTimeout(() => {
      setOperation(null);
      setPrevValue("");
      setNextValue(computation);
    }, 100);
  };

  const handlePercentage = (value) => {
    // for percentage handler
    calculatePercentage(value);
    console.log("handlePercentage");
  };

  const calculatePercentage = (value) => {
    if (prevValue !== "") {
      let computation;
      const prev = parseFloat(prevValue);
      const current = parseFloat(nextValue);
      const percent = current / 100;
      const getPercent = percent * prev;
      if (isNaN(prev) || isNaN(current)) {
        return;
      }
      computation = calculationProcess(prev, operation, getPercent);
      if (computation === "") {
        return;
      }
      setTimeout(() => {
        setCalculation(computation);
      }, 100);
      setTimeout(() => {
        setOperation(null);
        setPrevValue("");
        setNextValue(computation);
      }, 100);
    } else {
      if (nextValue === "") {
        return "";
      }
      if (singleOperationCalculation !== "") {
        return;
      }

      setTimeout(() => {
        setClickPercentageButton(true);
      }, 100);

      setTimeout(() => {
        setOperation(null);
        setPrevValue("");
        setNextValue(nextValue / 100);
      }, 100);
      setTimeout(() => {
        setLastBeforePercentagevalue(nextValue);
      }, 100);

      setTimeout(() => {
        setSingleOperationCalculation(nextValue);
      }, 100);
    }
  };

  const computeResultWithSamevalue = () => {
    setClickEqualButton(true);
    let computation;
    const prev = parseFloat(prevValue);
    const current = parseFloat(nextValue);
    const lastInsertCurrent = parseFloat(nextDigit);
    if (isNaN(prev) || isNaN(current)) {
      return;
    }
    computation = calculationProcess(prev, operation, current);
    setTimeout(() => {
      setLastOperation(operation);
      setCalculation(computation);
    }, 100);
    if (computation === "") {
      return;
    }
    if (operation === "-" || operation === "÷") {
      setTimeout(() => {
        setPrevValue(computation);
        setNextValue(lastInsertCurrent);
      }, 100);
    } else {
      setTimeout(() => {
        setPrevValue(lastInsertCurrent);
        setNextValue(computation);
      }, 100);
    }
  };

  const handleOperator = (operator) => {
    //for operator reselect
    if (nextValue === "" && operation !== operator) {
      setTimeout(() => {
        setOperation(operator);
      }, 100);
      return;
    }
    // if equal button is pressed
    if (clickEqualButton === true) {
      if (lastOperation === "-" || lastOperation === "÷") {
        setTimeout(() => {
          let temp = prevValue;
          setPrevValue(nextValue);
          setNextValue(temp);
        }, 10);
      }
      setPrevValue("");
      setClickEqualButton(false);
    }
    if (singleOperationCalculation !== "") {
      setSingleOperationCalculation("");
    }
    if (calculation !== "") {
      setCalculation("");
    }
    if (nextDigit !== "") {
      setNextDigit("");
    }
    if (nextValue === "") {
      return;
    }
    // && clickEqualButton === false
    if (prevValue !== "" ) {
      computeResult();
    }

    setTimeout(() => {
      setOperation(operator);
      setPrevValue(nextValue);
      setNextValue("");
    }, 100);
    
  };

  const handleEqual = (value) => {
    computeResultWithSamevalue();
  };

  const handleSquare = (value) => {
    //for Square handler
    calculateSquare(value);
    console.log("square", value);
  };

  const calculateSquare = (value) => {
    if (prevValue !== "") {
      let computation;
      const prev = parseFloat(prevValue);
      const current = parseFloat(nextValue);
      const square = nextValue * nextValue;
      if (isNaN(prev) || isNaN(current)) {
        return;
      }
      computation = calculationProcess(prev, operation, square);
      if (computation === "") {
        return;
      }
      setTimeout(() => {
        setCalculation(computation);
      }, 100);
      setTimeout(() => {
        setOperation(null);
        setPrevValue("");
        setNextValue(computation);
      }, 100);
    } else {
      if (nextValue === "") {
        return "";
      }
      if (singleOperationCalculation !== "") {
        return;
      }

      setTimeout(() => {
        setOperation(null);
        setPrevValue("");
        setNextValue(nextValue * nextValue);
      }, 100);

      setTimeout(() => {
        setSingleOperationCalculation(nextValue);
      }, 100);
    }
  };

  const handleCube = (value) => {
    calculateCube(value);
    console.log("cube", value);
  };

  const calculateCube = (value) => {
    if (prevValue !== "") {
      let computation;
      const prev = parseFloat(prevValue);
      const current = parseFloat(nextValue);
      const cube = nextValue * nextValue * nextValue;
      if (isNaN(prev) || isNaN(current)) {
        return;
      }

      computation = calculationProcess(prev, operation, cube);
      if (computation === "") {
        return;
      }
      setTimeout(() => {
        setCalculation(computation);
      }, 100);
      setTimeout(() => {
        setOperation(null);
        setPrevValue("");
        setNextValue(computation);
      }, 100);
    } else {
      if (nextValue === "") {
        return "";
      }
      if (singleOperationCalculation !== "") {
        return;
      }

      setTimeout(() => {
        setOperation(null);
        setPrevValue("");
        setNextValue(nextValue * nextValue * nextValue);
      }, 100);

      setTimeout(() => {
        setSingleOperationCalculation(nextValue);
      }, 100);
    }
  };

  const handleSquareRoot = (value) => {
    calculateSquareRoot(value);
    console.log("squareRoot", value);
  };

  const calculateSquareRoot = () => {
    if (prevValue !== "") {
      let computation;
      const prev = parseFloat(prevValue);
      const current = parseFloat(nextValue);
      const squareRoot = Math.sqrt(nextValue);
      if (isNaN(prev) || isNaN(current)) {
        return;
      }

      computation = calculationProcess(prev, operation, squareRoot);
      if (computation === "") {
        return;
      }
      setTimeout(() => {
        setCalculation(computation);
      }, 100);
      setTimeout(() => {
        setOperation(null);
        setPrevValue("");
        setNextValue(computation);
      }, 100);
    } else {
      if (nextValue === "") {
        return "";
      }
      if (singleOperationCalculation !== "") {
        return;
      }

      setTimeout(() => {
        setOperation(null);
        setPrevValue("");
        setNextValue(Math.sqrt(nextValue));
      }, 100);

      setTimeout(() => {
        setSingleOperationCalculation(nextValue);
      }, 100);
    }
  };

  const btnData = [
    {
      name: "CLEAR",
      class: "green-color  span-two",
      functionName: handleClear,
    },
    {
      name: "DELETE",
      class: "red-color  span-two",
      functionName: handleDelete,
    },
    {
      name: "%",
      class: "purple-color",
      functionName: handlePercentage,
    },
    {
      name: "1",
      class: "",
      functionName: handleNumber,
    },
    {
      name: "2",
      class: "",
      functionName: handleNumber,
    },
    {
      name: "3",
      class: "",
      functionName: handleNumber,
    },
    {
      name: "+",
      class: "purple-color",
      functionName: handleOperator,
    },
    {
      name: "÷",
      class: "purple-color",
      functionName: handleOperator,
    },

    {
      name: "4",
      class: "",
      functionName: handleNumber,
    },
    {
      name: "5",
      class: "",
      functionName: handleNumber,
    },
    {
      name: "6",
      class: "",
      functionName: handleNumber,
    },
    {
      name: "*",
      class: "purple-color",
      functionName: handleOperator,
    },
    {
      name: "-",
      class: "purple-color",
      functionName: handleOperator,
    },
    {
      name: "7",
      class: "",
      functionName: handleNumber,
    },
    {
      name: "8",
      class: "",
      functionName: handleNumber,
    },
    {
      name: "9",
      class: "",
      functionName: handleNumber,
    },
    {
      name: "=",
      class: "span-two grey-color",
      functionName: handleEqual,
    },

    {
      name: ".",
      class: "",
      functionName: handleNumber,
    },
    {
      name: "0",
      class: "",
      functionName: handleNumber,
    },
    {
      name: "x²",
      class: "orange-color",
      functionName: handleSquare,
    },

    {
      name: "x³",
      class: "orange-color",
      functionName: handleCube,
    },
    {
      name: "√",
      class: "orange-color",
      functionName: handleSquareRoot,
    },
  ];

  return (
    <>
      <div className="calculator-grid">
        <div className="output">
          <div data-previous-record className="previous-record-operand"></div>
          {clickEqualButton ? (
            <>
              {operation === "-" || operation === "÷" ? (
                <>
                  <div data-current-operand className="current-operand">
                    {prevValue}
                  </div>{" "}
                </>
              ) : (
                <>
                  <div data-current-operand className="current-operand">
                    {nextValue}
                  </div>{" "}
                </>
              )}
            </>
          ) : (
            <>
              <div data-previous-operand className="previous-operand">
                {prevValue} {operation}
              </div>
              <div data-current-operand className="current-operand">
                {nextValue}
              </div>
            </>
          )}
        </div>
        {btnData.map((data, index) => {
          return (
            <CalculatorButton
              key={index}
              btnValue={data.name}
              btnClass={data.class}
              onClick={data.functionName}
            />
          );
        })}
      </div>
    </>
  );
}

export default Calculator;
