import React, { useState } from 'react';
import './styles.css';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState(null);

  const handleClick = (value) => {
    if (value === 'C') {
      setDisplay('');
      setResult(null);
    } else if (value === '=') {
      try {
        setResult(eval(display));
      } catch (e) {
        setResult('Error');
      }
    } else {
      setDisplay(display + value);
    }
  };

  return (
    <div className="calculator">
      <div className="display">{result !== null ? result : display}</div>
      <div className="buttons">
        {['C', '/', '*', '-', 7, 8, 9, '+', 4, 5, 6, '=', 1, 2, 3, 0, '.', '(', ')'].map((item) => (
          <button key={item} onClick={() => handleClick(item.toString())}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
