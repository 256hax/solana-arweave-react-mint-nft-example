import { useContext, useState } from 'react';
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
  const { valueCluster, changeCluster } = useContext(ArweaveClusterContext);

  const onChangeCluster = (event: SelectChangeEvent) => {
    changeCluster(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Arweave Cluster</InputLabel>
        <Select
          value={valueCluster.cluster}
          label="Arweave Cluster"
          onChange={onChangeCluster}
        >
          <MenuItem value="localnet">Localnet (127.0.01)</MenuItem>
          <MenuItem value="testnet">Testnet (www.arweave.run)</MenuItem>
          <MenuItem value="testnet_redstone">Testnet (testnet.redstone.tools)</MenuItem>
          <MenuItem value="mainnet">Mainnet (arweave.net)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
