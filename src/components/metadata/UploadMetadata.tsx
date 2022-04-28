import { Button } from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import Arweave from 'arweave';
import { arTransactionIdContext } from '../../providers/ArTransactionId';

// For "Property 'arweaveWallet' does not exist on type 'Window'." error.
interface Window {
  arweaveWallet: any,
  solana: any,
}
declare var window: Window


export const UploadMetadata = () => {

  useEffect(() => {
    // const phantomAddress = getPhantomAddress();
  });

  const arweave = Arweave.init({
    // --- Localnet ---
    // host: '127.0.0.1',
    // port: 1984,
    // protocol: 'http'

    // --- Testnet ---
    // (Note: Tesnet powered by https://redstone.finance/)
    host: 'testnet.redstone.tools',
    port: 443,
    protocol: 'https'
  });

  const { valueArTransactionId, setNewArTransactionId } = useContext(arTransactionIdContext);
  const [blockId, setBlockId] = useState('not yet mined');

  // --- Metadata Summary ---
  const [valueName, setName] = React.useState('');
  const [valueSymbol, setSymbol] = React.useState('');
  const [valueDescription, setDescription] = React.useState('');
  const [valueSellerFeeBasisPoints, setSellerFeeBasisPoints] = useState('0');
  const [valueImage, setImage] = useState('');
  const [valueExternalUrl, setExternalUrl] = useState('');

  // --- Metadata Collction ---
  const [valueCollectionName, setCollectionName] = useState('');
  const [valueCollectionFamily, setCollectionFamily] = useState('');

  // --- Metadata Atrributes ---
  const [valueAttributesTraitType, setAttributesTraitType] = useState('');
  const [valueAttributesTraitValue, setAttributesTraitValue] = useState('');

  // --- Metadata Creators ---
  const [valuePropertiesCreatorsAddress, setPropertiesCreatorsAddress] = useState('');
  const [valuePropertiesCreatorsShare, setPropertiesCreatorsShare] = useState('100');

  async function setPhantomAddress() {
    try {
        const resp = await window.solana.connect();
        console.log('My Phantom Address =>', resp.publicKey.toString());
        setPropertiesCreatorsAddress(resp.publicKey.toString());
    } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
    }
  }

  async function sendTransaction() {
    // Token Metadata Standard: https://docs.metaplex.com/token-metadata/Versions/v1.0.0/nft-standard
    // Phantom: https://docs.phantom.app/best-practices/tokens/non-fungible-tokens
    const inputMetadata = {
      name: valueName,
      symbol: valueSymbol,
      description: valueDescription,
      seller_fee_basis_points: valueSellerFeeBasisPoints,
      image: valueImage,
      external_url: valueExternalUrl,
      collection: {
        name: valueCollectionName,
        family: valueCollectionFamily,
      },
      attributes: [
        {
          trait_type: valueAttributesTraitType,
          value: valueAttributesTraitValue,
        },
      ],
      properties: {
        creators: [
          {
            address: valuePropertiesCreatorsAddress,
            share: valuePropertiesCreatorsShare,
          }
        ]
      }
    };

    const data = JSON.stringify(inputMetadata);

    const transaction = await arweave.createTransaction({ data: data });
    await arweave.transactions.sign(transaction);
    setNewArTransactionId(transaction.id);
    console.log('Transaction =>', transaction);

    const uploader = await arweave.transactions.getUploader(transaction);
    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
    }
  }

  async function mineTransaction() {
    const response = await arweave.api.get('mine/');
    console.log(response);

    const transaction = await arweave.transactions.get(valueArTransactionId);
    setBlockId(transaction.block);
  }

  async function getTransaction() {
    const transaction = await arweave.transactions.get(valueArTransactionId);
    console.log(transaction);
  }

  async function getTransactionData() {
    const tx_api_get_base64 = await arweave.api.get('/tx/' + valueArTransactionId + '/data');
    console.log('Base64 Data =>', tx_api_get_base64.data);

    const tx_api_get_decoded = await arweave.api.get('/' + valueArTransactionId);
    console.log('Decoded Data =>', tx_api_get_decoded.data);
  }


  return (
    <Box>
      <Box>
        <Typography>
          Input Example:&nbsp;
          <a href="https://arweave.net/3wXyF1wvK6ARJ_9ue-O58CMuXrz5nyHEiPFQ6z5q02E" target="_blank">Arweave</a>
          &nbsp;|&nbsp;
          <a href="https://explorer.solana.com/address/9ARngHhVaCtH5JFieRdSS5Y8cdZk2TMF4tfGSWFB9iSK/metadata" target="_blank">Solana Explorer</a>
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

        <Divider textAlign="left" sx={{mt: 2, mb: 2}}>Summary</Divider>

        <TextField value={valueName} onChange={event => setName(event.target.value)} label="Name" />
        <TextField value={valueSymbol} onChange={event => setSymbol(event.target.value)} label="Symbol" />
        <TextField value={valueDescription} onChange={event => setDescription(event.target.value)} label="Description" />
        <TextField value={valueSellerFeeBasisPoints} onChange={event => setDescription(event.target.value)} label="Seller Fee(100 = 1%)" />
        <TextField value={valueImage} onChange={event => setImage(event.target.value)} label="Image URL" />
        <TextField value={valueExternalUrl} onChange={event => setExternalUrl(event.target.value)} label="External Url" />

        <Divider textAlign="left" sx={{mt: 2, mb: 2}}>Collections</Divider>

        <TextField value={valueCollectionName} onChange={event => setCollectionName(event.target.value)} label="Collection Name" />
        <TextField value={valueCollectionFamily} onChange={event => setCollectionFamily(event.target.value)} label="Collection Family" />

        <Divider textAlign="left" sx={{mt: 2, mb: 2}}>Attributes</Divider>

        <TextField value={valueAttributesTraitType} onChange={event => setAttributesTraitType(event.target.value)} label="Attributes Trait Type" />
        <TextField value={valueAttributesTraitValue} onChange={event => setAttributesTraitValue(event.target.value)} label="Attributes Trait Value" />

        <Divider textAlign="left" sx={{mt: 2, mb: 2}}>Creators</Divider>

        <TextField value={valuePropertiesCreatorsAddress} onChange={event => setPropertiesCreatorsAddress(event.target.value)} label="Properties Creators Address" />
        <Button onClick={setPhantomAddress}>set My Address</Button>
        <TextField value={valuePropertiesCreatorsShare} onChange={event => setPropertiesCreatorsShare(event.target.value)} label="Properties Creators Share(%)" />
        <p>Note: Creators Address must be your address.</p>
      </Box>



      <div>
        <div>
          <button onClick={sendTransaction}>Send Transaction(wait a sec)</button>
        </div>
        <div>
          <button onClick={mineTransaction}>Mine Transaction</button>
          <button onClick={getTransaction}>Get Transaction</button>
          <button onClick={getTransactionData}>Get Transaction Data</button>
          <button onClick={setPhantomAddress}>getPhantomAddress</button>
          <div>
            Sent Transaction:
            <div>Transaction ID: {valueArTransactionId}</div>
            <div>Block ID: {blockId}</div>
          </div>
        </div>
      </div>
    </Box>
  );
}
