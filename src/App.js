import { StyledEngineProvider } from '@mui/styled-engine';
import TicketViewer from './components/TicketViewer';
import Header from './components/Header';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Header />
      <TicketViewer />
    </StyledEngineProvider>
  );
}

export default App;
