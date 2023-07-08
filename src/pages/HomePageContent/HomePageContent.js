import styles from "./HomePageContent.module.scss"
import classNames from "classnames/bind"
import IntroductionBlock from "./IntroductionBlock"
import { Fragment } from "react"
import MemberBenefitBlock from "./MemberBenefitBlock"
import createTransferInstrucion from "../../features/mint"
const cx = classNames.bind(styles)
const HomePageContent = () => {
    return (
        <Fragment>
            <IntroductionBlock/>
            <MemberBenefitBlock/>
            {/* <button onClick = {() => {
                createTransferInstrucion().then((transaction) => {
                    console.log(transaction["encoded_transaction"])
                })
            }}>Click me</button> */}
        </Fragment>
    )
}
export default HomePageContent