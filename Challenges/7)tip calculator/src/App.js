import { useState } from "react"
const tipDetails=[
  {description:"Dissatisfied",amount:0},
  {description:"It was okay",amount:5},
  {description:"It was good",amount:10},
  {description:"It was amazing!",amount:20},
]
export default function App(){
  const [bill,setBill]=useState(0)  

  const [mytip,setMytip]=useState(0)

  const [friendtip,setFriendtip]=useState(0)
  
  const tips = bill*((mytip+friendtip)/2)/100
  function reset(){
    setMytip(0)
    setFriendtip(0)
    setBill(0)
  }
  return <div>
      <Bill bill={bill} handleBill={setBill}></Bill>
      <TipsBill tips={mytip} onTipChange={setMytip}>How did you like the Service?</TipsBill>
      <TipsBill tips={friendtip} onTipChange={setFriendtip}>How did your friend like the Service?</TipsBill>
      <Totalbill bill={bill} tips={tips}></Totalbill>
      {
        bill>0||mytip>0||friendtip>0?<button onClick={reset}>Reset</button>:""
      }
  </div>
}

function TipsBill({children, tips,onTipChange}){
  
  return <div>
    <label>{children}</label>
    <select value={tips} onChange={(e)=>onTipChange(Number(e.target.value))}>
      {
        tipDetails.map(tip=><option value={tip.amount} key={tip.amount}>{tip.description} ({tip.amount}%)</option>)
      }
    </select>
  </div>
}

function Bill({bill,handleBill}){
  function onBillChange(e){
    handleBill(Number(e.target.value))
  }
  return <div>
    <label>What is your bill?</label>
    <input value={bill} type="number" onChange={onBillChange}></input>
  </div>
}

function Totalbill({bill,tips}){
  return <div>
    <h1>you have to pay ${bill+tips} (${bill} + ${tips} tip)</h1>
  </div>
}