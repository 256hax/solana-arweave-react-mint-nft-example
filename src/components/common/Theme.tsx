import { createTheme, ThemeProvider, Box, Container } from '@mui/material';
import { ArweaveClusterContextProvider } from '../../providers/ArweaveCluster';
import { ArTransactionIdContextProvider } from '../../providers/ArweaveTransactionId';
import { SolanaClusterContextProvider } from '../../providers/SolanaCluster';
import { Header } from './Header';
import { HorizontalLinearStepper } from './StepNavigation';
import { Footer } from './Footer';

const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
  typography: {
    fontFamily: [
      'Ubuntu',
      'sans-serif',
    ].join(','),
    fontSize: 16,
    button: {
      textTransform: 'none', // Disable correction uppercase
    },
  },
});

export const Theme = () => {
  return(
    <ThemeProvider theme={theme}>
      <Box>
        <Header />
        <Container maxWidth="md">
          <ArweaveClusterContextProvider>
            <ArTransactionIdContextProvider>
              <SolanaClusterContextProvider>
                <HorizontalLinearStepper />
              </SolanaClusterContextProvider>
            </ArTransactionIdContextProvider>
          </ArweaveClusterContextProvider>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
