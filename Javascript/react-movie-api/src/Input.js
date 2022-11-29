import { useState } from "react";

export function Input() {
  //to control the input we have to take the value that the user types, store it in state and then we are going to pass that state back to the input as value. So the value that is shown is tha value of the state
  const [inputValue, setInputValue] = useState("");
  return (
    <div>
      <input
        value={inputValue}
        //Basic Example
        //onChange={(e) => setInputValue(e.target.value)}
        onChange={(e) => {
          if (!e.target.value.includes("t")) {
            setInputValue(e.target.value);
          }
        }}
      />
      {inputValue && <h4>YOU TYPED SOMETHING!</h4>}
    </div>
  );
}
