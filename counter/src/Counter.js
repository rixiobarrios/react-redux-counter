import React from 'react'

const Counter = (props) => {
  return (
    <div>
      Quantity: {props.quantity}
      <br />
      <button onClick={props.onIncrement}>+</button>
      <button onClick={props.onDecrement}>-</button>
      <button onClick={props.onReset}>Reset</button>
      <button onClick={props.onSquare}>Square</button>
      <button onClick={props.onIncreaseByTen}>+ 10</button>
      <button onClick={props.onDecreaseByTen}>- 10</button>
      <button onClick={props.onFlipSign}>-/+</button>
    </div>
  )
}

export default Counter
