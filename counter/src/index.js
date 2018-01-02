import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'

import Counter from './Counter'
import counterReducer from './reducers/CounterReducer'
import './index.css'

const store = createStore(
  counterReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// testing
// store.subscribe(() => console.log(store.getState()))

const render = () => ReactDOM.render(
  <Counter
    quantity={store.getState()}
    onIncrement={() => store.dispatch({type: 'INCREMENT'})}
    onDecrement={() => store.dispatch({type: 'DECREMENT'})}
    onReset={() => store.dispatch({type: 'RESET'})}
    onSquare={() => store.dispatch({type: 'SQUARE'})}
    onIncreaseByTen={() => store.dispatch({type: 'INCREASE_BY_TEN'})}
    onDecreaseByTen={() => store.dispatch({type: 'DECREASE_BY_TEN'})}
    onFlipSign={() => store.dispatch({type: 'FLIP_SIGN'})}
  />,
  document.getElementById('root')
)

render()
store.subscribe(render)
