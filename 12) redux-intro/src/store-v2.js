import {applyMiddleware, combineReducers, createStore} from "redux"
import {thunk} from "redux-thunk"
import accountReducer from "./features/accounts/accountSlice"
import customerReducer from "./features/customers/customerSlice"


const allReducer=combineReducers({
    account:accountReducer,
    customer:customerReducer
})
const store=createStore(allReducer,applyMiddleware(thunk))

export default store
//1 way
// store.dispatch({type:"account/deposit", payload: 500})
// console.log(store.getState())

// 2nd way

// store.dispatch(deposit(500))
// console.log(store.getState())
// store.dispatch(reqLoan(500,"buy a cheap car"))
// console.log(store.getState())
// store.dispatch(createCustomer("Debjit",4553))
// console.log(store.getState())

