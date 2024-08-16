import { useState } from "react";

export default function App(){
  const [items,setItems]=useState([])

  function addingItems(newItem){
    setItems(items=>[...items,newItem])
  }
  function handleDeleteItem(id){
    setItems(items.filter(item=>item.id!==id))
  }
  function handlePackedItem(id){
    setItems(items.map(item=>item.id===id?{...item,packed:!item.packed}:item))
  }
  function clearList(){
    const confirmed=window.confirm("Are you sure you wanna delete all?")
    if(confirmed) setItems([])
  }
  return <div className="app">
    <Logo/>
    <Form addingItems={addingItems}></Form>
    <PackingList allItems={items} onDeleteItem={handleDeleteItem}
     onPackedItem={handlePackedItem} onClearList={clearList}></PackingList>
    <Stats items={items}></Stats>
  </div>
}
function Logo(){
  return <h1>👒Debjit No way Home🌲</h1>
}
function Form({addingItems}){
  const [description,setDescription]=useState("")
  const [quantity,setQuantity]=useState(1)
  
  function handleSubmit(e){
    e.preventDefault()
    if (!description) return
    const newItem={description,quantity,id:Date.now(),packed:false}
    addingItems(newItem)
    setDescription("")
    setQuantity(1)
  }
  
  return <form className="add-form" onSubmit={handleSubmit}>
    <h3>What do you wanna add?</h3>
    <select onChange={(e)=>setQuantity(Number(e.target.value))} value={quantity}>
      {
        Array.from({length:20},(_,i)=>i+1)
        .map(val=><option value={val} key={val}>{val}</option>)
      }
    </select>
    <input placeholder="item..." value={description} onChange={(e)=>setDescription(e.target.value)}></input>
    <button>Add</button>
  </form>
}
function PackingList({allItems,onDeleteItem,onPackedItem,onClearList}){
  const [sort,setSort]=useState("input")
  let sortedItems
  if (sort==="input") sortedItems=allItems
  else if (sort==="description") sortedItems=allItems.slice().sort((a,b)=>a.description.localeCompare(b.description))
  else sortedItems=allItems.slice().sort((a,b)=>Number(a.packed)-Number(b.packed))
  return <div className="list">
        <ul>
          {
            sortedItems.map(item=><Item item={item} key={item.id} onDeleteItem={onDeleteItem} onPackedItem={onPackedItem} ></Item>)
          }
        </ul>
        <div>
          <select value={sort} onChange={(e)=>setSort(e.target.value)}>
            <option value="input">Sort by input order</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed status</option>
          </select>
          <button onClick={onClearList}>Clear list</button>
        </div>
      </div>
}
function Item({item,onDeleteItem,onPackedItem}){
 
  return <li >
    <input type="checkbox" value={item.packed} onClick={()=>onPackedItem(item.id)}></input>
    <span style={item.packed?{textDecoration:"line-through"}:{}}>
      {item.quantity} {item.description}
    </span>
    <span onClick={()=>onDeleteItem(item.id)}>❌</span>
  </li>
}
function Stats({items}){
  const numItems=items.length
  if (!numItems) return <p className="stats">
    Try adding some items in your list.
  </p>
  const numPacked=items.filter(item=>item.packed).length
  const percentage=Math.round((numPacked/numItems)*100)

  return <footer className="stats">
    
     <em>
      {
      percentage===100?`Everythings packed, you are ready to go`
      :`You have ${numItems} items in your list, you have packed ${numPacked} (${percentage}%) of items.`
      }</em>
  </footer>
}