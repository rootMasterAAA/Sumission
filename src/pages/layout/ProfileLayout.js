import SideBar from "../../components/Layout/SideBar"
import classNames from "classnames/bind"
import styles from "../layout/scss/ProfileLayout.module.scss"
import HomeHeader from "../../components/Layout/HomeHeader"
import { useContext, useState } from "react"
import { ProfileSectionProvider } from "../../context/ProfileSectionProvider"
import Section from "../Profile/Sections/Section"
import AuthContext from "../../context/AuthProvider"

const cx = classNames.bind(styles)
const ProfileLayout = () => {
    const {user} = useContext(AuthContext)
    return (
        <ProfileSectionProvider>
        <div className={cx("profile-wrapper")}>
            <HomeHeader walletOff={true}/>
            <div className={cx("profile-content-wrapper")}>
            <div className={cx("profile-content")}>
                <SideBar cl = {cx("side-bar")}/>
                <div className={cx("profile-section")}>
                <Section />
                </div>    
            </div>
            </div>
        </div>
        </ProfileSectionProvider>
    )
}
export default ProfileLayout