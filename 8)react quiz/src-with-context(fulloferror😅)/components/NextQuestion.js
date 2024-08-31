function NextQuestion({dispatch,answer,index,numQuestions}) {
    if (answer===null) return null

    
    if (index<numQuestions-1) return (
        <div className="btn btn-ui" onClick={()=>dispatch({type:"nextQuestion"})}>
            Next
        </div>
    )

    if (index===numQuestions-1) return (
        <div className="btn btn-ui" onClick={()=>dispatch({type:"endQuiz"})}>
            Finish
        </div>
    )
}

export default NextQuestion
