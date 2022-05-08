import { useContext } from 'react';
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
import { ArTransactionIdContext } from '../../providers/ArweaveTransactionId';
import { getTransactionUrl } from '../../helpers/arweave';

export const ArweaveTools = () => {
  const { arweave, changeCluster } = useContext(ArweaveClusterContext);

  const { valueArTransactionId, setNewArTransactionId } = useContext(ArTransactionIdContext);

  async function mineTransaction() {
    const response = await arweave.api.get('mine/');
    console.log(response);

    const transaction = await arweave.transactions.get(valueArTransactionId);
    console.log(transaction.block);
  }

  async function getTransaction() {
    const transaction = await arweave.transactions.get(valueArTransactionId);
    console.log(transaction);

    const url = getTransactionUrl(arweave.api.config, valueArTransactionId);
    console.log('Transaction URL =>', url);
  }

  async function getUploadedData() {
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
          <Typography>(Optional) ArWeave Tools</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={4}>
              <Button variant="contained" color="secondary" onClick={mineTransaction}>Mine Transaction(for Localnet)</Button>
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" color="secondary" onClick={getTransaction}>Get Transaction</Button>
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" color="secondary" onClick={getUploadedData}>Get Uploaded Data</Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
