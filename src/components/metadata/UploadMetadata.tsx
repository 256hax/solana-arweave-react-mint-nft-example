import { useState, useContext, useEffect } from 'react';
import {
  Box,
  Tooltip,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  Link,
} from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { ArweaveClusterContext } from '../../providers/ArweaveCluster';
import { ArTransactionIdContext } from '../../providers/ArweaveTransactionId';
import { attributesType } from '../../types/metadata';
import { Attributes } from './Attributes';
import { ArweaveTools } from './ArweaveTools';
import { UploadFile } from './UploadFile';
import { getArweaveTransactionUrl } from '../../helpers/arweave';

// For "Property 'arweaveWallet' does not exist on type 'Window'." error.
interface Window {
  arweaveWallet: any,
  solana: any,
}
declare var window: Window

export const UploadMetadata = () => {
  const { arweave, changeArweaveCluster } = useContext(ArweaveClusterContext);

  // reference: https://github.com/solana-labs/wallet-adapter#usage
  const { publicKey, sendTransaction } = useWallet();

  useEffect(() => {
    const initCreatorsAddressLabel = async() => {
      // You need to wait a sec for loading wallet.
      const _sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      await _sleep(200); // 100 == 0.1 sec

      await setWalletAddressToCreatorsAddress();
    };
    initCreatorsAddressLabel();
  }, []);

  const setWalletAddressToCreatorsAddress = async() => {
    if(publicKey){
      setPropertiesCreatorsAddress(publicKey.toString());
    } else {
      setPropertiesCreatorsAddress('');
    }
  };

  const defaultValue: attributesType = {
    type: '',
    value: '',
  };

  const { valueArTransactionId, setNewArTransactionId } = useContext(ArTransactionIdContext);

  // --- Metadata Summary ---
  const [valueName, setName] = useState('');
  const [valueSymbol, setSymbol] = useState('');
  const [valueDescription, setDescription] = useState('');
  const [valueSellerFeeBasisPoints, setSellerFeeBasisPoints] = useState('0');
  const [valueImage, setImage] = useState('');
  const [valueExternalUrl, setExternalUrl] = useState('');

  // --- Metadata Collction ---
  const [valueCollectionName, setCollectionName] = useState('');
  const [valueCollectionFamily, setCollectionFamily] = useState('');

  // --- Metadata Atrributes ---
  const [valueAttributes, setAttributes] = useState([defaultValue]);
  // --- Metadata Creators ---
  const [valuePropertiesCreatorsAddress, setPropertiesCreatorsAddress] = useState('');
  const [valuePropertiesCreatorsShare, setPropertiesCreatorsShare] = useState('100');

  const sendMetadataTransaction = async() => {
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
      attributes: valueAttributes,
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
  };

  return (
    <Box>
      <Box>
        <Typography>
          Upload Metadata to Arweave. Input Example:&nbsp;
          <Link
            href="https://docs.metaplex.com/token-metadata/Versions/v1.0.0/nft-standard"
            target="_blank">
            Metaplex
          </Link>
          &nbsp;|&nbsp;
          <Link
            href="https://arweave.net/3wXyF1wvK6ARJ_9ue-O58CMuXrz5nyHEiPFQ6z5q02E"
            target="_blank"
          >
            Arweave
          </Link>
          &nbsp;|&nbsp;
          <Link
            href="https://explorer.solana.com/address/9ARngHhVaCtH5JFieRdSS5Y8cdZk2TMF4tfGSWFB9iSK/metadata"
            target="_blank">
            Solana Explorer
          </Link>
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

        <TextField
          value={valueName}
          onChange={event => setName(event.target.value)}
          label="Name"
        />
        <TextField
          value={valueSymbol}
          onChange={event => setSymbol(event.target.value)}
          label="Symbol"
        />
        <TextField
          value={valueDescription}
          onChange={event => setDescription(event.target.value)}
          label="Description"
          fullWidth
          multiline
          maxRows={4}
        />
        <TextField
          value={valueSellerFeeBasisPoints}
          onChange={event => setSellerFeeBasisPoints(event.target.value)}
          label="Seller Fee(100 = 1%)"
        />
        <TextField
          value={valueImage}
          onChange={event => setImage(event.target.value)}
          label="Image URL"
        />
        <TextField
          value={valueExternalUrl}
          onChange={event => setExternalUrl(event.target.value)}
          label="External Url"
        />

        <Divider textAlign="left" sx={{mt: 2, mb: 2}}>Collections</Divider>

        <TextField
          value={valueCollectionName}
          onChange={event => setCollectionName(event.target.value)}
          label="Collection Name"
        />
        <TextField
          value={valueCollectionFamily}
          onChange={event => setCollectionFamily(event.target.value)}
          label="Collection Family"
        />

        <Divider textAlign="left" sx={{mt: 2, mb: 2}}>Attributes</Divider>

        <Attributes stateValue={valueAttributes} stateSetValue={setAttributes} />

        <Divider textAlign="left" sx={{mt: 2, mb: 2}}>Creators</Divider>

        <Tooltip title={valuePropertiesCreatorsAddress} arrow>
          <TextField
            value={valuePropertiesCreatorsAddress}
            onChange={event => setPropertiesCreatorsAddress(event.target.value)}
            label="Creators Address"
            color="primary"
            focused
          />
        </Tooltip>

        <TextField
          value={valuePropertiesCreatorsShare}
          onChange={event => setPropertiesCreatorsShare(event.target.value)}
          label="Creators Share(%)"
        />

        <Typography>Note: Creators Address must be your wallet address for Solana.</Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Grid container>
          <Grid item xs={4}>
            <Button variant="contained" color="primary" onClick={sendMetadataTransaction}>Send Transaction (wait a sec)</Button>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 2 }}>
          <Typography>
            Arweave Transaction ID: &nbsp;
            <Link href={getArweaveTransactionUrl(arweave.api.config, valueArTransactionId)} target="_blank">
              {valueArTransactionId}
            </Link>
          </Typography>
        </Grid>
      </Box>

      <UploadFile />
      <ArweaveTools />
    </Box>
  );
}
