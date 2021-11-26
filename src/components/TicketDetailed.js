import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Skeleton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { parseISO, formatDistanceToNow, format } from 'date-fns';
import Error from './Error';

const auth = `Bearer ${process.env.REACT_APP_TOKEN}`;

const convertDate = (isoDate) => {
  return format(parseISO(isoDate), 'eeee, dd MMMM yyyy');
}

const convertDateToNow = (isoDate) => {
  return formatDistanceToNow(parseISO(isoDate), { addSuffix: true });
}

const TicketDetailed = ({ open, handleClose, ticketUrl }) => {
  const [error, setError] = useState();
  const [ticket, setTicket] = useState();
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

  const fetchTicket = async () => {
    fetch(ticketUrl, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Authorization': auth
      }
    })
      .then(response => response.json())
      .then(data => {
        setTicket(data.ticket);
        return data.ticket;
      })
      .then(ticket => {
        const fetchRequester = fetchUser(ticket.requester_id);
        const fetchAssignee = fetchUser(ticket.assignee_id);

        Promise.all([fetchRequester, fetchAssignee])
          .then(data => setUsers(data));
      })
      .catch(error => {
        console.error(error);
        setError(error);
      })
  }

  useEffect(() => {
    fetchTicket();
  }, []);

  useEffect(() => {
    console.log(ticket);
  }, [ticket]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        <Typography>
          {ticket && `#${ticket.id} -- ${ticket.subject}`}
          {(!ticket && !error) && <Skeleton />}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {error && <Error error={error} />}
        <Stack spacing={1}>
          <Typography variant="body1">
            {ticket && ticket.description}
            {(!ticket && !error) && <Skeleton />}
          </Typography>
          <Typography>
            {ticket && `Created: ${convertDate(ticket.created_at)}`}
            {(!ticket && !error) && <Skeleton width={200} />}
          </Typography>
          <Typography>
            {ticket && `Last updated ${convertDateToNow(ticket.updated_at)}`}
            {(!ticket && !error) && <Skeleton width={200} />}
          </Typography>
          <Typography>
            {users[0] && `Requester: ${users[0].name}`}
            {(!users[0] && !error) && <Skeleton width={200} />}
          </Typography>
          <Typography>
            {users[1] && `Assignee: ${users[1].name}`}
            {(!users[1] && !error) && <Skeleton width={200} />}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog >
  );
};

export default TicketDetailed;
