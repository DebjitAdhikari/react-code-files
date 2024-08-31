import {combineReducers, createStore} from "redux"
//initial state of reducers
const initialStateAccount={
    balance:0,
    loan:0,
    loanPurpose:""
}
const initialStateCustomer={
    fullname:"",
    nationalId:null,
    createdAt:""
}
//reducer functions
function accountReducer(state=initialStateAccount,action){
    switch(action.type){
        case "account/deposit":
            return {
                ...state,
                balance: state.balance+action.payload
            }
        case "account/withdraw":
            return {
                ...state,
                balance: state.balance-action.payload
            }
        case "account/reqLoan":
            if(state.loan>0) return state 
            return {
                ...state,
                balance: state.balance+action.payload.amount,
                loan:action.payload.amount,
                loanPurpose:action.payload.purpose
            }
        case "account/payLoan":
            return {
                ...state,
                balance: state.balance-state.loan,
                loan:0,
                loanPurpose:"",
            
            }
        default:
            return state;
    }
}
function customerReducer(state=initialStateCustomer,action){
    switch(action.type){
        case "customer/createCustomer":
            return{
                ...state,
                fullname:action.payload.fullname,
                nationalId:action.payload.nationalId,
                createdAt:action.payload.createdAt
            }
        case "customer/updateFullName":
            return{
                ...state,
                fullname:action.payload
            }
        default:
            return state
    }
}

//action crater functions
function deposit(amount){
    return {type:"account/deposit", payload: amount}
}

function reqLoan(amount,purpose){
    return {type:"account/reqLoan", payload:{amount,purpose}}
}

function createCustomer(fullname,nationalId){
    return {type:"customer/createCustomer",payload:{fullname,nationalId,createdAt:new Date().toISOString()}}
}

function updateFullName(fullname){
    return{type:"customer/updateFullName",payload:fullname}
}


const allReducer=combineReducers({
    account:accountReducer,
    customer:customerReducer
})
const store=createStore(allReducer)

//1 way
// store.dispatch({type:"account/deposit", payload: 500})
// console.log(store.getState())

// 2nd way

store.dispatch(deposit(500))
console.log(store.getState())
store.dispatch(reqLoan(500,"buy a cheap car"))
console.log(store.getState())
store.dispatch(createCustomer("Debjit",4553))
console.log(store.getState())