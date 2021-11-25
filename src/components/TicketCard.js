import {
  Card,
  CardActions,
  CardContent,
  Chip, IconButton,
  Stack,
  Typography
} from '@mui/material';
import { FiMoreHorizontal } from 'react-icons/fi';

const statusCodes = {
  'open': 'o',
  'pending': 'p',
  'solved': 's',
  'closed': 'c'
};

const TicketCard = ({ handleClickOpen, ticket }) => {
  return (
    <Card key={ticket.id} variant="outlined" sx={{ my: 1 }}>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Typography variant="subtitle2">#{ticket.id}</Typography>
          <Typography>{ticket.subject}</Typography>
        </Stack>
        <Stack>
          <Typography>Requester id: <b>{ticket.requester_id}</b></Typography>
          <Typography>Assignee id: <b>{ticket.assignee_id}</b></Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={1}>
          <Chip label={ticket.status} />
          <IconButton
            size="small"
            title="View Details"
            onClick={() => handleClickOpen(ticket.url)}
          >
            <FiMoreHorizontal />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default TicketCard;
