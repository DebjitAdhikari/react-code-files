import { useState,useEffect } from "react";

export function useLocalStorage(initialValue,key){
    const [value,setValue] = useState(function(){
        const data=localStorage.getItem(key)
        const watchedMovies=JSON.parse(data)
        if(!watchedMovies) return initialValue
        return watchedMovies
      });

    useEffect(function(){
    localStorage.setItem(key,JSON.stringify(value))
    },[value,key])
    return [value,setValue]
}
