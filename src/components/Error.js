
import { Alert, AlertTitle } from '@mui/material';

const Error = ({ error }) => {
  return (
    <Alert severity="warning">
      <AlertTitle>Something Went Wrong!</AlertTitle>
      {error}
    </Alert>
  )
}

export default Error;
