import { useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

function ProtectedRoute({children}) {
    const navigate=useNavigate()
    const {isAuthenticated} = useAuth()
    useEffect(function(){
        if(!isAuthenticated) navigate("/")
    },[isAuthenticated])
    return (
        isAuthenticated?children:null
    )
}

export default ProtectedRoute
