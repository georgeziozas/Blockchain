import { useState } from "react";
export function Counter() {
  const [count, setCount] = useState(0);
  //useState returns an array containing 2 functions.
  //count = value of the state and the setCount = updator of the state.
  //to give our state some default state, we can pass that value at useState constructor.

  return (
    <div>
      <h3>{count}</h3>
      <button onClick={() => setCount(count - 1)}> - </button>
      <button onClick={() => setCount(count + 1)}> + </button>
    </div>
  );
}
