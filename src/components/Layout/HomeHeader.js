import NavBar from "./NavBar"
import classNames from "classnames/bind"
import styles from "../design/HomeHeader.module.scss"
import solana from "../../assets/solana-sol-logo.png"
import { useContext } from "react"
import AuthContext from "../../context/AuthProvider"
const cx = classNames.bind(styles)
const HomeHeader = ({walletOff, cl, isLogin, isConnectWallet}) => {
    return (<header classnames = {cl}>
        <section className={cx("head-wrapper")}>
            <img className={cx("head-logo")} src = {solana} alt="Logo"/>
            <NavBar/>
            {<button className={cx("wallet-btn")}>Connect to wallet</button>}
        </section>
    </header> 
    )
}
export default HomeHeader