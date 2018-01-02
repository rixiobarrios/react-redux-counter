import React from 'react'

const Counter = (props) => {
  let quantity = 0
  render() {
    return (
      <div>
        Quantity: {quantity}
        <button>+</button>
        <button>-</button>
      </div>
    )
  }
}

export default Counter
