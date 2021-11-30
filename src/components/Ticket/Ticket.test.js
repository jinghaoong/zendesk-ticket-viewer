import { shallow } from 'enzyme';
import TicketViewer from './TicketViewer';

describe('Ticket Components', () => {
  it('TicketViewer renders without crashing', () => {
    const wrapper = shallow(<TicketViewer />);
    expect(wrapper).toBeDefined();
  });
});