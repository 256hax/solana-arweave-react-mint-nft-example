import { createTheme, ThemeProvider, Box, Container } from '@mui/material';
import { ArweaveClusterContextProvider } from '../../providers/ArweaveCluster';
import { ArTransactionIdContextProvider } from '../../providers/ArweaveTransactionId';
import { Header } from './Header';
import { HorizontalLinearStepper } from './StepNavigation';

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The props to apply
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
        <Container maxWidth="md">
          <ArweaveClusterContextProvider>
            <ArTransactionIdContextProvider>
              <Header />
              <HorizontalLinearStepper />
            </ArTransactionIdContextProvider>
          </ArweaveClusterContextProvider>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
