import { useTheme } from '@emotion/react';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useEffect, useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import {
  baseUrl,
  capitaliseString,
  convertDate,
  convertDateToNow,
  getRequestAttributes
} from '../../helpers';

const TicketCard = ({ handleClickOpen, ticket }) => {
  const theme = useTheme()
  const showDetails = useMediaQuery(theme.breakpoints.up(768));
  const [users, setUsers] = useState([]);

  const fetchUser = async (user_id) => {
    return fetch(`${baseUrl}api/v2/users/${user_id}`, getRequestAttributes)
      .then(response => response.json())
      .then(data => data.user);
  };

  const fetchUsers = async () => {
    const fetchRequester = fetchUser(ticket.requester_id);
    const fetchAssignee = fetchUser(ticket.assignee_id);

    Promise.all([fetchRequester, fetchAssignee]).then(data => setUsers(data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Card key={ticket.id} variant="outlined" sx={{ my: 1 }}>
      <CardHeader
        title={
          !(users[0] && users[1])
            ?
            <Skeleton width={200} />
            :
            <>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip size="small" color={ticket.status} label={ticket.status} />
                {showDetails ?
                  <Typography color="gray">
                    {ticket.type === null ? 'Ticket'
                      : capitaliseString(ticket.type)}
                    {` #${ticket.id}`}
                    {ticket.priority !== null && ` (${ticket.priority})`}
                  </Typography>
                  :
                  <Typography color="gray">#{ticket.id}</Typography>
                }
                {showDetails && <Typography variant="h6">{ticket.subject}</Typography>}
              </Stack>
              {!showDetails && <Typography variant="h6">{ticket.subject}</Typography>}
            </>
        }
      />
      <CardContent>
        <Stack
          direction="row"
          spacing={3}
        >
          {showDetails &&
            <Typography width='60%'>
              {ticket.description}
            </Typography>
          }
          <Stack spacing={1}>
            {showDetails &&
              <>
                {ticket &&
                  <Typography>
                    Created:
                    &nbsp;
                    {convertDate(ticket.created_at)}
                    &nbsp;
                    ({convertDateToNow(ticket.created_at)})
                  </Typography>
                }
                {!ticket && <Skeleton width={200} />}
                {ticket &&
                  <Typography>
                    Updated:
                    &nbsp;
                    {convertDate(ticket.updated_at)}
                    &nbsp;
                    ({convertDateToNow(ticket.updated_at)})
                  </Typography>
                }
                {!ticket && <Skeleton width={200} />}
                <Divider />
              </>
            }
            {users[0] &&
              <Typography>
                Requester:
                &nbsp;
                <b>{users[0].name}</b>
              </Typography>
            }
            {!users[0] && <Skeleton width={200} />}
            {users[1] &&
              <Typography>
                Assignee:
                &nbsp;&nbsp;
                <b>{users[1].name}</b>
              </Typography>
            }
            {!users[1] && <Skeleton width={200} />}
          </Stack>
        </Stack>
      </CardContent>
      {!showDetails &&
        <CardActions>
          <IconButton
            color="primary"
            size="medium"
            title="View Details"
            onClick={() => handleClickOpen(ticket.url)}
          >
            <FiMoreHorizontal />
          </IconButton>
        </CardActions>
      }
    </Card >
  );
};

export default TicketCard;
