import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App(){
  const[step,setStep]=useState(1)
  const[isOpen,setOpen]=useState(true)
  function handlePrevious(){
    step>1 && setStep(s=>s-1)
  }
  function handleNext(){
    step<3 && setStep(s=>s+1)
  }
  return (
      <>
      <div className="close" onClick={()=>setOpen(is=>!is)}>&#10006;</div>
      {isOpen &&
      <div className="steps">
        <div className="numbers">
          <div className={`${step>=1?"active":""}`}>1</div>
          <div className={`${step>=2?"active":""}`}>2</div>
          <div className={`${step>=3?"active":""}`}>3</div>
        </div>
        <p className="message">Step {step}: {messages[step-1]}</p>
        <div className="buttons">
          <Button bgColor="#7950f2" textColor="#fff" clickEvent={handlePrevious}>
            <span>👈</span>Previous
          </Button>
          <Button bgColor="#7950f2" textColor="#fff" clickEvent={handleNext}>
            Previous<span>👉</span>
          </Button>
        </div>
      </div>}
      </>
      )
}
function Button({bgColor,textColor,clickEvent,children}){
  return <div>
    <button style={{backgroundColor:bgColor,color:textColor}}
     onClick={clickEvent}>{children}</button>
  </div>
}