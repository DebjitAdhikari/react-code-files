import { useQuiz } from "../context/QuizContext"

function ProgressBar({totalPoints}) {
    const{questions,index,answer,points}=useQuiz()
    return (
        <header className="progress">
            <progress value={index+Number(answer!==null)} max={questions.length}></progress>
            <p>Questions: <strong>{index+1}</strong>/{questions.length}</p>
            <p>Points: <strong>{points}</strong>/{totalPoints}</p>
        </header>
    )
}

export default ProgressBar
