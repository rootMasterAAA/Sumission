import { useState, createContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
const AuthContext = createContext()
export default AuthContext;
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [authTokens, setAuthTokens] = useState(localStorage.getItem("access_token")? localStorage.getItem("access_token"):null)
    const [refeshTokens, setRefreshTokens] = useState()
    let handleLogin = async (ref) => {
    ref.preventDefault()
    let respond = await axios.post(
        "http://127.0.0.1:8000/auth/login/", {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Credentials": "true"},
            body:JSON.stringify({'email':ref.target.email.value, 'password':ref.target.password.value})
        }
    ).then(
        (data) => {
            if (data.data?.Access_token){
                localStorage.setItem("access_token", data.data.Access_token);
                setAuthTokens(data.data.Access_token)
                alert("You are login sucess!")
            }
            else {
                console.log("Some thing well wrong")
            }
        }
    )
}
    let testBTN = async () => {
    console.log(authTokens)
    let respond = await axios.get(
    "http://127.0.0.1:8000/test/get/permission",{
        method: "GET",
        headers:{
            "Authorization": `Bearer ${authTokens}`,
            // 'Content-Type':'application/json',
            // "Access-Control-Allow-Origin":"*",
            
            // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        }
    }).then(
        (data) => {
            console.log(data.data)
        }
    )
    console.log(respond)
    }

    let contextData = {
        authTokens: authTokens,
        login: handleLogin,
        testBTN: testBTN,
    }
    return (
    <AuthContext.Provider value = {contextData}>
        {children}
    </AuthContext.Provider>
    )
}