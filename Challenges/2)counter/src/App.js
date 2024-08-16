import { useState } from "react";
import "./styles.css";
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default function App() {
  return (
    <div className="App">
      <Counter></Counter>
    </div>
  );
}
function Counter() {
  const date = new Date();
  let message = "";

  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  function decreaseCount() {
    setCount((c) => c - step);
  }
  function increaseCount() {
    setCount((c) => c + step);
  }
  function decreaseStep() {
    setStep((s) => s - 1);
  }
  function increaseStep() {
    setStep((s) => s + 1);
  }
  if (count < 0) {
    message = `${-count} days ago from today was `;
    date.setDate(date.getDate() + count);
  } else if (count > 0) {
    message = `${count} days from today is `;
    date.setDate(date.getDate() + count);
  } else {
    message = `Today is `;
  }
  
  return (
    <div className="counter">
      <div className="count-box">
        <button onClick={decreaseStep}>-</button>
        <h4>Step: {step}</h4>
        <button onClick={increaseStep}>+</button>
      </div>

      <div className="count-box">
        <button onClick={decreaseCount}>-</button>
        <h4>Count: {count}</h4>
        <button onClick={increaseCount}>+</button>
      </div>

      <div>
        {message}
        {date.getDate()} {daysOfWeek[date.getDay()]} {months[date.getMonth()]}{" "}
        {date.getFullYear()}
      </div>
    </div>
  );
}
