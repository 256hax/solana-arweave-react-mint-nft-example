import { useContext, useState } from 'react';
import { clusterApiUrl, Connection, } from '@solana/web3.js';
import { AnchorProvider } from "@project-serum/anchor";
import { actions } from '@metaplex/js';
import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
} from '@mui/material';

import { ArweaveClusterContext } from '../../providers/ArweaveCluster';
import { ArTransactionIdContext } from '../../providers/ArweaveTransactionId';
import { getArweaveTransactionUrl } from '../../helpers/arweave';

import { SolanaClusterContext } from '../../providers/SolanaCluster';
import { getSolanaTransactionUrl } from '../../helpers/solana';

// For "Property 'solana' does not exist on type 'Window & typeof globalThis'" error.
interface Window {
  solana: any
}
declare var window: Window

export const MintNft = () => {
  const { arweave, changeArweaveCluster } = useContext(ArweaveClusterContext);
  const { valueArTransactionId, setNewArTransactionId } = useContext(ArTransactionIdContext);

  const { connection, changeSolanaCluster } = useContext(SolanaClusterContext);
  const [valueSolTransactionId, setSolTransactionId] = useState('');

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

    const mintNftResponse = await actions.mintNFT({
      connection,
      wallet: provider.wallet, // It need to match your wallet and creators address of Metadata.
      uri: getArweaveTransactionUrl(arweave.api.config, valueArTransactionId),
      maxSupply: 1
    });

    setSolTransactionId(mintNftResponse.mint.toString());

    console.log('mintNftResponse =>', mintNftResponse);
    console.log('mint =>', mintNftResponse.mint.toString());
    console.log('metadata =>', mintNftResponse.metadata.toString());
    console.log('edition =>', mintNftResponse.edition.toString());
  }

  return(
    <Box>
      <Box sx={{ mb:2 }}>
        <Typography>
          Mint NFT on Solana Chain.
        </Typography>
      </Box>

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          value={valueArTransactionId}
          label="Arweave Transaction ID"
          fullWidth
        />
        <Typography>Note: Minting allows when Creators Address equal to Your Address(ex: Phantom) in Metadata.</Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Grid container>
          <Grid item xs={4}>
            <Button variant="contained" color="secondary" onClick={sendTransaction}>Mint NFT (wait a sec)</Button>
          </Grid>
        </Grid>
        <Grid container>
          <Typography>
            Solana Transaction ID: &nbsp;
            <a href={getSolanaTransactionUrl(connection, valueSolTransactionId)} target="_blank">
              {valueSolTransactionId}
            </a>
          </Typography>
        </Grid>
      </Box>
    </Box>
  );
}
