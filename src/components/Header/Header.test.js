import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { mount } from 'enzyme';
import Header from "./Header";

const wrapper = mount(<Header />);

describe('Header', () => {
  it('Renders wrapping Box MUI component', () => {
    const boxMui = wrapper.find(Box);
    expect(boxMui).toBeDefined();
  });

  it('Renders Typography MUI component', () => {
    const typographyMui = wrapper.find(Typography);
    expect(typographyMui).toBeDefined();
  });

  it('Renders "Zendesk Ticket Viewer" as header', () => {
    const header = wrapper.find(Typography).text();
    expect(header).toEqual('Zendesk Ticket Viewer');
  });
});