function StartScreen({numberQuestions,dispatch}) {
    return (
        <div className="start">
            <h2>Welcome to the quiz</h2>
            <h3>{numberQuestions} questions to text your React mastery</h3>
            <button className="btn btn-ui" onClick={()=>dispatch({type:"start"})}>Start</button>
        </div>
    )
}

export default StartScreen
