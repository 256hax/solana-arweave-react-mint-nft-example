import { AppBar, Toolbar, Typography } from '@mui/material';

export const Header = () => {
  return(
    <AppBar position="static" style={{ backgroundColor: "#000000" }} sx={{ mb: 3 }}>
      <Toolbar>
        <Typography>Mint NFT (Arweave and Solana Chain)</Typography>
      </Toolbar>
    </AppBar>
  );
}
