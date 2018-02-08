// @flow weak

import React              from 'react';
import PropTypes          from 'prop-types';
import CounterButton from "./counterButton/CounterButton";

const Counter = ({
  value,
  handleIncrement,
  handleDecrement,
  handleDoubleAsync
})=>{
  return (
    <div>
      <h1>{value}</h1>
      <CounterButton name="Increment" onClick={handleIncrement} color="success"/>&nbsp;&nbsp;
      <CounterButton name="Decrement" onClick={handleDecrement} color="danger"/>&nbsp;&nbsp;
      <CounterButton name="Double Async" onClick={handleDoubleAsync} color="primary"/>
    </div>
  );
};

Counter.propTypes = {
  value:                PropTypes.number.isRequired,
  handleIncrement:      PropTypes.func.isRequired,
  handleDecrement:      PropTypes.func.isRequired,
  handleDoubleAsync:    PropTypes.func.isRequired
};

Counter.defaultProps = {
  value:                0
};

export default Counter;
