import Arweave from 'arweave';
import { useState } from 'react';
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

export const UploadFile = () => {
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

  const [valueFile, setFile] = useState<File>();

  const changeHandler = (event: any) => {
    // "files[0]" means Disable multiple selected.
    setFile(event.target.files[0]);
   };

  async function sendTransaction() {
    const data = await valueFile?.arrayBuffer();

    const transaction = await arweave.createTransaction({ data: data });
    await arweave.transactions.sign(transaction);
    console.log('Transaction =>', transaction);

    const uploader = await arweave.transactions.getUploader(transaction);
    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
    }
  }

  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>(Optional) Upload Image</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={5}>
              <input type="file" onChange={changeHandler} />
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" color="secondary" onClick={sendTransaction}>Upload to Arweave</Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
