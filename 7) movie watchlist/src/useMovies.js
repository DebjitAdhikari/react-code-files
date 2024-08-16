import { useEffect,useState } from "react"
const API_KEY = "402d5b0"

export function useMovies(query,setSelectedId){
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("")    
  const [movies, setMovies] = useState([])

    useEffect(function () {
        const controller=new AbortController()
        async function movieSearch() {
          try {
            setError("")
            setLoading(true)
            const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
              {
                signal:controller.signal
              })
            if (!res.ok) {
              console.log(res)
              throw new Error("Something went wrong")
            }
            const data = await res.json()
            if (data.Response === "False") throw new Error("Movie not found")
            setMovies(data.Search)
          } catch (err) {
            if(err.name!=="AbortError")
              setError(err.message)
            
          } finally {
            setLoading(false)
          }
    
        }
        if(query.length<3){
          setMovies([])
          setError("")
          return
        }
        setSelectedId?.(null)
        movieSearch()
    
        return function(){
          controller.abort()
        }
    
      }, [query,setSelectedId])

      return {isLoading,error,movies}
}