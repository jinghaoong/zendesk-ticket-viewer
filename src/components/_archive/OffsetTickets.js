import { useEffect, useState } from 'react';
import TicketCard from '../TicketCard';
import { Box } from '@mui/system';

const OffsetTickets = ({
  baseUrl,
  getRequestAttributes,
  handleClickOpen,
  setLoading,
  setError
}) => {
  const perPage = 25;
  const startPage = 1;

  const [count, setCount] = useState(-1);
  const [pageNumber, setPageNumber] = useState();
  const offsetUrl = `${baseUrl}api/v2/tickets.json?page=`;
  const [allTickets, setAllTickets] = useState([]);
  const [currPageTickets, setCurrPageTickets] = useState([]);

  const fetchAllTickets = async (page) => {
    let currPage = 1;
    let numreq = 0;
    let temp = [];

    setLoading(true);
    fetch(offsetUrl + currPage, getRequestAttributes)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        const { tickets, count } = data;
        console.log(tickets);
        console.log(count);
        console.log(numreq);
        setCount(count);
        temp = tickets.slice();

        numreq = count / 100;
        for (let i = 1; i <= numreq; i++) {
          fetch(offsetUrl + (currPage + i), getRequestAttributes)
            .then(response => response.json())
            .then(data => {
              const { tickets } = data;
              temp.push(...tickets);
            });
        }
        setAllTickets(temp);
      })
      .then(setPageNumber(page))
      .catch(error => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAllTickets(startPage);
  }, []);

  useEffect(() => {
    console.log(pageNumber);
    const start = (pageNumber - 1) * perPage;
    const end = pageNumber * perPage > count ? count : pageNumber * perPage;
    setCurrPageTickets(allTickets.slice(start, end));
  }, [pageNumber]);

  useEffect(() => {
    console.log(currPageTickets);
    setLoading(false);
  }, [currPageTickets]);

  return (
    currPageTickets.map(ticket =>
      <TicketCard
        key={ticket.id}
        handleClickOpen={handleClickOpen}
        ticket={ticket}
      />)
  );
};

export default OffsetTickets;
