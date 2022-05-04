import { useContext } from 'react';
import { clusterApiUrl, Connection, } from '@solana/web3.js';
import { AnchorProvider } from "@project-serum/anchor";
import { actions } from '@metaplex/js';
import {
  Box,
  Grid,
  Button,
  Typography,
} from '@mui/material';
import { arTransactionIdContext } from '../../providers/ArTransactionId';

// For "Property 'solana' does not exist on type 'Window & typeof globalThis'" error.
interface Window {
  solana: any
}
declare var window: Window

export const MintNft = () => {
  const { valueArTransactionId, setNewArTransactionId } = useContext(arTransactionIdContext);

  // Localnet
  // const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Devnet
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  async function getProvider() {
    const wallet = window.solana;

    const provider = new AnchorProvider(
      connection, wallet, { commitment: 'processed' }
    );
    return provider;
  }

  async function sendTransaction() {
    const provider = await getProvider();

    // Note:
    //  Uploading Arweave json data need to comply Token Metadata Starndard(Metaplex).
    //  Details: https://docs.metaplex.com/token-metadata/specification
    //  Example: https://arweave.net/3wXyF1wvK6ARJ_9ue-O58CMuXrz5nyHEiPFQ6z5q02E

    const txId = valueArTransactionId;

    // --- Localnet ---
    // const uri = 'http://127.0.0.1:1984/'; // Localnet

    // --- Testnet ---
    // Note: Tesnet powered by https://redstone.finance/
    const uri = 'https://testnet.redstone.tools/';
    // const txId = 'vUOW3yPQiLBnVhU1XpyBeHeraxP9C4_OLkioHMCxhQY'; // Stub

    // --- Mainnet ---
    // const uri = 'https://arweave.net/';
    // const txId = '8aghhbZGkA8rsi6lTtkMq6eNOLBTUM54Jitjk8A_wNo'; // Stub

    const mintNftResponse = await actions.mintNFT({
      connection,
      wallet: provider.wallet, // It need to match your wallet and creators address of Metadata.
      uri: uri + txId,
      maxSupply: 1
    });

    console.log('mintNftResponse =>', mintNftResponse);
    console.log('mint =>', mintNftResponse.mint.toString());
    console.log('metadata =>', mintNftResponse.metadata.toString());
    console.log('edition =>', mintNftResponse.edition.toString());
  }

  return(
    <Box>
      <Box sx={{ mb:3 }}>
        <Typography>
          Mint NFT on Solana Chain.
        </Typography>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Grid container>
          <Grid item xs={4}>
            <Button variant="contained" color="secondary" onClick={sendTransaction}>Mint NFT</Button>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography>Note: Mint only allows if Creators Address equal to Your Address(Phantom) in Metadata.</Typography>
      </Box>
    </Box>
  );
}
