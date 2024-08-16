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

  // const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const [range, setRange] = useState(1);
  const [count, setCount] = useState(0);
  function increaseCount() {
    setCount((c) => c + range);
  }
  function decreaseCount() {
    setCount((c) => c - range);
  }
  function handleReset() {
    setCount(0);
    setRange(1);
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
      <input
        type="range"
        min="0"
        max="10"
        value={range}
        onChange={(e) => setRange(Number(e.target.value))}
      />{" "}
      <span>{range}</span>
      {console.log(range)}
      <div className="count-box">
        <button onClick={decreaseCount}>-</button>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={increaseCount}>+</button>
      </div>
      <div>
        {message}
        {date.getDate()} {daysOfWeek[date.getDay()]} {months[date.getMonth()]}{" "}
        {date.getFullYear()}
      </div>
      {count > 0 ? <button onClick={handleReset}>Reset</button> : ""}
    </div>
  );
}
