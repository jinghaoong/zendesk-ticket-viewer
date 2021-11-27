import { Skeleton, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import Error from './Error';
import PaginationCluster from './PaginationCluster';
import TicketCard from './TicketCard';
import TicketDetailed from './TicketDetailed';

const token = process.env.REACT_APP_TOKEN;
const auth = `Bearer ${token}`;
const baseUrl = process.env.REACT_APP_ZCC_URL; // Company Domain URL
const ticketsUrl = `${baseUrl}api/v2/tickets`;
const perPage = 25;

const getRequestAttributes = {
  method: 'GET',
  mode: 'cors',
  credentials: 'same-origin',
  headers: {
    'Authorization': auth
  }
};

const TicketViewer = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Dialog State and Handlers
   */
  const [open, setOpen] = useState(false);

  const handleClickOpen = (url) => {
    setTicketUrl(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*
  const [count, setCount] = useState(-1);
  const [numPages, setNumPages] = useState(-1);

  useEffect(() => {
    setNumPages(Math.ceil(count / perPage));
  }, [count]);
  */

  const cursorUrl = `${baseUrl}api/v2/tickets.json?page[size]=${perPage}`;
  const [currUrl, setCurrUrl] = useState(cursorUrl);
  const [currData, setCurrData] = useState([]);
  const [ticketUrl, setTicketUrl] = useState('');

  const ticketCount = useRef();
  const pageNumber = useRef(1);
  const pageUrls = useRef({ 1: cursorUrl });

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

  /**
   * Functions and Handlers
   */
  const fetchAll = async () => {
    setLoading(true);

    fetch(ticketsUrl, getRequestAttributes)
      .then(response => response.json())
      .then(data => {
        const { count } = data;
        console.log(count);
        ticketCount.current = count;
      })
      .catch(error => {
        handleErrors(error)
        setLoading(false);
      });
  };

  const fetchCurrPage = async () => {
    setLoading(true);

    fetch(currUrl, getRequestAttributes)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        setCurrData(data);
        setLoading(false);
      })
      .catch(error => {
        handleErrors(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAll()
    fetchCurrPage();
  }, [currUrl]);

  let { tickets, meta, links } = currData;

  useEffect(() => {
    ({ tickets, meta, links } = currData);
  }, [currData]);

  const reloadTickets = () => {
    fetchCurrPage();
  };

  const handleToStartPage = () => {
    pageNumber.current = 1;
    setCurrUrl(cursorUrl);
  };

  const handlePrevPage = () => {
    if (pageNumber === 2) {
      handleToStartPage();
    } else {
      pageNumber.current = pageNumber.current - 1;
      setCurrUrl(links.prev);
      pageUrls.current[pageNumber.current] = links.prev;
    }
  };

  const handleNextPage = () => {
    pageNumber.current = pageNumber.current + 1;
    setCurrUrl(links.next);
    pageUrls.current[pageNumber.current] = links.next;
  };

  const paginationProps = {
    perPage,
    ticketCount,
    pageNumber,
    pageUrls,
    loading,
    meta,
    reloadTickets,
    handleToStartPage,
    handlePrevPage,
    handleNextPage
  };

  return (
    <>
      <Helmet>
        <title>Zendesk | Ticket Viewer</title>
      </Helmet>
      <Box
        minHeight="100%"
        mt="2em"
        mx={{
          md: 10, // >900
          lg: 30, // >1200
          xl: 50 // >1536
        }}
      >
        {error && <Error error={error} />}
        {(!error && ticketCount)
          &&
          <PaginationCluster {...paginationProps} />
        }
        {(loading && !error)
          &&
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
        }
        {(!loading && !error)
          &&
          tickets.map(ticket =>
            <TicketCard
              key={ticket.id}
              handleClickOpen={handleClickOpen}
              ticket={ticket}
            />)
        }
        {(!error && ticketCount)
          &&
          <PaginationCluster {...paginationProps} />
        }
      </Box>
      {open &&
        <TicketDetailed
          open={open}
          handleClose={handleClose}
          ticketUrl={ticketUrl}
        />
      }
    </>
  );
};

export default TicketViewer;
