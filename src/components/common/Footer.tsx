import { Box, Container, Divider, Typography, Link } from '@mui/material';

export const Footer = () => {
  return(
    <Box sx={{ mt: 8, mb: 8 }}>
    <Divider />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Link href="https://github.com/256hax/solana-arweave-react-mint-nft-example" target="_blank">
          <img src={`${process.env.PUBLIC_URL}/GitHub-Mark-32px.png`} />
        </Link>
        <Typography>by <Link href="https://twitter.com/256hax" target="_blank">256hax</Link></Typography>
      </Container>
    </Box>
  );
}
