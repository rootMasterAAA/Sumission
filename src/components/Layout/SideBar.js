import classNames from "classnames/bind";
import styles from "../design/SideBar.module.scss"
import { faUser, faCashRegister, faWallet, faClock, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import ProfileSectionContext from "../../context/ProfileSectionProvider";
import InformationSection from "../../pages/Profile/Sections/InformationSection";
import SupportSection from "../../pages/Profile/Sections/SupportSection";
import TransactionSection from "../../pages/Profile/Sections/TransactionSection";
const cx = classNames.bind(styles)

export default function SideBar({}){
    const { setSection } = useContext(ProfileSectionContext)
    const sideBarContent = [
        {sideBarChildren: "Information", icon: faUser, section: <InformationSection/>},
        {sideBarChildren: "Transaction", icon: faCashRegister, section: <TransactionSection/>},
        {sideBarChildren: "Wallet", icon: faWallet, section: ""},
        {sideBarChildren: "History", icon: faClock, section: ""},
        {sideBarChildren: "Support", icon: faPhone, section: < SupportSection/>},
    ];
    return (
        <aside>
            <ul className={cx("wrapper")}>
            {sideBarContent.map((content, key) => {
                return (
                    <li onClick={() => setSection(content.section)} className={cx("menu-item")} key={key}>
                        <FontAwesomeIcon icon={content.icon}/>
                        <span className={cx("menu-item-text")}>{content.sideBarChildren}</span>
                    </li>
                )
            })}
            </ul>
        </aside>
    )
}