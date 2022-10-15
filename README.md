# solana-arweave-react-mint-nft-example
Mint NFT with React on Arweave and Solana chain for customizable example.  
Experiment purpose only.

This sample uses only Web3.js(Arweave, Solana and Metaplex) on React.  
I don't use Candy Machine v2 CLI, Metaplex Storefront, Next.js and Redux.

I tried to make minimal example so I don't think good UI/UX.  
Please refine depends on your project.

## Run
```
% npm install
% npm start
```

Open Developer Tools in Chrome.  
It will show log at "Console" menu.

## Frameworks / Packages Summary
### Frontend
- [Node.js - React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- [Node.js - create-react-app](https://create-react-app.dev/)
- [Node.js - MUI](https://mui.com/)

### Wallet
- [Browser Extension - ArConnect](https://www.arconnect.io/)
- [Browser Extension - Phantom](https://phantom.app/)

### Metadata
- [Web3.js - Arweave](https://docs.th8ta.org/arconnect/arweave-js)
- [Docs - Metaplex Token Metadata Standard](https://docs.metaplex.com/token-metadata/Versions/v1.0.0/nft-standard)
- [Docs - Phantom Non-Fungible Tokens (NFTs)](https://docs.phantom.app/best-practices/tokens/collectibles-nfts-and-semi-fungibles)

## Reinstall Pacakges
If you need to reinstall, run following

```
npm add @solana/web3.js
npm add @project-serum/anchor
npm add arweave
npm add @metaplex/js

npm add @solana/wallet-adapter-base \
         @solana/wallet-adapter-react \
         @solana/wallet-adapter-react-ui \
         @solana/wallet-adapter-wallets \
         @solana/web3.js
npm add @mui/material \
         @emotion/react \
         @emotion/styled

npm add assert
npm add chai
npm add stream
npm add @types/chai

npm add jest @types/jest ts-jest -D
```

## Screenshot
### 1. Connect ArConnect
<img src="https://github.com/256hax/solana-arweave-react-mint-nft-example/blob/main/docs/screenshot/1_connect_arconnect.png" width="600">  

### 2. Connect Phantom
<img src="https://github.com/256hax/solana-arweave-react-mint-nft-example/blob/main/docs/screenshot/2_connect_phantom.png" width="600">  

### 3. Upload Metadata
<img src="https://github.com/256hax/solana-arweave-react-mint-nft-example/blob/main/docs/screenshot/3_upload_metadata.png" width="600">  

### 4. Mint NFT
<img src="https://github.com/256hax/solana-arweave-react-mint-nft-example/blob/main/docs/screenshot/4_mint_nft.png" width="600">  

## TSX Main Compoment Structure

```
// --- index.tsx ----------------------------------------------------------
<App />

  // --- App.tsx ----------------------------------------------------------
  <Theme />

    // --- Theme.tsx ------------------------------------------------------
    <ThemeProvider theme={theme}>
      <Header />
      <ArweaveClusterContextProvider>     // Global value of selected Arweave Cluster
        <ArTransactionIdContextProvider>  // Global value of Arweave TX ID
          <SolanaClusterContextProvider>  // Global value of selected Solana Cluster
            <HorizontalLinearStepper />   // MUI Step Navigation


              // --- StepNavigation.tsx -----------------------------------


                // Navigation Step 1
                <Arconnect />             // Connect to ArConnect

                  // --- Arconnect.tsx ------------------------------------
                  <ArweaveClusterSelect>  // Select Arweave Cluster


                // Navigation Step 2
                <WalletAdapter step={step} />

                  // --- WalletAdapter.tsx --------------------------------
                  <ConnectWallet />       // Connect to Phantom

                    // --- ConnectWallet.tsx ------------------------------
                    <SolanaClusterSelect> // Select Solana Cluster


                // Navigation Step 3
                <WalletAdapter step={step} />

                    // --- WalletAdapter.tsx -------------------------------
                    <UploadMetadata />    // Upload Metadata to Arweave

                    // --- UploadMetadata.tsx -------------------------------
                    <UploadFile />        // Upload Image to Arweave
                    <ArweaveTools />      // Arweave Tools(get balance, airdrop)


                // Navigation Step 4
                <WalletAdapter step={step} />

                    // --- WalletAdapter.tsx -------------------------------
                    <MintNft />

                      // --- MintNft.tsx -----------------------------------
                      <MintEdition />     // Mint Edition(Copy NFT from Master)
```


## Troubleshooting
If you get no response when send transaction,
- check your cluster settings(devnet/testnet) on your Wallet(ArConnect/Phantom).
- check your balance.

## Note
If you need more easy to upload image and metadata for Arweave, check Metaplex web3.js. They have very useful SDK.  

Write only this code for upload image and metadata! like this:


```
  const metaplex = Metaplex.make(connection)
      .use(keypairIdentity(wallet))
      .use(bundlrStorage({
          address: 'https://devnet.bundlr.network',
          providerUrl: 'https://api.devnet.solana.com',
          timeout: 60000,
      }));

  const { uri } = await metaplex
      .nfts()
      .uploadMetadata({
          name: "My NFT Metadata",
          description: "My description",
          image: "https://placekitten.com/200/300",
      })
      .run();

  const { nft } = await metaplex
      .nfts()
      .create({
          uri: uri,
          name: "My NFT",
          sellerFeeBasisPoints: 500, // Represents 5.00%.
          maxSupply: toBigNumber(1),
      })
      .run();
```

- [Metaplex JavaScript SDK](https://github.com/metaplex-foundation/js)
- [Metaplex Examples - 256hax GitHub](https://github.com/256hax/solana-anchor-react-minimal-example/tree/main/scripts/metaplex)

## Reference
- [Solana Cookbook - Non Fungible Tokens (NFTs)](https://solanacookbook.com/references/nfts.html#how-to-create-an-nft)
- [Solana x Anchor x React Minimal Example](https://github.com/256hax/solana-anchor-react-minimal-example)
- [Web3.js - solana-labs wallet-adapter](https://github.com/solana-labs/wallet-adapter)
