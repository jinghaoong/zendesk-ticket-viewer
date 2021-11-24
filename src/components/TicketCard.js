import {
  Card,
  CardContent,
  Typography
} from '@mui/material';

const TicketCard = ({ ticket }) => {
  return (
    <Card back variant="outlined">
      <CardContent>
        <Typography variant="h5">{ticket.subject}</Typography>
        <Typography variant="h7">{ticket.description}</Typography>
      </CardContent>
    </Card>
  );
}

export default TicketCard;
