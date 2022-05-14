import { useContext, useState, useEffect } from 'react';
import { Box, Grid, Button, Divider, Typography } from '@mui/material';
import { ArweaveClusterContext } from '../../providers/ArweaveCluster';
import { ArweaveClusterSelect } from './ArweaveClusterSelect';

// For "Property 'arweaveWallet' does not exist on type 'Window'." error.
interface Window {
  arweaveWallet: any
}
declare var window: Window

export const Arconnect = () => {
  const { arweave, changeArweaveCluster } = useContext(ArweaveClusterContext);

  const[valueConnectLabel, setConnectLabel] = useState('...');

  useEffect(() => {
    const initConnectLabel = async() => {
      // You need to wait a sec for loading wallet.
      const _sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      await _sleep(200); // 100 == 0.1 sec

      await updateConnectLabel();
    };
    initConnectLabel();
  }, []);

  const updateConnectLabel = async() => {
    try {
      const address = await window.arweaveWallet.getActiveAddress();
      setConnectLabel(address);
    } catch(e) {
      setConnectLabel('Connect ArConnect');
    }
  };

  const connectWallet = async() => {
    if (window.arweaveWallet) {
      // Permissions: https://github.com/th8ta/ArConnect#permissions
      await window.arweaveWallet.connect([
          'ACCESS_ADDRESS',
          'SIGN_TRANSACTION'
      ]);
      const address = await window.arweaveWallet.getActiveAddress();

      await updateConnectLabel();
      console.log('Connected to ArConnect =>', address);
    } else {
      console.log("Couldn't find ArConnect on your browser.");
    }
  };

  const disconnetWallet = async() => {
    await window.arweaveWallet.disconnect();

    await updateConnectLabel();
    console.log('Disconnected!');
  };

  const getBalance = async() => {
    const address = await window.arweaveWallet.getActiveAddress();
    const balance = await arweave.wallets.getBalance(address);
    const ar = arweave.ar.winstonToAr(balance);

    console.log(balance, 'Winston');
    console.log(ar, 'AR');
  };

  const airdrop = async() => {
    const address = await window.arweaveWallet.getActiveAddress();
    // 100 AR = 100000000000000 Winston
    const response = await arweave.api.get('mint/' + address + '/100000000000000');
    console.log(response);
  };

  // Ellipsis for MUI Button
  const connectButtonSX = {
    width: "100%",
    maxWidth: 180, // Fix this too if change outer Grid/Button width.
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textAlign: "left",
    display: "block",
  };

  return(
    <Box>

      <Divider textAlign="left" sx={{mt: 2, mb: 2}}>Select Cluster</Divider>

      <Grid container>
        <Grid item xs={6}>
          <ArweaveClusterSelect />
        </Grid>
      </Grid>

      <Divider textAlign="left" sx={{mt: 2, mb: 2}}>Connect Wallet(ArConnect)</Divider>

      <Grid container>
        <Grid item xs={3}>
          <Button variant="contained" color="primary" onClick={connectWallet} sx={connectButtonSX}>
            {valueConnectLabel}
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" color="primary" onClick={disconnetWallet}>
            Disconnect
          </Button>
        </Grid>
      </Grid>

      <Divider textAlign="left" sx={{mt: 2, mb: 2}}>Change Wallet Settings</Divider>

      <Grid container>
        <Grid item xs={12}>
          <Typography>
            Change cluster on your ArConnect.
          </Typography>
          <Typography>
            Start ArConnect &gt; Settings &gt; Gateway &gt; select Gateway
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
}
