// import { useState, useEffect } from "react";
// import axios from "axios";
// import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
// import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
// export default function TestingContent () {
//     const [walletId,setWalletId] = useState(null);
//     const [hasAccess,setAccess] = useState(false);
//     const [nfts, setNfts] = useState(null);

//     useEffect(() => {
//         let nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=devnet&address=${walletId}&update_authority=wallet_address_which_you_will_use_for_auth&refresh=refresh`;
//         const xKey = 'your-x-api-key-from-shyft-website'

//         axios({
//           url: nftUrl,
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "x-api-key": xKey,
//           },
//         })
//           .then((res) => {
//             console.log(res.data);
//             if (res.data.success === true) {
//               setNfts(res.data.result);
//             } 
//           })
//           // Catch errors if any
//           .catch((err) => {
//             console.warn(err);
            
//           });
//     }, [walletId]);
//     const connectWallet = async () => {
//         const { solana } = window;
        
//         if(!solana)
//         {
//             alert("Please Install Phantom");  
//         }
//         try{  
//             const network = "devnet";
//             const phantom = new PhantomWalletAdapter();
//             await phantom.connect();
//             const rpcUrl = clusterApiUrl(network);
//             const connection = new Connection(rpcUrl,"confirmed");
//             const wallet = {
//                 address: phantom.publicKey.toBase58(), //getting the wallet id in base 58 format
//             };  
//             if(wallet.address)
//             {
//                 const accountInfo = await connection.getAccountInfo(new PublicKey(wallet.address),"confirmed");
//                 console.log(accountInfo); 
//                 console.log('Wallet Connected'); 
//                 setWalletId(wallet.address); //setting the wallet id using reacts setState.
//             }
//         }
//         catch(err)
//         {
//             console.log(err);
//         }
//     }
//     return (
//         <div>
//             <button onClick={() => connectWallet()}>Hello world</button>
//         </div>
//     )
// } 