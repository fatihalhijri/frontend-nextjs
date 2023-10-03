import { useState } from "react";

export const Calcu = () => {
    const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit:any) => {
    if (waitingForSecondOperand) {
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };
  

  const clearDisplay = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator:any) => {
    const inputValue = parseFloat(displayValue);

    if (operator && firstOperand && !waitingForSecondOperand) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    } else {
    //   setFirstOperand(inputValue);
    }

    setOperator(nextOperator);
    setWaitingForSecondOperand(true);
  };

  const calculate = (firstOperand:any, secondOperand:any, operator:any) => {
    if (operator === '+') {
      return firstOperand + secondOperand;
    }
    if (operator === '-') {
      return firstOperand - secondOperand;
    }
    if (operator === '*') {
      return firstOperand * secondOperand;
    }
    if (operator === '/') {
      return firstOperand / secondOperand;
    }
    return secondOperand;
  };
};
