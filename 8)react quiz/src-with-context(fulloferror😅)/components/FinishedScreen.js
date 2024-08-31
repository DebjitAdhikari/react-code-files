function FinishedScreen({points,totalPoints,highscore,dispatch}) {
    const percentPoint=Math.ceil(points/totalPoints*100)
    return (
        <>
            <p className="result">
                You scored {points} out of {totalPoints} : {percentPoint}%
            </p>
            <p className="highscore">Highscore: ({highscore})</p>
            <div className="btn btn-ui" onClick={()=>dispatch({type:"restart"})}>Restart quiz</div>
        </>
    )
}

export default FinishedScreen
