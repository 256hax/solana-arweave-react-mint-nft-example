import { useContext } from 'react';
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { ArweaveClusterContext } from '../../providers/ArweaveCluster';

export const ArweaveClusterSelect = () => {
  const { arweave, changeArweaveCluster } = useContext(ArweaveClusterContext);

  const onchangeArweaveCluster = (event: SelectChangeEvent) => {
    changeArweaveCluster(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Arweave Cluster</InputLabel>
        <Select
          value={arweave.api.config.host}
          label="Arweave Cluster"
          onChange={onchangeArweaveCluster}
        >
          <MenuItem value="127.0.0.1">Localnet (127.0.01)</MenuItem>
          <MenuItem value="www.arweave.run">Testnet (www.arweave.run)</MenuItem>
          <MenuItem value="testnet.redstone.tools">Testnet (testnet.redstone.tools)</MenuItem>
          <MenuItem value="arweave.net">Mainnet (arweave.net)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
