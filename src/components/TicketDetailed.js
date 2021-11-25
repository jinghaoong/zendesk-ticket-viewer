import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const TicketDetailed = ({ open, handleClose, ticketUrl }) => {
  const [error, setError] = useState(false);
  const [ticket, setTicket] = useState();
  const auth = `Bearer ${process.env.REACT_APP_TOKEN}`;

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
      })
      .catch(error => {
        console.error(error);
      })
  }

  useEffect(() => {
    fetchTicket();
  }, []);

  useEffect(() => {
    console.log(ticket);
  }, [ticket]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        <Typography variant="h5">
          {ticket && `#${ticket.id} -- ${ticket.subject}`}
          {!ticket && <Skeleton />}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <Typography variant="body1">
            {ticket && ticket.description}
            {!ticket && <Skeleton />}
          </Typography>
          <Typography variant="body2">
            {ticket && `Requester: ${ticket.requester_id}`}
            {!ticket && <Skeleton />}
          </Typography>
          <Typography variant="body2">
            {ticket && `Assignee: ${ticket.assignee_id}`}
            {!ticket && <Skeleton />}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TicketDetailed;
