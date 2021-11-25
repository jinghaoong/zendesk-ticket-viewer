import TicketViewer from './components/TicketViewer';
import { StyledEngineProvider } from '@mui/styled-engine';
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
