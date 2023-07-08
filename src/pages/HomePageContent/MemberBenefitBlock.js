import styles from './HomePageContent.module.scss'
import classNames from 'classnames/bind'
import { styled } from 'styled-components'
import solanaCoin from '../../assets/Solana-coin.png'
const cx = classNames.bind(styles)
const CustomCardTitle = styled.p`
    font-size: 30px;
    color: #909499;
    letter-spacing: 2px;
    font-weight: bold;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;`
    ;
const CustomIcon = styled.img`
    width: 100px;
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, 10%)
`
export default function MemberBenefitBlock() {
    const cardContent = [
        {icon: "", label: "Welcoming Newcomers", slogan: "Embracing Opportunities for Newbies.",content: ["Free listing of 5 NFT product for new member.", "Free gas of 5 NFT transaction for new member"]},
        {icon: "", label: "Optimized Interface", slogan: "Streamlined User Experience and Freedom.", content: ["Using shyft API with high performace","The ability to custom meta data, increase NFT indenfy"]},
        {icon: "", label: "Supportive Community", slogan: "Ready to Help and Guide by community.", content: ["The large comunity. Ready to support every time!", "The staff has high responsibility."]}
    ]
    return(
        <div className={cx("slicing-memeber-block")}>
            {cardContent.map((card, index) => {
                return (
                        <div key = {index} className={cx("card")}>
                            <CustomCardTitle>{card.label}</CustomCardTitle>
                            <hr></hr>
                            <span>{card.slogan}</span>
                            <div className={cx("content")}>
                                {
                                    card.content.map((content, key) => {
                                        return (
                                            <p key={key}>- {content}</p>
                                        )
                                    })
                                }
                            </div>
                            <CustomIcon src={solanaCoin} alt='Solana coin'/>
                        </div>
                )
            })}
        </div>
    )
}