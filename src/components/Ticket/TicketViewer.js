import { Skeleton, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { baseUrl, getRequestAttributes, handleErrors } from '../../helpers';
import Error from '../Error/Error';
import PaginationCluster from '../PaginationCluster/PaginationCluster';
import TicketCard from './TicketCard';
import TicketDetailed from './TicketDetailed';

const ticketsUrl = `${baseUrl}api/v2/tickets`;
const perPage = 25;

const TicketViewer = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Ticket details Dialog State and Handlers
   */
  const [open, setOpen] = useState(false);

  const handleClickOpen = (url) => {
    setTicketUrl(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cursorUrl = `${baseUrl}api/v2/tickets.json?page[size]=${perPage}`;
  const [currUrl, setCurrUrl] = useState(cursorUrl);
  const [currData, setCurrData] = useState([]);

  // Used for detailed ticket view ('TicketDetailed') on smaller screens
  const [ticketUrl, setTicketUrl] = useState('');

  const [ticketCount, setTicketCount] = useState();
  const pageNumber = useRef(1);

  /**
   * Get total number of tickets
   */
  const fetchAll = async () => {
    setLoading(true);

    fetch(ticketsUrl, getRequestAttributes)
      .then(response => response.json())
      .then(data => {
        const { count } = data;
        console.log(count);
        setTicketCount(count);
      })
      .catch(error => {
        setError(handleErrors(error));
        setLoading(false);
      });
  };

  /**
   * Fetch tickets for current page
   */
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

  /** 
   * Upon page load / reload, fetch data
   * and destructure into
   * - tickets: tickets for current page, 
   * - meta: contains info for next page, 
   * - links: previous and next page URLs, 
   */
  useEffect(() => {
    reloadTickets();
  }, [currUrl]);

  let { tickets, meta, links } = currData;

  useEffect(() => {
    ({ tickets, meta, links } = currData);
  }, [currData]);

  /**
   * Pagination Functions / Handlers
   * Reload, To Start, Previous, Next
   * Passed in props to PaginationCluster
   */
  const reloadTickets = () => {
    fetchAll();
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
    }
  };

  const handleNextPage = () => {
    pageNumber.current = pageNumber.current + 1;
    setCurrUrl(links.next);
  };

  /**
   * Props for PaginationCluster
   */
  const paginationProps = {
    perPage,
    ticketCount,
    pageNumber,
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
          md: 10, // >900px
          lg: 30, // >1200px
          xl: 50 // >1536px
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
