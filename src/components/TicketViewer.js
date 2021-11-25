import { Skeleton, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Error from './Error';
import PaginationButtons from './PaginationButtons';
import TicketCard from './TicketCard';
import TicketDetailed from './TicketDetailed';

const TicketViewer = () => {
  const perPage = 25;
  const url = `https://zccjinghaoong.zendesk.com/api/v2/tickets.json?page[size]=${perPage}`;
  const auth = `Bearer ${process.env.REACT_APP_TOKEN}`;

  const [curr, setCurr] = useState(url);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [ticketUrl, setTicketUrl] = useState('');

  const fetchData = async () => {
    setLoading(true);
    fetch(curr, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Authorization': auth
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(true);
        console.error(error);
        setLoading(false);
      })
  };

  useEffect(() => {
    fetchData();
  }, [curr]);

  let { tickets, meta, links } = data;

  useEffect(() => {
    ({ tickets, meta, links } = data);
  }, [data])

  const reloadTickets = () => {
    fetchData();
  };

  const handleNextPage = () => {
    setCurr(links.next);
  };

  const handleFirstPage = () => {
    setCurr(url);
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = (url) => {
    setTicketUrl(url);
    setOpen(true);
  };

  const handleClose = () => {
    fetchData();
    ({ tickets, meta, links } = data);
    setOpen(false);
  };

  const firstPage = curr === url;

  return (
    <>
      <Helmet>
        <title>Zendesk | Ticket Viewer</title>
      </Helmet>
      <Box
        minHeight="100%"
        mt="2em"
        mx={{
          md: 20,
          l: 30,
          xl: 30
        }}
      >
        {error && <Error />}
        <PaginationButtons
          firstPage={firstPage}
          loading={loading}
          meta={meta}
          handleFirstPage={handleFirstPage}
          handleNextPage={handleNextPage}
          reloadTickets={reloadTickets}
        />
        {loading
          ?
          <Stack spacing={1} my={1}>
            <Skeleton variant="rectangular" height={50} />
            <Skeleton variant="rectangular" height={50} />
            <Skeleton variant="rectangular" height={50} />
            <Skeleton variant="rectangular" height={50} />
            <Skeleton variant="rectangular" height={50} />
            <Skeleton variant="rectangular" height={50} />
            <Skeleton variant="rectangular" height={50} />
            <Skeleton variant="rectangular" height={50} />
            <Skeleton variant="rectangular" height={50} />
          </Stack>
          :
          tickets.map(ticket =>
            <TicketCard
              key={ticket.id}
              handleClickOpen={handleClickOpen}
              ticket={ticket}
            />)
        }
        <PaginationButtons
          firstPage={firstPage}
          loading={loading}
          meta={meta}
          handleFirstPage={handleFirstPage}
          handleNextPage={handleNextPage}
          reloadTickets={reloadTickets}
        />
      </Box>
      {open && <TicketDetailed open={open} handleClose={handleClose} ticketUrl={ticketUrl} />}
    </>
  );
};

export default TicketViewer;
