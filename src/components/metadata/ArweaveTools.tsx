import { useContext } from 'react';
import Arweave from 'arweave';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ArweaveClusterContext } from '../../providers/ArweaveCluster';
import { arTransactionIdContext } from '../../providers/ArweaveTransactionId';

export const ArweaveTools = () => {
  const { valueCluster, changeCluster } = useContext(ArweaveClusterContext);
  const arweave = Arweave.init({
    host: valueCluster.host,
    port: valueCluster.port,
    protocol: valueCluster.protocol,
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
    <Box sx={{ mt: 1}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>(Optional) ArWeave Tools for Local(ArLocal)</Typography>
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
