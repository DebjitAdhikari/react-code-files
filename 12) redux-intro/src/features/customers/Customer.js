import { useSelector } from "react-redux";

function Customer() {
  const customer=useSelector(state=>state.customer)//subscribed, each time it changes will re render the component
  
  return <h2>👋 Welcome, {customer.fullname}</h2>;
}

export default Customer;
