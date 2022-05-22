// Ref: https://metaplex-foundation.github.io/js/modules/actions.html#mintEditionFromMaster
import { useContext, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { AnchorProvider } from "@project-serum/anchor";
import { actions } from '@metaplex/js';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Button,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { SolanaClusterContext } from '../../providers/SolanaCluster';
import { getSolanaTransactionUrl } from '../../helpers/solana';

// For "Property 'solana' does not exist on type 'Window & typeof globalThis'" error.
interface Window {
  solana: any
}
declare var window: Window

export const MintEdition = () => {
  const { connection, changeSolanaCluster } = useContext(SolanaClusterContext);
  const [valueMasterEditionAddress, setMasterEditionAddress] = useState('');

  const getProvider = async() => {
    const wallet = window.solana;

    const provider = new AnchorProvider(
      connection, wallet, { commitment: 'processed' }
    );
    return provider;
  };

  const mintEdition = async() => {
    const provider = await getProvider();

    const mintEditionResponse = await actions.mintEditionFromMaster({
      connection,
      wallet: provider.wallet, // It need to match your wallet and creators address of Metadata.
      masterEditionMint: new PublicKey(valueMasterEditionAddress), // Master Edition Public Key
    });

    const mintAddress = mintEditionResponse.mint.toString();
    console.log('Mint Address =>', getSolanaTransactionUrl(connection, mintAddress));
  };

  return (
    <Box sx={{ mt: 1}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>(Option) Mint Edition (Copy NFT from Master Edition)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              value={valueMasterEditionAddress}
              label="Master Edition Address in Solana"
              onChange={event => setMasterEditionAddress(event.target.value)}
              fullWidth
            />
            <Grid container>
              <Typography>
                Note: "Max Supply" of Master Edition need more than 1.
              </Typography>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                <Button variant="outlined" color="primary" onClick={mintEdition}>Mint Edition</Button>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
