import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Skeleton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { parseISO, formatDistanceToNow, format } from 'date-fns';
import Error from './Error';

const auth = `Bearer ${process.env.REACT_APP_TOKEN}`;

const convertDate = (isoDate) => {
  return format(parseISO(isoDate), 'eee, dd MMMM yyyy');
}

const convertDateToNow = (isoDate) => {
  return formatDistanceToNow(parseISO(isoDate), { addSuffix: true });
}

const capitaliseString = (string) => {
  return string[0].toUpperCase() + string.substring(1);
}

const TicketDetailed = ({ open, handleClose, ticketUrl }) => {
  const [error, setError] = useState();
  const [ticket, setTicket] = useState();
  const [users, setUsers] = useState([]);

  const handleErrors = (error) => {
    console.log(error.statusCode);
    if (!error.status) {
      setError("Error: Couldn't Authenticate You / Unable to retrieve tickets");
    } else {
      switch (error.status) {
        case 429:
          setError('Read limit exceeded, please wait 1 minute before reloading');
          break;
        default:
          setError('Unable to retrieve tickets');
          break;
      };
    }
    return;
  };

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
  };

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
        handleErrors(error);
      })
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        {ticket &&
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h6" color="gray">
              {ticket.type === null
                ? 'Ticket '
                : capitaliseString(ticket.type) + ' '}
              #{ticket.id}
              {ticket.priority !== null && ` (${ticket.priority})`}
            </Typography>
            <Chip color={ticket.status} size="small" label={ticket.status} />
          </Stack>
        }
        {ticket &&
          <Typography variant="h5">
            {ticket.subject}
          </Typography>
        }
        {(!ticket && !error) && <Skeleton />}
      </DialogTitle>
      <DialogContent>
        {error && <Error error={error} />}
        <Stack spacing={1}>
          <Typography>
            {ticket && ticket.description}
            {(!ticket && !error) && <Skeleton />}
          </Typography>
          <Divider />
          {ticket &&
            <Typography>
              Created:
              &nbsp;
              {convertDate(ticket.created_at)}
              &nbsp;
              ({convertDateToNow(ticket.created_at)})
            </Typography>
          }
          {(!ticket && !error) && <Skeleton width={200} />}
          {ticket &&
            <Typography>
              Updated:
              &nbsp;
              {convertDate(ticket.updated_at)}
              &nbsp;
              ({convertDateToNow(ticket.updated_at)})
            </Typography>
          }
          {(!ticket && !error) && <Skeleton width={200} />}
          <Divider />
          {users[0] &&
            <Typography>
              Requester:
              &nbsp;
              <b>{users[0].name}</b>
            </Typography>
          }
          {(!users[0] && !error) && <Skeleton width={200} />}
          {users[1] &&
            <Typography>
              Assignee:
              &nbsp;&nbsp;
              <b>{users[1].name}</b>
            </Typography>
          }
          {(!users[1] && !error) && <Skeleton width={200} />}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog >
  );
};

export default TicketDetailed;
