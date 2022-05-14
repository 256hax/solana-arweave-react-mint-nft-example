import { useContext } from 'react';
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { SolanaClusterContext } from '../../providers/SolanaCluster';

export const SolanaClusterSelect = () => {
  const { connection, changeSolanaCluster } = useContext(SolanaClusterContext);

  const onChangeCluster = (event: SelectChangeEvent) => {
    changeSolanaCluster(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Solana Cluster</InputLabel>
        <Select
          value={connection.rpcEndpoint}
          label="Solana Cluster"
          onChange={onChangeCluster}
        >
          <MenuItem value="https://api.devnet.solana.com">Devnet (api.devnet.solana.com)</MenuItem>
          <MenuItem value="https://api.testnet.solana.com">Testnet (api.testnet.solana.com)</MenuItem>
          <MenuItem value="https://api.mainnet-beta.solana.com">Mainnet Beta (api.mainnet-beta.solana.com)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
