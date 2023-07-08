import styles from "./HomePageContent.module.scss"
import classNames from "classnames/bind"
import { useContext, useEffect } from "react"
import {useNavigate} from "react-router-dom"
import AuthContext from "../../context/AuthProvider"
const cx = classNames.bind(styles)
export default function IntroductionBlock(){
    const {authTokens} = useContext(AuthContext)
    const navigate = useNavigate()
    return(
        <div className={cx("introduction-block")}>
        {authTokens ? 
            (<div className={cx("login")}>
                <p>Hello Reunoze</p>
                <button onClick={() => {navigate("profile")}}>Let get started!</button>
            </div>) 
            : 
            (<div className={cx("not-login")}>
                <div className={cx("text-introduction")}>
                    <div className={cx("vertical-line")}></div>
                    <p>
                    Make History{'\n'} with Digital Collectibles
                    </p>
                    <span>
                    Collect. Connect. Create History.
                    </span>
                    <div className={cx("button-section")}>
                        <button onClick = {() => navigate("login")}  className={cx("login-btn")}>
                            Login
                        </button>
                        <button onClick = {() => navigate("signup")} className={cx("signup-btn")}>
                            SignUp
                        </button>
                    </div>
                </div>
                <div className={cx("pic-introduction")}>
                <i class="icon-minecraft icon-minecraft-acacia-wall-hanging-sign"></i>
                </div>
            </div>)
        }
        </div>
    )
}