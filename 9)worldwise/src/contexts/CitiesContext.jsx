import { createContext, useContext, useEffect, useReducer, useState, useSyncExternalStore } from "react"

const BASE_URL="http://localhost:8000/"
const CitiesContext=createContext()

const initialData={
  cities:[],
  isLoading:false,
  currentCity:{},
  error:""
}

function reducer(state,action){
  switch(action.type){
    case "loading":
      return{
        ...state,
        isLoading:true,
      }
    case "rejected":
      return{
        ...state,
        isLoading:false,
        error:action.payload
      }
    case "cities/loaded":
      return{
        ...state,
        isLoading:false,
        cities:action.payload
      }
    case "city/created":
      return{
        ...state,
        isLoading:false,
        cities:[...state.cities,action.payload],
        currentCity:action.payload
      }
    case "city/deleted":
      return{
        ...state,
        isLoading:false,
        cities: state.cities.filter(city=>city.id!==action.payload)
      }
    case "city/selected":
      return{
        ...state,
        isLoading:false,
        currentCity:action.payload
      }
    default:
      return{
        ...state,
        error:action.payload
      }
  }
}

function CitiesProvider({children}) {
    // const[cities,setCities]=useState([])
    // const[isLoading,setIsLoading]=useState(false)
    // const[currentCity,setCurrentCity]=useState({})
    const [{cities,isLoading,currentCity},dispatch]=useReducer(reducer,initialData)

    const flagemojiToPNG = (flag) => {
      var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt()).map(char => String.fromCharCode(char-127397).toLowerCase()).join('')
      return (<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />)
    }

    //loading cities
    useEffect(function(){
      async function fetchCityData() {
        try{
          dispatch({type:"loading"})
          const res=await fetch(`${BASE_URL}cities`)
          const data=await res.json()
          dispatch({type:"cities/loaded",payload:data})
        }catch{
          dispatch({type:"rejected",payload:"Error while loading cities..."})
        }
      }
      fetchCityData()
    },[])
    
    //for current city
    async function getCity(id) {
        if(currentCity.id===Number(id)) return
        try{
          dispatch({type:"loading"})
          const res=await fetch(`${BASE_URL}cities/${id}`)
          const data=await res.json()
          dispatch({type:"city/selected",payload:data})
        }catch{
          dispatch({type:"rejected",payload:"Error while selecting current city..."})
        }
      }

    //new city
    async function createNewCity(newCityData) {
      try{
        dispatch({type:"loading"})
        const res=await fetch(`${BASE_URL}cities`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(newCityData)
        })
        const data=await res.json()
        dispatch({type:"city/created",payload:data})
      }catch{
        dispatch({type:"rejected",payload:"Error while creating city..."})
      }
    }

    async function deleteCity(id) {
      try{
        dispatch({type:"loading"})
        await fetch(`${BASE_URL}cities/${id}`,{
          method:"DELETE"
        })
        dispatch({type:"city/deleted",payload:id})
      }catch{
        dispatch({type:"rejected",payload:"Error while deleting city..."})
      }
    }

    return (
        <CitiesContext.Provider
            value={{cities,isLoading,getCity,currentCity,flagemojiToPNG,createNewCity,deleteCity}}
        >
            {children}
        </CitiesContext.Provider>
    )
}
function useCities(){
    const context=useContext(CitiesContext)
    if (context===undefined) throw new Error("used outside")

    return context
}
export {useCities,CitiesProvider}
