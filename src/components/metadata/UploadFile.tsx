import { useContext, useState } from 'react';
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
import { ArweaveClusterContext } from '../../providers/ArweaveClusterContextProvider';

export const UploadFile = () => {
  const { valueCluster, changeCluster } = useContext(ArweaveClusterContext);
  const arweave = Arweave.init({
    host: valueCluster.host,
    port: valueCluster.port,
    protocol: valueCluster.protocol,
  });

  const [valueFile, setFile] = useState<File>();

  const changeHandler = (event: any) => {
    // "files[0]" means Disable multiple selected.
    setFile(event.target.files[0]);
   };

  async function sendTransaction() {
    if(valueFile) {
      const data = await valueFile.arrayBuffer();

      const transaction = await arweave.createTransaction({ data: data });
      await arweave.transactions.sign(transaction);
      console.log('Transaction =>', transaction);

      const uploader = await arweave.transactions.getUploader(transaction);
      while (!uploader.isComplete) {
        await uploader.uploadChunk();
        console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
      }
    } else {
      console.log('Undefined image');
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
          <Box sx={{ mb: 2 }}>
            <Typography>Upload image before Send Transaction.</Typography>
          </Box>
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
