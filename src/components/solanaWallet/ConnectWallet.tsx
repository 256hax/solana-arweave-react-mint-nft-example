import { useContext } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { AnchorProvider } from "@project-serum/anchor";
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { Box, Divider, Grid, Typography, Button } from '@mui/material';
import { SolanaClusterContext } from '../../providers/SolanaCluster';
import { SolanaClusterSelect } from './SolanaClusterSelect';

// For "Property 'solana' does not exist on type 'Window & typeof globalThis'" error.
interface Window {
  solana: any
}
declare var window: Window

export const ConnectWallet = () => {
  const { connection, changeSolanaCluster } = useContext(SolanaClusterContext);

  const getProvider = async() => {
    const wallet = window.solana;

    const provider = new AnchorProvider(
      connection, wallet, { commitment: 'processed' }
    );
    return provider;
  }

  const getBalance = async() => {
    const provider = await getProvider();
    const connection = provider.connection;
    const balance = await connection.getBalance(provider.wallet.publicKey);
    console.log('Balance:', balance / LAMPORTS_PER_SOL, 'SOL');
  };

  const airdrop = async() => {
    const provider = await getProvider();
    const connection = provider.connection;
    const wallet = provider.wallet.publicKey;

    const airdropSignature = await connection.requestAirdrop(
        wallet,
        LAMPORTS_PER_SOL,
    );

    try {
      await connection.confirmTransaction(airdropSignature);
      console.log('You got an 1 SOL!');
    } catch (err) {
      console.log('Transaction Error: ', err);
    }
  };

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

      <Divider textAlign="left" sx={{mt: 2, mb: 2}}>Change Wallet Settings</Divider>

      <Grid container>
        <Grid item xs={12}>
          <Typography>
            Change cluster on your Phantom.
          </Typography>
          <Typography>
            Start Phantom &gt; Settings &gt; Change Network &gt; select cluster
          </Typography>
        </Grid>
      </Grid>

      <Divider textAlign="left" sx={{mt: 2, mb: 2}}>Optional</Divider>

      <Grid container>
        <Grid item xs={3}>
          <Button variant="outlined" color="primary" onClick={getBalance}>
            Get Balance
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant="outlined" color="primary" onClick={airdrop}>
            Airdrop
          </Button>
        </Grid>
      </Grid>

    </Box>
  );
};
