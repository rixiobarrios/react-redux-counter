import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

import Counter from './Counter'
import counterReducer from './reducers/CounterReducer'

import './index.css'

const store = createStore(
  counterReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const render = () => ReactDOM.render(
  <Counter
    quantity={store.getState()}
    onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
    onDecrement={() => store.dispatch({ type: 'DECREMENT' })} />,
  document.getElementById('root')
)

render()
store.subscribe(render)
