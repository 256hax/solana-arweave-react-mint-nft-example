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
- [Docs - Phantom Non-Fungible Tokens (NFTs)](https://docs.phantom.app/best-practices/tokens/non-fungible-tokens)

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

### NFT
- [Web3.js - solana-labs wallet-adapter](https://github.com/solana-labs/wallet-adapter)
- [Web3.js - Metaplex actions mintNFT](https://metaplex-foundation.github.io/js/modules/actions.html#mintNFT)

## Screenshot
### 1. Connect ArConnect
<img src="https://github.com/256hax/solana-arweave-react-mint-nft-example/blob/main/docs/screenshot/1_connect_arconnect.png" width="600">  

### 2. Connect Phantom
<img src="https://github.com/256hax/solana-arweave-react-mint-nft-example/blob/main/docs/screenshot/2_connect_phantom.png" width="600">  

### 3. Upload Metadata
<img src="https://github.com/256hax/solana-arweave-react-mint-nft-example/blob/main/docs/screenshot/3_upload_metadata.png" width="600">  

### 4. Mint NFT
<img src="https://github.com/256hax/solana-arweave-react-mint-nft-example/blob/main/docs/screenshot/4_mint_nft.png" width="600">  

## Troubleshooting
If you get no response when send transaction,
- check your cluster settings(devnet/testnet) on your Wallet(ArConnect/Phantom).
- check your balance.

## Reference
- [Solana Cookbook - Non Fungible Tokens (NFTs)](https://solanacookbook.com/references/nfts.html#how-to-create-an-nft)
- [Solana x Anchor x React Minimal Example](https://github.com/256hax/solana-anchor-react-minimal-example)
