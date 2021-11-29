import { ThemeProvider } from '@emotion/react';
import { StyledEngineProvider } from '@mui/styled-engine';
import { mount, shallow } from 'enzyme';
import App from './App';
import theme from './theme';
import Header from './components/Header/Header';
import TicketViewer from './components/Ticket/TicketViewer';

const themeMui = theme;
const wrapper = mount(<App />);

describe('App', () => {
  it('Renders without crashing', () => {
    shallow(<App />);
  });

  it('StyledEngineProvider is rendered', () => {
    const styledEngineProviderMui = wrapper.find(StyledEngineProvider);
    expect(styledEngineProviderMui).toBeDefined();
  });

  it('ThemeProvider is rendered', () => {
    const themeProviderMui = wrapper.find(ThemeProvider);
    expect(themeProviderMui).toBeDefined();
  });

  it('ThemeProvider accepts correct theme props', () => {
    const themeProviderMui = wrapper.find(ThemeProvider);
    expect(themeProviderMui.props().theme).toEqual(themeMui);
  });

  it('Header is rendered', () => {
    const header = wrapper.find(Header);
    expect(header).toBeDefined();
  });

  it('TicketViewer is rendered', () => {
    const ticketViewer = wrapper.find(TicketViewer);
    expect(ticketViewer).toBeDefined();
  });
});