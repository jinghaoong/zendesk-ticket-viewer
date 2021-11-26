import {
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Skeleton,
  Stack,
  Typography
} from '@mui/material';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const auth = `Bearer ${process.env.REACT_APP_TOKEN}`;

const TicketCard = ({ handleClickOpen, ticket }) => {
  const [users, setUsers] = useState([]);

  const fetchUser = async (user_id) => {
    return fetch(
      `${process.env.REACT_APP_ZCC_URL}api/v2/users/${user_id}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Authorization': auth
      }
    })
      .then(response => response.json())
      .then(data => data.user);
  }

  const fetchUsers = async () => {
    const fetchRequester = fetchUser(ticket.requester_id);
    const fetchAssignee = fetchUser(ticket.assignee_id);

    Promise.all([fetchRequester, fetchAssignee]).then(data => setUsers(data));
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <Card key={ticket.id} variant="outlined" sx={{ my: 1 }}>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Typography variant="subtitle2">#{ticket.id}</Typography>
          <Typography>{ticket.subject}</Typography>
        </Stack>
        <Stack>
          {users[0] && <Typography>Requester: <b>{users[0].name}</b></Typography>}
          {!users[0] && <Skeleton width={200} />}
          {users[1] && <Typography>Assignee: <b>{users[1].name}</b></Typography>}
          {!users[1] && <Skeleton width={200} />}
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
