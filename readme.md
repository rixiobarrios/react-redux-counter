# Counter in React Redux

## Setup

```bash
 $ git clone git@github.com:ga-wdi-exercises/react-redux-counter.git
 $ cd react-redux-counter/counter
 $ npm install
 $ atom .
 $ npm start
```
If you don't use Atom, substitute the 4th command for your preferred text editor. Take a minute to look over the project.

## Building the Counter Component

Our Counter component will not have a `state` in the like that we have seen so far.  and is just going to display a single value that it will receive as `props`. It will be purely a display component; these are sometimes referred to as dumb components or as functional components.

We're going to convert counter from being a class component to a functional component.

A functional component is a component this is defined with a ***function*** instead of a class.
As you might guess, a class component is a component defined by a ***class***.

If a component will be **stateless**, React guidelines recommend using a ***functional component***.
If the component will have a *`state`*, it should be defined by a ***class***.


> in `src/Counter.js`:

```js
import React from 'react'

const Counter = (props) => {
  let quantity = 0
  return (
    <div>
      Quantity: {quantity}
      <button>+</button>
      <button>-</button>
    </div>
  );
}

export default Counter;
```

In this case, our Counter component is just going to display a single value that it receives as `props`, and also receive two functions which will trigger `actions` in the `store`, via the `reducer`.

For now the value of `quantity` is defined in a variable local to the component. We're kind of faking local state here with `let quantity = 0`. We're going to replace the placeholder `0` with `this.props.quantity`, once we set up this component to retrieve `props` from the `store`.

## Adding Reducers

Reducers essentially 'decide' which action to apply to a state.
Reducers take the form of pure functions, and take two arguments: an action and a state.

An `action` in Redux is actually a description of a type of change, rather than the change itself. Almost always, an action will be a plain, Javascript object.

In this example we're going to use a number as the state. The reason for this is that our app is ridiculously simple so far.

The extreme simplicity of this app allows us to see how redux operates on a basic level. When we build a shopping cart in the next exercise, we will use plain Javascript objects for our actions.

```bash
 $ mkdir src/reducers
 $ touch src/reducers/CounterReducer.js
```

> in `src/reducers.js`:

```js
export default (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
```

Switch statements are ideal for checking for **multiple possible values** of ***a single variable or reference***.
They are favored over if-else conditional blocks because they read more cleanly, and almost always involve fewer keystrokes (`freeTime++`).
Using `switch` spares us from having to write something this, which is functionally identical to the above:

```js

if (action.type === "INCREMENT") {
  return state + 1
} else if (action.type === "DECREMENT") {
  return state - 1
} else {
  return state
}
```  

The switch statement ends up lining up better than its if-else counterpart, and is more uniform in its display.
We don't have to specify the same value over and over again in `else if` statements.
It also has fewer symbols and takes less effort to type.
This seems like a win across the board, though they might feel strange at first if you aren't used to writing them.


## The Container

Containers are components that contain business logic, doing more than just displaying something.
We're not going to introduce a separate container component, but we're going to treat `index.js` as our container.
This practice is far from ideal, but in the next exercise (shopping cart), we will observe React conventions more faithfully.

Let's finally install redux in our project!

```bash
 $ npm install -S redux
```

Then add the following to `index.js`

> in `index.js`:

```js
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

// We have to wrap ReactDOM.render in a callback to pass to store.subscribe()
// When the store dispatches a new action, render will be called and ReactDOM.render will be triggered
const render = () => ReactDOM.render(
  <Counter
    quantity={store.getState()}
    onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
    onDecrement={() => store.dispatch({ type: 'DECREMENT' })} />,
  document.getElementById('root')
)

render()
store.subscribe(render)
```

Redux is managing our application's state via the store.
Since that is the case, we're going to be obtaining the quantity from the store via `getState`.
We are then passing information about the application's state from the store into Counter as `props`.


## Finalizing our Counter Component

```js
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
```

### Adding in Integration with Redux Dev Tools
[Documentation](https://github.com/zalmoxisus/redux-devtools-extension#1-with-redux)

> in `index.js`:

```js
const store = createStore(
  counterReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
```
