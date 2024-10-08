function ProgressBar({index,numQuestions,points,totalPoints,answer}) {
    return (
        <header className="progress">
            <progress value={index+Number(answer!==null)} max={numQuestions}></progress>
            <p>Questions: <strong>{index+1}</strong>/{numQuestions}</p>
            <p>Points: <strong>{points}</strong>/{totalPoints}</p>
        </header>
    )
}

export default ProgressBar
