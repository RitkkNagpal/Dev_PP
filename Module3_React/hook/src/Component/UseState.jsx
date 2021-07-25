import React, { useState } from "react";
const UseState = () => {
  const [count, setCount] = useState(1);
  const [color, setColor] = useState("blue");
  // use state returns an array having two elements one is the passed state and second one is the one which changes it's value
  // if want to pass two things in the state we may pass an object
  // Example :-
  //  const[state,setState] = {count : 1 , color : "blue"}
  // to access this we will use the dot operator '(.)'
  // like setState(state.count + 1) etc

  const decrement = () => {
    setCount((prevValue) => {
      return prevValue - 1;
    });
    setColor("red");
  };
  return (
    <div>
      <p>{count}</p>
      <p>{color}</p>
      <button
        onClick={() => {
          setCount(count + 1);
          setColor("yellow");
        }}
      >
        +
      </button>
      <button onClick={decrement}>-</button>
    </div>
  );
};

export default UseState;
