import classNames from "classnames/bind"
import styles from "../design/HomeFooter.module.scss"
import { faEnvelope, faCoffee } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faFacebook, faFacebookMessenger } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const cx = classNames.bind(styles)
export default function Footer(){
    return (
        <footer>
            <div className={cx("wrapper")}>
                <div className={cx("container")}>
                    <div className={cx("footer-column")}>
                        <h4 className={cx("footer-title")}>Documentation</h4>
                        <ul>
                            <li>The Solana program</li>
                            <li>The Django backend</li>
                            <li>The React front end code</li>
                            <li>The Java Minecraft Plugin interface</li>
                        </ul>
                    </div>
                    <div className={cx("footer-column")}>
                        <h4 className={cx("footer-title")}>Get help</h4>
                        <ul>
                            <li>Wallet connection</li>
                            <li>Transaction problem</li>
                            <li></li>
                            <li>Other</li>
                        </ul>
                    </div>
                    <div className={cx("footer-column")}>
                        <h4 className={cx("footer-title")}>Contact</h4>
                        <section className={cx("icon-list")}>
                            <FontAwesomeIcon className = {cx("foot-icon")} icon = {faEnvelope}/>
                            <FontAwesomeIcon className = {cx("foot-icon")} icon = {faFacebook}/>
                            <FontAwesomeIcon className = {cx("foot-icon")} icon = {faFacebookMessenger}/>
                        </section>
                    </div>
                    <div className={cx("footer-column")}>
                        <h4 className={cx("footer-title")}>Contribution</h4>
                        <section className={cx("icon-list")}>
                            <FontAwesomeIcon className = {cx("foot-icon")} icon = {faCoffee}/>
                            <FontAwesomeIcon className = {cx("foot-icon")} icon = {faGithub}/>
                        </section>
                    </div>
                </div>
            </div>
        </footer>
    )
}