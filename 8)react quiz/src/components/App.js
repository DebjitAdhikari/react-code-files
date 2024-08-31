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

const SEC=20
const initialData={
  questions:[],
  //loading, error, ready, active, finished
  status:"loading",
  index:0,
  answer:null,
  points:0,
  highscore:0,
}
function reducer(state,action){
  switch(action.type){
    case "dataFailed":
      return {
        ...state,
        questions:action.payload,
        status:"error"
      };
    case "dataReceived":
      return{
        ...state,
        questions:action.payload,
        status:"ready"
      };
    case "start":
      return{
        ...state,
        status:"active",
        timeRemaining:SEC*state.questions.length
      }
    case "newAnswer":
      const question=state.questions[state.index]
      return{
        ...state,
        answer:action.payload,
        points: action.payload===question.correctOption? state.points+question.points: state.points
      }
    case "nextQuestion":
      return{
        ...state,
        index:state.index+1,
        answer:null
      }
    case "endQuiz":
      return{
        ...state,
        status:"finished",
        highscore:state.points>state.highscore?state.points:state.points
      }
    case "restart":
      return{
        ...initialData,
        status:"ready",
        questions:state.questions,
        timeRemaining:SEC*state.questions.length
      }
    case "timeCountdown":
      return{
        ...state,
        timeRemaining:state.timeRemaining-1,
        status:state.timeRemaining===0 ? "finished" : state.status
      }
    default:
      throw new Error ("Something bad happened")
  }
}
export default function App(){
  const[{questions,status,index,answer,points,highscore,timeRemaining},dispatch]=useReducer(reducer,initialData)
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
        {status==="ready" && <StartScreen dispatch={dispatch} numberQuestions={questions.length}></StartScreen>}
        {status==="active" && 
          <>
            <ProgressBar points={points} index={index} 
            numQuestions={questions.length} totalPoints={totalPoints} answer={answer}></ProgressBar>
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