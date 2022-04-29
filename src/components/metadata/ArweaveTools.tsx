import Arweave from 'arweave';
import { useContext } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import { arTransactionIdContext } from '../../providers/ArTransactionId';

export const ArweaveTools = () => {
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

  async function mineTransaction() {
    console.log(arweave);
    const response = await arweave.api.get('mine/');
    console.log(response);

    const transaction = await arweave.transactions.get(valueArTransactionId);
    console.log(transaction.block);
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>ArWeave Tools for Local(ArLocal)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={3}>
              <Button variant="contained" color="secondary" onClick={mineTransaction}>Mine Transaction</Button>
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" color="secondary" onClick={getTransaction}>Get Transaction</Button>
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" color="secondary" onClick={getTransactionData}>Get Uploaded Data</Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
