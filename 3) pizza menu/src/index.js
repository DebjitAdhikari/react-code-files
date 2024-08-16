import React from "react"
import ReactDom from "react-dom/client"
import "./index.css"
const root =ReactDom.createRoot(document.getElementById("root"));
const pizzaData = [
    {
      name: "Focaccia",
      ingredients: "Bread with italian olive oil and rosemary",
      price: 6,
      photoName: "pizzas/focaccia.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Margherita",
      ingredients: "Tomato and mozarella",
      price: 10,
      photoName: "pizzas/margherita.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Spinaci",
      ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
      price: 12,
      photoName: "pizzas/spinaci.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Funghi",
      ingredients: "Tomato, mozarella, mushrooms, and onion",
      price: 12,
      photoName: "pizzas/funghi.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Salamino",
      ingredients: "Tomato, mozarella, and pepperoni",
      price: 15,
      photoName: "pizzas/salamino.jpg",
      soldOut: true,
    },
    {
      name: "Pizza Prosciutto",
      ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
      price: 18,
      photoName: "pizzas/prosciutto.jpg",
      soldOut: false,
    },
  ];
  
function App(){
    return <div className="container">
        <Heading></Heading>
        <Menu></Menu>
        <Footer></Footer>
    </div>
}
function Heading(){
    return <header className="header">
        <h1>Debjit's Pizza house</h1>
    </header>
}
function Pizza({pizzaObj}){
    console.log(pizzaObj)
    return <li className = {`pizza ${pizzaObj.soldOut?"sold-out":""}`} >
        <img src={pizzaObj.photoName} alt={pizzaObj.name}></img>
        <div>
            <h3>{pizzaObj.name} 
              
              <span>{pizzaObj.soldOut?"SOLD OUT": pizzaObj.price+"$"}</span></h3>
            <p>{pizzaObj.ingredients}</p>
        </div>
    </li>
}
function Menu(){
  const dataLength=pizzaData.length

    return <div className="menu">
        <h2>Our menu</h2>
          {
            dataLength>0 ? (
              <>
                <p>Authentic italian cuisine. 6 creative dishes to choose from. 
                  All from our store oven, all organic, all delicious.
                </p>
                <ul className="pizzas">
                  {
                    pizzaData.map(pizza=>(<Pizza pizzaObj={pizza} key={pizza.name}></Pizza>))
                  }
                </ul>
              </>
            )
            : <p>We are still working on our menu, please come back later :)</p>
          }
        
        {/* <Pizza name="Pizza Funghi" photosrc="pizzas/funghi.jpg"
        ingredients="Tomato, mozarella, mushrooms, and onion" price={30}> </Pizza>
        <Pizza name="Pizza Salamino" photosrc="pizzas/salamino.jpg"
        ingredients="Tomato, mozarella, and pepperoni" price={10}> </Pizza> */}

    </div>
}
function Footer(){
    const hour=new Date().getHours()
    const openingHours=12
    const closingHours=22
    const isOpen=openingHours<=hour&&closingHours>=hour
    console.log(isOpen)
    return <footer className="footer">
      {
        isOpen ?
        <Order closingHours={closingHours}></Order>
        : <p>Sorry we're closed now. We are happy to welcome you 
          between {openingHours}.00 and {closingHours}.00</p>
      }
      </footer>
}
function Order({closingHours}){
  return <div className="order">
          <p>We are open until {closingHours}.00 Come visit us or order online.</p>
          <button className="btn">Order</button>
        </div>
}
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)