import HomeHeader from "../../components/Layout/HomeHeader"
import styles from "./scss/HomeLayout.module.scss"
import classNames from "classnames/bind"
import Footer from "../../components/Layout/Footer"
const cx = classNames.bind(styles)
const HomeLayout = ({children}) => {
    return(
        <div className={cx("home-wrapper")}>
            <HomeHeader className = {cx("home-header")}isLogin = {false}/>
            <div className={cx("content-wrapper")}>
            {children}
            </div>
            <Footer/>
        </div>
    )
}
export default HomeLayout