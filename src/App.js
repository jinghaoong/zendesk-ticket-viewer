import { ThemeProvider } from '@emotion/react';
import { StyledEngineProvider } from '@mui/styled-engine';
import Header from './components/Header';
import TicketViewer from './components/TicketViewer';
import theme from './theme';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Header />
        <TicketViewer />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
