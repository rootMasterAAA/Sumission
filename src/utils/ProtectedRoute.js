import { useContext } from "react"
import AuthContext  from "../context/AuthProvider"
import { Navigate } from "react-router-dom"
export default function ProtectedRoute({Layout, Page}){
    const {authTokens} = useContext(AuthContext)
    return (
        authTokens ? <Layout><Page/></Layout> : <Navigate to = "/login" replace={true}/>
    )
}