import { useContext, useState, useEffect } from 'react';
import { AnchorProvider } from "@project-serum/anchor";
import { actions } from '@metaplex/js';
import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  Card,
  CardMedia,
  Link,
} from '@mui/material';

import { ArweaveClusterContext } from '../../providers/ArweaveCluster';
import { ArTransactionIdContext } from '../../providers/ArweaveTransactionId';
import { getArweaveTransactionUrl } from '../../helpers/arweave';

import { SolanaClusterContext } from '../../providers/SolanaCluster';
import { getSolanaTransactionUrl } from '../../helpers/solana';
import { MintEdition } from './MintEdition';

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
  const [valueMaxSupply, setMaxSupply] = useState('1');

  const [valueNftImage, setNftImage] = useState('');

  useEffect(() => {
    const getNftImage = async() => {
      const tx_api_get_decoded = await arweave.api.get('/' + valueArTransactionId);
      setNftImage(tx_api_get_decoded.data.image);
    };
    getNftImage();
  }, []);

  const getProvider = async() => {
    const wallet = window.solana;

    const provider = new AnchorProvider(
      connection, wallet, { commitment: 'processed' }
    );
    return provider;
  };

  const sendTransaction = async() => {
    const provider = await getProvider();

    // Note:
    //  Uploading Arweave json data need to comply Token Metadata Starndard(Metaplex).
    //  Details: https://docs.metaplex.com/token-metadata/specification
    //  Example: https://arweave.net/3wXyF1wvK6ARJ_9ue-O58CMuXrz5nyHEiPFQ6z5q02E

    const mintNftResponse = await actions.mintNFT({
      connection,
      wallet: provider.wallet, // It need to match your wallet and creators address of Metadata.
      uri: getArweaveTransactionUrl(arweave.api.config, valueArTransactionId),
      maxSupply: Number(valueMaxSupply),
    });

    setSolTransactionId(mintNftResponse.mint.toString());

    console.log('mintNftResponse =>', mintNftResponse);
    console.log('mint =>', mintNftResponse.mint.toString());
    console.log('metadata =>', mintNftResponse.metadata.toString());
    console.log('edition =>', mintNftResponse.edition.toString());
  };

  return(
    <Box>
      <Box sx={{ mb: 2 }}>
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
          value={valueMaxSupply}
          label="Max Supply"
          onChange={event => setMaxSupply(event.target.value)}
        />

        <TextField
          value={valueArTransactionId}
          label="Arweave Transaction ID"
          fullWidth
        />
      </Box>

      <Box>
        <Card sx={{ maxWidth: 200, mb: 4, ml: 1 }}>
          <CardMedia
            component="img"
            alt="Mint NFT Image"
            height="200"
            image={valueNftImage}
          />
        </Card>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Grid container>
          <Grid item xs={4}>
            <Button variant="contained" color="primary" onClick={sendTransaction}>Mint NFT (wait a sec)</Button>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 2 }}>
          <Typography>
            Solana Transaction ID: &nbsp;
            <Link href={getSolanaTransactionUrl(connection, valueSolTransactionId)} target="_blank">
              {valueSolTransactionId}
            </Link>
          </Typography>
        </Grid>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Grid container>
          <Grid item>
            <Typography>Note: Minting allows when Creators Address equal to Your Address(ex: Phantom) in Metadata.</Typography>
          </Grid>
        </Grid>
      </Box>

      <MintEdition />
    </Box>
  );
}
