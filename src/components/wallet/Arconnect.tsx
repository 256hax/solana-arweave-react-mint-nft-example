import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Grid, Button, Divider } from '@mui/material';
import Arweave from 'arweave';

// For "Property 'arweaveWallet' does not exist on type 'Window'." error.
interface Window {
  arweaveWallet: any
}
declare var window: Window

export const Arconnect = () => {
  const[valueConnectLabel, setConnectLabel] = useState('Connect');

  useEffect(() => {
    const initConnectLabel = async() => {
      // ArConnect need to waiting time for load wallet.
      const _sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      await _sleep(200); // 100 == 0.1 sec

      setConnectLabel(await getConnectLabel());
    };
    initConnectLabel();
  }, []);

  async function getConnectLabel() {
    try {
      const address = await window.arweaveWallet.getActiveAddress();
      return address;
    } catch(e) {
      return 'Connect ArConnect';
    }
  }

  const arweave = Arweave.init({
    // --- Localnet ---
    // host: '127.0.0.1',
    // port: 1984,
    // protocol: 'http'

    // --- Testnet powered by https://redstone.finance ---
    host: 'testnet.redstone.tools',
    port: 443,
    protocol: 'https'
  });

  async function connectWallet() {
    if (window.arweaveWallet) {
      // Permissions: https://github.com/th8ta/ArConnect#permissions
      await window.arweaveWallet.connect([
          'ACCESS_ADDRESS',
          'SIGN_TRANSACTION'
      ]);
      const address = await window.arweaveWallet.getActiveAddress();

      setConnectLabel(await getConnectLabel());
      console.log('ArConnect Connected! Public Key:', address);
    } else {
      console.log("Couldn't find ArConnect on your browser.");
    }
  }

  async function disconnetWallet() {
    await window.arweaveWallet.disconnect();

    setConnectLabel(await getConnectLabel());
    console.log('Disconnected!');
  }

  async function getBalance() {
    const address = await window.arweaveWallet.getActiveAddress();
    const balance = await arweave.wallets.getBalance(address);
    const ar = arweave.ar.winstonToAr(balance);

    console.log(balance, 'Winston');
    console.log(ar, 'AR');
  }

  async function airdrop() {
    const address = await window.arweaveWallet.getActiveAddress();
    // 100 AR = 100000000000000 Winston
    const response = await arweave.api.get('mint/' + address + '/100000000000000');
    console.log(response);
  }

  return(
    <Box>
      <Divider textAlign="left" sx={{mt: 2, mb: 2}}>
        Connect Wallet(ArConnect)
      </Divider>

      <Grid container>
        <Grid item xs={3}>
          <Button variant="contained" color="secondary" onClick={connectWallet}
            sx={{
              // Style for ellipsis
              width: "100%",
              maxWidth: 180, // Fix this too if change Grid/Button width.
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textAlign: "left",
              display: "block",
              // End Style for ellipsis
            }}
          >
            {valueConnectLabel}
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" color="secondary" onClick={disconnetWallet}>
            Disconnect
          </Button>
        </Grid>
      </Grid>

      <Divider textAlign="left" sx={{mt: 2, mb: 2}}>
        Optional
      </Divider>

      <Grid container>
        <Grid item xs={3}>
          <Button variant="contained" color="secondary" onClick={getBalance}>
            Get Balance
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" color="secondary" onClick={airdrop}>
            Airdrop
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
