import { createContext, useContext, useReducer } from "react";
const QuizContext=createContext()
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

function QuizProvider({children}) {
    const [{questions,status,index,answer,points,highscore,timeRemaining},dispatch]=useReducer(reducer,initialData)
    return (
        <QuizContext.Provider
        value={{
            questions,status,index,answer,points,highscore,timeRemaining,dispatch
        }}>
            {children}
        </QuizContext.Provider>
    )
}
function useQuiz(){
    const context=useContext(QuizContext)
    if (context===undefined) throw new Error("From outside")
    return context
}
export {useQuiz,QuizProvider}

