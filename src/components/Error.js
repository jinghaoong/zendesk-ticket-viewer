
import { Alert, AlertTitle } from '@mui/material';

const Error = ({ error }) => {
  return (
    <Alert severity="warning">
      <AlertTitle>Error</AlertTitle>
      Error Message
    </Alert>
  )
}

export default Error;
