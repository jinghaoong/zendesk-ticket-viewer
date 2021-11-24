import TicketViewer from './components/TicketViewer';
import { StyledEngineProvider } from '@mui/styled-engine';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <TicketViewer />
    </StyledEngineProvider>
  );
}

export default App;
