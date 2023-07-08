import { useState, useEffect, Fragment, useRef, useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./Login.module.scss"
import classNames from "classnames/bind"
import AuthContext from "../../context/AuthProvider"
const cx = classNames.bind(styles);
const LoginPage = () => {
    const {login, authTokens} = useContext(AuthContext);
    const emaiRef = useRef(null);
    const [email, setEmail] = useState("");

    const [pwd, setPwd] = useState("");

    useEffect(()=> {
        if (emaiRef.current != null){
            emaiRef.current.focus();
        } 
    }, []);


    return (
        <>
        {authTokens ? 
            (<>
                <p>Your are already login</p>
            </>
            )
            : 
            (<div id = "wrapper">
            <form method="post" onSubmit={login}>
                <h2>Login</h2>
                <label htmlFor="email">Email</label>
                <input
                    onChange={(e) => setEmail(e.target.value)} 
                    ref={emaiRef}
                    autoComplete="off"
                    name = "email" 
                    id = "username" 
                    type="email"
                    required/>
                <label htmlFor="password">Password</label>
                <input 
                    onChange={(e) => {setPwd(e.target.value)}}
                    autoComplete="off"
                    name="password" 
                    id = "password"
                    type="password"
                    required/>
                <input type="submit" value={"Login"}/>
            </form>
        </div>)
        }
        </>
    )
}
export default LoginPage