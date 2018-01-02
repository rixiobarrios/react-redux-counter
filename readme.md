# Counter in React Redux

## Setup

```bash
 $ git clone git@git.generalassemb.ly:ga-wdi-exercises/react-redux-counter.git
 $ cd react-redux-counter/counter
 $ npm install
 $ atom .
 $ npm start
```
If you don't use Atom, substitute the 4th command for your preferred text editor. Take a minute to look over the project.

## Building the Counter Component

Our Counter component will not have a `state` in the likes that we have seen so far.  It is just going to display a single value that it will receive as `props`. It will be purely a display component; these are sometimes referred to as dumb components or as functional components.

We're going to convert counter from being a class component to a functional component.

A functional component is a component this is defined with a ***function*** instead of a class.
As you might guess, a class component is a component defined by a ***class***.

If a component will be **stateless**, React guidelines recommend using a ***functional component***.
If the component will have a **state**, it should be defined by a ***class***.


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

Our Counter component is going to display a single value that it receives through `props`.  Counter will also receive two functions through `props` which will trigger `actions` in the `store`, via the `reducer`.

For now the value of `quantity` is defined in a variable local to the component.  We're kind of faking local state here with `let quantity = 0`. We're going to replace the placeholder `0` with `this.props.quantity`, once we set up this component to retrieve `props` from the `store`.

## Adding Reducers

Reducers essentially 'decide' which action to apply to a state.
Reducers take the form of pure functions, and take two arguments: an ***action*** and a ***state***.

An `action` in Redux is actually a *description of a change*, rather than the change itself.  An action will be a plain Javascript object.

In this example we're going to use a number for our state. This is because our app is very simple so far.  
The simplicity of this app allows us to see how redux operates on a basic level.  When our apps become more complex, we will use objects or arrays to express our state.

```bash
 $ mkdir src/reducers
 $ touch src/reducers/CounterReducer.js
```

> in `src/reducers/CounterReducer.js`:

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

Switch statements are ideal for checking **multiple possible values** of ***a single variable or reference***.
They are favored over `if-else` conditional blocks in redux because they read more cleanly, and usually involve fewer keystrokes (`freeTime++`).
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

The switch statement ends up lining up better than its `if else` counterpart, and is more uniform in its display.  We don't have to specify the same value over and over again like we do in `if else` statements.


## The Container

Containers are components that contain business logic, doing more than just displaying something.  They often serve to pass down data and functionality to presentation components.  
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
  counterReducer
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

## Bonus!

Try to implement a few of these other features in your Counter app using the Redux architecture.  

- A button that ***resets*** counter to zero
- A button that ***squares*** the current number.
- Buttons that ***increase/decrease by 10***
- Buttons that ***increase/decrease by custom amount*** read from an input field on the page.  
> Note: to truly implement this last bonus in proper redux fashion, you will need to change how state is stored, from a number to an object.  This object would hold the current amount as well as the amount to increase/decrease by.  To begin with, you can just read the value of the input field from the DOM.  Once you get that working, try to store the custom rate as part of state.  
