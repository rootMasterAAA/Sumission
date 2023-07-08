import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faShop, faHeart, faPersonHiking, faCommentDots } from "@fortawesome/free-solid-svg-icons"
import classNames from "classnames/bind"
import styles from "../design/HomeHeader.module.scss"
import { useNavigate } from "react-router-dom"
const cx = classNames.bind(styles)
export default function NavBar({cl}){
    const navigate = useNavigate()
    const navContent = [
        {navName: "Home", font: faHouse, endpoint: "/"},
        {navName: "Market-place", font: faShop, endpoint: "/market-place"},
        {navName: "Community", font: faHeart, endpoint: "/"},
        {navName: "Discover", font: faPersonHiking, endpoint: "/"},
        {navName: "Story", font: faCommentDots, endpoint: "/"}
    ]
    return (
        <nav className={cx("head-navbar")}>
            {
                navContent.map((navChildren, index) => {
                    return (
                    <NavLink to={navChildren.endpoint} key={index} className={cx("item")}>
                        <FontAwesomeIcon icon={navChildren.font}/>
                        <span className={cx("nav-text")}>
                            {navChildren.navName}
                        </span>
                    </NavLink>
                    )
                })
            }
        </nav>
    )
}