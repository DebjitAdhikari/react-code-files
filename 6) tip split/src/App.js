import {useState} from "react"
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App(){
  const [isOpen,setOpen]=useState(false)
  const [allFriends,setAllfriends]=useState(initialFriends)
  const [selectedFriend,setSelectedFriend]=useState(null)
  
  function handleFormOpen(){
    setOpen(is=>!is)
  }
  function handleAddFriends(data){
    setAllfriends((friends)=>[...friends,data])
    setOpen(false)
  }
  function handleSelection(friend){
    setOpen(false)// hides the adding friend form
    setSelectedFriend(cur=>cur?.id===friend.id?null:friend)//have to use ? other wise it cant read the properties of the null
  }
  function handleSplitAmount(amount){
    console.log(amount)
    setAllfriends(allFriends.map(friend=>friend.id===selectedFriend.id?{...friend,balance:friend.balance+=amount}:friend))
    setSelectedFriend(null)
  }
  return <div className="app">
    <div className="sidebar">
      
      <FriendList allFriends={allFriends} selectedFriend={selectedFriend} onSelectFriend={handleSelection}></FriendList>

      {
        isOpen&&<FriendForm handleAddFriends={handleAddFriends}></FriendForm>
      }
      
      <Button clickEvent={handleFormOpen}>
        {
          isOpen?"Close":"Add new friend"
        }
      </Button>
    </div>
    {
      selectedFriend && <SplitBillForm friend={selectedFriend} onSplitBill={handleSplitAmount} key={selectedFriend.id}></SplitBillForm>
    }
  </div>
}
function FriendList({allFriends,onSelectFriend,selectedFriend}){
  
  return <ul>
    {
      allFriends.map(friend=><Friend friend={friend} onSelectFriend={onSelectFriend}
       selectedFriend={selectedFriend} key={friend.id}></Friend>)
    }
  </ul>
}
function Friend({friend,onSelectFriend,selectedFriend}){
  const isSame = selectedFriend && friend.id===selectedFriend.id
  return <li className={isSame?"selected":""}>
    <img src={friend.image} alt={friend.name}></img>
    <h3>{friend.name}</h3>
    {
      friend.balance > 0 ? <p className="green">{friend.name} owes you $ {friend.balance}</p>:""
    }
    {
      friend.balance < 0 ? <p className="red">You owe {friend.name} $ {Math.abs(friend.balance)}</p>:""
    }
    {
      friend.balance === 0 ? <p className="">You and {friend.name} are even</p>:""
    }
    <Button clickEvent={()=>onSelectFriend(friend)}>
      {
        isSame?"Close":"Select"
      }
      </Button>
  </li>
}
function Button({children,clickEvent}){
  return <button className="button" onClick={clickEvent}>
      {children}
    </button>
}
function FriendForm({handleAddFriends}){
  const [name,setName]=useState("")
  const [imgUrl,setUrl]=useState("https://i.pravatar.cc/48")
  function handleSubmit(e){
    e.preventDefault()
    if(!name|| !imgUrl)return
    
    const id=crypto.randomUUID()
    const newFriend={
      name,
      image:`${imgUrl}?img=${id}`,
      balance:0,
      id
    }
    setName("")
    handleAddFriends(newFriend)
  }
  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <label>👒Name:</label>
    <input value={name} onChange={(e)=>setName(e.target.value)}></input>
    <label>🏞️Img url:</label>
    <input value={imgUrl} onChange={(e)=>setUrl(e.target.value)}></input>
    <Button>Add</Button>
  </form>
}

function SplitBillForm({friend,onSplitBill}){
  const [bill,setBill]=useState("")
  const [myExpanse,setMyExpanse]=useState("")
  const [whoIsPaying,setWhoIsPaying]=useState("user")

  const friendExpanse=bill-myExpanse

  function handleSubmit(e){
    e.preventDefault()
    // whoIsPaying==="user"?friend.balance+=friendExpanse:friend.balance-=myExpanse
    if (!bill||!myExpanse) return
    onSplitBill(whoIsPaying==="user"?friendExpanse:-myExpanse)
  }
  return <form className="form-split-bill" onSubmit={handleSubmit} >
  <h2>Split a bill with {friend.name}</h2>
  <label>💶Bill value:</label>
  <input type="number" value={bill} onChange={(e)=>setBill(Number(e.target.value))}></input>
  <label>🧑‍🦰Your expense:</label>
  <input type="number" value={myExpanse} onChange={(e)=>setMyExpanse(Number(e.target.value)>bill?myExpanse:Number(e.target.value))}></input>
  <label>👤{friend.name}'s expense:</label>
  <input type="number" disabled value={friendExpanse}></input>
  <label>🤑Who is paying the Bill: </label>
  <select value={whoIsPaying} onChange={(e)=>setWhoIsPaying(e.target.value)}>
    <option value="user">You</option>
    <option value="friend">{friend.name}</option>
  </select>
  <Button>Split</Button>
</form>
}