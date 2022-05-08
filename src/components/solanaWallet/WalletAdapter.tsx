// Source: https://github.com/solana-labs/wallet-adapter
import { Fragment, FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    GlowWalletAdapter,
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import { Box } from '@mui/material';
import { ConnectWallet } from './ConnectWallet';
import { UploadMetadata } from '../metadata/UploadMetadata';
import { MintNft } from '../nft/MintNft';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

export const getStepContent = (step: number) => {
  switch (step) {
    case 1: // Step 2
      return(
        <ConnectWallet />
      );
    case 2: // Step 3
      return(
        <Fragment>
          <UploadMetadata />
        </Fragment>
      );
    case 3: // Step 4
      return(
        <Box>
          <MintNft />
        </Box>
      );
    default:
      return "unknown step";
  }
};

export const WalletAdapter: FC<{ step: number }> = (props) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                      { getStepContent(props.step)}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
