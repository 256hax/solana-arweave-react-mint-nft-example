import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { Box, Divider, Grid } from '@mui/material';
import { SolanaClusterSelect } from './SolanaClusterSelect';


export const ConnectWallet = () => {
  return(
    <Box>

      <Divider textAlign="left" sx={{mt: 2, mb: 2}}>Select Cluster</Divider>

      <Grid container>
        <Grid item xs={6}>
          <SolanaClusterSelect />
        </Grid>
      </Grid>

      <Divider textAlign="left" sx={{mt: 2, mb: 2}}>Connect Wallet(ArConnect)</Divider>

      <Grid container>
        <Grid item xs={3}>
          <WalletMultiButton />
        </Grid>
        <Grid item xs={3}>
          <WalletDisconnectButton />
        </Grid>
      </Grid>

    </Box>
  );
};
