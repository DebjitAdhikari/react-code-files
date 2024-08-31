import { useQuiz } from "../context/QuizContext"

function StartScreen() {
    const{questions,dispatch}=useQuiz()
    return (
        <div className="start">
            <h2>Welcome to the quiz</h2>
            <h3>{questions.length} questions to text your React mastery</h3>
            <button className="btn btn-ui" onClick={()=>dispatch({type:"start"})}>Start</button>
        </div>
    )
}

export default StartScreen
