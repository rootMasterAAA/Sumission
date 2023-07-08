import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./scss/TransactionSection.module.scss"
import classNames from "classnames/bind"
import { useContext, useEffect, useRef, useState } from "react"
import axios from "axios"
import AuthContext from "../../../context/AuthProvider"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom"
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js"
const cx = classNames.bind(styles)
export default function TransactionSection(){
    const {authTokens} = useContext(AuthContext)
    
    const [transaction, setTransaction] = useState(null)
    const [status, setStatus] = useState(null)
    const [openModal, setOpenModal] = useState(false)

    const transactionIDRef = useRef(null)
    
    useEffect(() => {
        transactionIDRef.current.focus()
    }, [])
    const solanaWalletConnection = async (e) => {
        e.preventDefault();
        const { solana } = window;
        let res = {success: false, message:"Could not connect wallet", addr:""};
        if(!solana)
        {
            alert("Please Install Phantom");
            return;
        }
        const network = "devnet";
        const phantom = new PhantomWalletAdapter();
        await phantom.connect();
        console.log(phantom.publicKey)
        const rpcURL = clusterApiUrl(network);
        const connection = new Connection(rpcURL, "confirmed");
        const wallet = {
            address: phantom.publicKey.toBase58(),
        }
        if (wallet.address){
            const accountInfo = await connection.getAccountInfo(new PublicKey(wallet.address),"confirmed");
            console.log(wallet.address)
        }
    }
    const shyftAPICreateNFTForms = async (publicKey) => {
        const formdata = new FormData();
        formdata.append();
        await axios.post("https://api.shyft.to/sol/v2/nft/create", {
            method: 'POST',
            headers: {
                "x-api-key": "Jmb6HtvTT6csvyi9",
                "Content-Type": "application/json"
            },
            body: formdata,
            redirect: "follow"
        }).then((respond) => {
            console.log(respond)
        }
        )
    }
    const handleModalPopup = () => {
        setOpenModal(!openModal)
        if (openModal === true){
            document.body.classList.add('active-modal')
        }
        else if (openModal === false){
            document.body.classList.remove('active-modal')
        }
    }


    const getTransactionForm = async (e) => {
        e.preventDefault()
        let value = transactionIDRef.current.value
        if (value != null){
            let url = `http://127.0.0.1:8000/transaction/get/${value}`
            await axios.get(url,
                {method: "GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${authTokens}`
            },})
            .then((respond) => {
                let respond_data = respond.data
                let json_location = JSON.parse(respond_data.location)
                let transaction = {
                    id: respond_data.transaction_id,
                    owner: respond_data.owner,
                    size: `${Math.abs(parseInt(json_location["upper_location"]["x"] - parseInt(json_location["lower_location"]["x"])))}x${Math.abs(parseInt(json_location["upper_location"]["z"]) - parseInt(json_location["lower_location"]["z"]))}`,
                    upper_location: `x: ${(json_location["upper_location"]["x"])}, z: ${(json_location["upper_location"]["z"])}`,
                    lower_location: `x: ${(json_location["lower_location"]["x"])}, z: ${(json_location["lower_location"]["z"])}`,
                    action: respond_data.action,
                    status: respond_data.status
                }
                setTransaction(transaction)
            }).catch((data) => {    
                let respond = data.response.data
                if (respond?.error_msg){
                    setStatus(respond.error_msg)
                    return
                }
                else{
                    setStatus("Not found")
                }
            }
        )
        }
    }
    return (
        <>
        <div className={cx("wrapper")}>
            <div className={cx("search-section")}>
                <label className = {cx("label-input")}htmlFor="transaction-id">Transaction ID</label>
                <input ref = {transactionIDRef} placeholder = "Enter your transaction id" id = "transaction-id"type = "text" className={cx("search-input")}/>
                <button onClick = {(e) => getTransactionForm(e)} className={cx("search-btn")}><FontAwesomeIcon icon={faSearch}/></button>
            </div>
            <div className={cx("search-result")}>
                <p className={cx("error-message")}>{status ? status : <></>}</p>
                {transaction ? (
                    <div className={cx("table-wrapper")}>
                    <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Owner</th>
                            <th>Size</th>
                            <th>Upper location</th>
                            <th>Lower location</th>
                            <th>Action</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>{transaction.id}</th>
                            <th>{transaction.owner}</th>
                            <th>{transaction.size}</th>
                            <th>{transaction.upper_location}</th>
                            <th>{transaction.lower_location}</th>
                            <th>{transaction.action}</th>
                            <th>{transaction.status}</th>
                            <th><button onClick={handleModalPopup}>Execute</button></th>
                        </tr>
                    </tbody>
                  </table>
                  </div>
                ): <></>}
            </div>
        </div>
        {openModal ? <div className={cx("overlay")}></div> : <></>}
        {openModal ? <div className={cx("Modal-wrapper")}>
        <button className={cx("Modal-btn")} onClick={() => {setOpenModal(false)}}><FontAwesomeIcon icon={faClose}/></button>
        <form className={cx("NFT-forms")}>
        <label htmlFor= "network">Network</label>
        <select id = "network">
            <option>Mainnet</option>
            <option>Devnet</option>
            <option>Testnet</option>
        </select>
        <button onClick={solanaWalletConnection}>Connect to wallet</button>
        </form>
        </div>:<></>}
        </>
    )
}