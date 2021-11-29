import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const Header = () =>
  <Box
    sx={{
      textAlign: "center",
      pt: 2,
    }}
  >
    <Typography variant="h3">
      Zendesk Ticket Viewer
    </Typography>
  </Box>


export default Header;
