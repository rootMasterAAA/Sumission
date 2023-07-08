import {
    clusterApiUrl,
    Keypair,
    PublicKey,
    SystemProgram,
    Transaction,
    Connection
  } from '@solana/web3.js';
import { Buffer } from 'buffer';
window.Buffer = Buffer
const createTransferInstrucion = async () => {
  const fromPubKey = new PublicKey('GE4kh5FsCDWeJfqLsKx7zC9ijkqKpCuYQxh8FYBiTJe');
  const tx = new Transaction().add(SystemProgram.transfer({
  fromPubkey: fromPubKey,
  toPubkey: new PublicKey('AaYFExyZuMHbJHzjimKyQBAH1yfA9sKTxSzBc6Nr5X4s'),
  lamports: 100000000,
  }));
  const connection = new Connection(clusterApiUrl("devnet"), 'confirmed');
  const blockHash = (await connection.getLatestBlockhash('finalized')).blockhash;
  console.log(blockHash)
  tx.feePayer = fromPubKey;
  tx.recentBlockhash = blockHash;
  const serializedTransaction = tx.serialize({ requireAllSignatures: false, verifySignatures: true });
  const transactionBase64 = serializedTransaction.toString('base64');
  return { 
  encoded_transaction: transactionBase64 
  };
}
export default createTransferInstrucion