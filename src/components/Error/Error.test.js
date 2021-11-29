import { Alert } from '@mui/material';
import { mount } from 'enzyme';
import Error from './Error';

const errorTitle = 'Something Went Wrong!';
const errorMessage = 'Test Error';

describe('Error', () => {
  it('Alert component is rendered', () => {
    const wrapper = mount(<Error error={errorMessage} />);
    const alertMui = wrapper.find(Alert);
    expect(alertMui).toBeDefined();
  });

  it('Accepts error props', () => {
    const wrapper = mount(<Error error={errorMessage} />);
    expect(wrapper.props().error).toEqual(errorMessage);
  });

  it('Error message is correct', () => {
    const wrapper = mount(<Error error={errorMessage} />);
    const value = wrapper.find(Alert).text();
    expect(value).toEqual(errorTitle + errorMessage);
  });
});