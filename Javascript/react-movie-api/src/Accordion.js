import { useState } from "react";
export function Accordion() {
  const [isToggled, setIsToggled] = useState(false);

  const showMe = isToggled ? <h3>Show Me</h3> : null;
  return (
    <div>
      {/* WAY 1:   isToggled && <h3>Show Me</h3>*/}
      {/* WAY 2:   isToggled ? <h3>Show Me</h3> : null*/}
      {/* WAY 3:   showMe                             */}
      {showMe}
      <button onClick={() => setIsToggled(!isToggled)}>Toggle</button>
    </div>
  );
}
