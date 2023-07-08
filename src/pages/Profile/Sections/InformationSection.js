import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./scss/InformationSection.module.scss"
import avatar from "../../../assets/avatar.png"
const cx = classNames.bind(styles)
export default function InformationSection(){
    return(
        <div className={cx("wrapper")}>
            <section className={cx("personal-information")}>
                <section className={cx("personal-information-card")}>
                    <img src={avatar} className = {cx("avatar")} alt="avatar"></img>
                    <p>UUID: </p>
                    <p>Name: </p>
                    <p>Played time: </p>
                </section>
            </section>
            <section className={cx("other-information")}>
                <section className={cx("nft")}>
                    <p className={cx("title")}>NFT Medal</p>
                </section>
                <section className={cx("game")}>
                    <p className={cx("title")}> GAME Medal</p>
                </section>
            </section>
        </div>
    )
}