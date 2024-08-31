import {useReducer,useEffect} from "react"
import Header from "./Header"
import Main from "./Main"
import Error from "./Error"
import Loader from "./Loader"
import StartScreen from "./StartScreen"
import Questions from "./Questions"
import NextQuestion from "./NextQuestion"
import ProgressBar from "./ProgressBar"
import FinishedScreen from "./FinishedScreen"
import Footer from "./Footer"
import Timer from "./Timer"
import { useQuiz } from "../context/QuizContext"


export default function App(){
  const{questions,status,index,answer,points,highscore,timeRemaining,dispatch}=useQuiz()
  const totalPoints=questions.reduce((acc,q)=>acc+q.points,0)

  useEffect(function(){
    fetch("http://localhost:5000/questions")
    .then(res=>res.json())
    .then(data=>dispatch({type:"dataReceived",payload:data}))
    .catch(err=>dispatch({type:"error"}))
  },[])


  return (
    <div className="app">
      <Header></Header>
      <Main>
        {status==="error" && <Error></Error>}
        {status==="loading" && <Loader></Loader>}
        {status==="ready" && <StartScreen></StartScreen>}
        {status==="active" && 
          <>
            <ProgressBar totalPoints={totalPoints}></ProgressBar>
            <Questions question={questions[index]} 
            dispatch={dispatch} answer={answer}></Questions>
            <Footer>
              <Timer timeRemaining={timeRemaining} dispatch={dispatch}></Timer>
              <NextQuestion dispatch={dispatch} answer={answer} index={index} numQuestions={questions.length}> </NextQuestion>

            </Footer>
          </>
          }
        {status==="finished" && <FinishedScreen points={points} 
        totalPoints={totalPoints} highscore={highscore} dispatch={dispatch}></FinishedScreen>}
      </Main>
    </div>
  )
}