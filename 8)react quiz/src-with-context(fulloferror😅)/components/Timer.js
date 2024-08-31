import { useEffect } from "react"

function Timer({timeRemaining,dispatch}) {
    const min=Math.floor(timeRemaining/60)
    const sec=Math.floor(timeRemaining%60)
    useEffect(function(){
        const timerid=setInterval(()=>dispatch({type:"timeCountdown"}),1000)
        return ()=>clearInterval(timerid)
    },[dispatch])

    return (
        <div className="timer">
            {min<10 && "0"}{min}:{sec<10 && "0"}{sec}
        </div>
    )
}

export default Timer
