import { ThemeProvider } from '@emotion/react';
import { StyledEngineProvider } from '@mui/styled-engine';
import Header from './components/Header/Header';
import TicketViewer from './components/Ticket/TicketViewer';
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
