import { createSlice } from "@reduxjs/toolkit"

const initialState={
    balance:0,
    loan:0,
    loanPurpose:""
}
const accountSlice=createSlice({
    name:"account",
    initialState,
    reducers:{
        deposit(state,action){
            state.balance+=action.payload
        },
        withdraw(state,action){
            state.balance-=action.payload
        },

        reqLoan:{
            prepare(amount,purpose){
                return{
                    payload:{amount,purpose},
                };
            },
            reducer(state,action){
                if(state.loan>0) return 
                state.balance += action.payload.amount
                state.loan=action.payload.amount
                state.loanPurpose=action.payload.purpose
            }
        },        
        payLoan(state){
            state.balance-=state.loan
            state.loan=0
            state.loanPurpose=""
        }
        
    }
})
console.log(accountSlice)
export const{withdraw,reqLoan,payLoan} = accountSlice.actions

export function deposit(amount, currency){
    if (currency==="USD") return {type:"account/deposit", payload: amount}
    return async function(dispatch,getState){
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
        const data = await res.json()
        const converted = data.rates.USD
        dispatch({type:"account/deposit", payload: converted})
        
    }
}

export default accountSlice.reducer
/* 
export default function accountReducer(state=initialState,action){
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

export function deposit(amount, currency){
    if (currency==="USD") return {type:"account/deposit", payload: amount}
    return async function(dispatch,getState){
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
        const data = await res.json()
        const converted = data.rates.USD
        dispatch({type:"account/deposit", payload: converted})
        
    }
}
export function withdraw(amount){
    return {type:"account/withdraw", payload:amount}
}
export function reqLoan(amount,purpose){
    return {type:"account/reqLoan", payload:{amount,purpose}}
}
export function payLoan(){
    return {type:"account/payLoan"}
}*/