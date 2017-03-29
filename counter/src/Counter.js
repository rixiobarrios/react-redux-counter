import React, { Component } from 'react';

const Counter = (props) =>{
    return (
      <div>
        Quantity: {props.quantity}
        <button onClick={props.onIncrement}>+</button>
        <button onClick={props.onDecrement}>-</button>
      </div>
    );
}

export default Counter;
