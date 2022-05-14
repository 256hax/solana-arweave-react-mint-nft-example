import { Box, Container, Divider, Typography } from '@mui/material';

export const Footer = () => {
  return(
    <Box sx={{ mt: 8, mb: 8 }}>
    <Divider />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <a href="https://github.com/256hax/solana-arweave-react-mint-nft-example" target="_blank">
          <img src={`${process.env.PUBLIC_URL}/GitHub-Mark-32px.png`} />
        </a>
        <Typography>by <a href="https://twitter.com/256hax" target="_blank">256hax</a></Typography>
      </Container>
    </Box>
  );
}
