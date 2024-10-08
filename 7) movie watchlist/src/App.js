import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorage } from "./useLocalStorage";

const API_KEY = "402d5b0"

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);




export default function App() {
  const [query, setQuery] = useState("");
  // const [watched, setWatched] = useState([]);
  
  const [selectedId,setSelectedId]=useState(null)
  const {isLoading,error,movies}=useMovies(query,setSelectedId)
  const [watched,setWatched]=useLocalStorage([],"watchedMovies")

  function handleSelectedId(id){
    setSelectedId(()=>id===selectedId?null:id)
  }
  function handleUnselectedId(){
    setSelectedId(null)
  }
  function handleAddWatchedMovie(movie){
    setWatched([...watched,movie])
    console.log(watched)
  }
  function deleteWatchedMovie(id){
    setWatched(movie=>movie.filter(mov=>mov.imdbID!==id))
  }

  

  // useEffect(function(){
  //   fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${MOVIE_NAME}`)
  //   .then(res=>res.json())
  //   .then(data=>console.log(data))
  // },[])
  

  return (
    <>
      <NavBar movies={movies}>
        <Logo></Logo>
        <SearchBar query={query} setQuery={setQuery} ></SearchBar>
        <NumResult movies={movies}></NumResult>   {/* passing it as children to get rid of prop drilling */}
      </NavBar>

      <Main>
        <MovieBox>
          {
            error && <ErrorMessage message={error}></ErrorMessage>
          }
          {
            !error && isLoading && <Loader></Loader>
          }
          {
            !error && !isLoading && <SearchedMovieList movies={movies} handleSelectedId={handleSelectedId}></SearchedMovieList>
          }
        </MovieBox>
        <MovieBox>
          {
            selectedId?<MovieDetails selectedId={selectedId} watchedMovie={watched} handleUnselectedId={handleUnselectedId} handleAddWatchedMovie={handleAddWatchedMovie}></MovieDetails>
            :
            <>
              <WatchedSummary watched={watched}></WatchedSummary>
              <WatchedMovieList watched={watched} deleteWatchedMovie={deleteWatchedMovie} ></WatchedMovieList>
            </>
          }
        </MovieBox>
      </Main>
    </>
  );
}
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      
      {children} {/*reducing prop drilling so passing the component as child */}
    </nav>
  )
}
function ErrorMessage({ message }) {
  return <p className="error">
    {message}
  </p>
}
function Loader() {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
function Logo() {
  return <div className="logo">
    <span role="img">🍿</span>
    <h1>usePopcorn</h1>
  </div>
}
function SearchBar({query,setQuery}) {
  const inputEl=useRef(null)

  useEffect(function(){
    
    function theCallBack(e){
      if (document.activeElement===inputEl.current) return

      if(e.code==="Enter"){
        inputEl.current.focus()
        setQuery("")

      }
    }

    document.addEventListener("keydown",theCallBack)
    return ()=>document.addEventListener("keydown",theCallBack)

  },[])

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  )
}
function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  )
}

function Main({ children }) {
  return (
    <main className="main">
      {children}
    </main>
  )
}
function MovieBox({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {setIsOpen1 ? "–" : "+"}

      </button>
      {isOpen1 && children}
    </div>
  )
}

function SearchedMovieList({ movies, handleSelectedId}) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <SearchedMovie movie={movie} key={movie.imdbID} handleSelectedId={handleSelectedId}></SearchedMovie>
      ))}
    </ul>
  )
}
function SearchedMovie({ movie,handleSelectedId}) {
  return (
    <li key={movie.imdbID} onClick={()=>handleSelectedId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}
function MovieDetails({selectedId,handleUnselectedId,handleAddWatchedMovie,watchedMovie}) {
  const [movie,setMovie]=useState({})
  const [isLoading,setLoading]=useState(false)
  const [starRate,setStarRate]=useState(0)
  const isWatched=watchedMovie.map(movie=>movie.imdbID).includes(selectedId)
  const theRate=watchedMovie.find(movie=>movie.imdbID===selectedId)?.userRating
  
  useEffect(function(){
    function theCallBack(e){
      if (e.code==="Escape")
        handleUnselectedId(null)
    }
    document.addEventListener("keydown",theCallBack)
    return function(){
      document.removeEventListener("keydown",theCallBack)
    }
  },[])

  function addWatchedMovie(){
    const selectedWatchedMovie={
      imdbID:selectedId,
      title,
      year,
      poster,
      imdbRating:Number(imdbRating),
      runtime:Number(runtime.split(" ")[0]),
      userRating:starRate
    }
    handleAddWatchedMovie(selectedWatchedMovie)
    handleUnselectedId()
  }
  const {
    Title:title,
    Year:year,
    Poster:poster,
    Runtime:runtime,
    imdbRating,
    Plot:plot,
    Released:released,
    Actors:actors,
    Director:director,
    Genre:genre
  }=movie
  // console.log(title,actors)
  useEffect(function(){
    async function getMovieDetails() {
      setLoading(true)
      const res=await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`)
      const data=await res.json()
      // console.log(data)
      console.log("render")
      setMovie(data)
      setLoading(false)
    } 
    getMovieDetails()
  },[selectedId])

  useEffect(function(){
    if(!title) return
    document.title=`Movie | ${title}`
    return function(){
      document.title="Watch TV"
    }
  },[title])
  
  return (

    <div className="details" >
      {
        isLoading?<Loader></Loader>:
        <>
        <header>
        <button className="btn-back" onClick={handleUnselectedId}>&larr;</button>
          
        <img src={poster}></img>
        <div className="details-overview">
          <h2>{title}</h2>
          <p>{released} &bull; {runtime}</p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDB rating
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          {            
            isWatched?<p>You already rated this movie {theRate} ⭐</p>
            :
            <>
            <StarRating maxStarCount={10} size={24} userRate={starRate} setUserRating={setStarRate}></StarRating>
            {
              starRate>0 && <button className="btn-add" onClick={addWatchedMovie}>+ Add to watch watchlist</button>
            }</>

          }
                  </div>
        <em>
          {plot}
        </em>
        <p>Starring: {actors}</p>
        <p>{director}</p>

      </section>
        </>
      }
      
    </div>
  )
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>

  )
}
function WatchedMovieList({ watched,deleteWatchedMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} deleteWatchedMovie={deleteWatchedMovie}></WatchedMovie>
      ))}
    </ul>
  )
}
function WatchedMovie({ movie,deleteWatchedMovie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={()=>deleteWatchedMovie(movie.imdbID)}>
          X
        </button>
      </div>
    </li>
  )
}


