const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'RESET':
      return 0
    case 'SQUARE':
      return state * state
    case 'INCREASE_BY_TEN':
      return state + 10
    case 'DECREASE_BY_TEN':
      return state - 10
    case 'FLIP_SIGN':
      return state * -1
    default:
      return state
  }
}

export default counterReducer
