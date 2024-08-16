import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react"

function App() {
  const [advice,setAdvice]=useState("")
  const [count,setCount]=useState(0)
  async function getAdvice(){
    const res=await fetch ("https://api.adviceslip.com/advice")
    const data= await res.json()
    // console.log(data.slip.advice)
    setAdvice(data.slip.advice)
    setCount(count+1)
  }
  useEffect(function(){
    getAdvice()
  },[])
  return (
    <div>
      <div>
      {advice}
      </div>
      <button onClick={getAdvice}>Get advice</button>
      <Message count={count}></Message>
    </div>
  );
}
function Message(props){
  return <div>
        You have known {props.count} advices
      </div>
}

export default App;
