import {
  Button,
  ButtonGroup,
  Skeleton,
  Stack,
  Typography
} from "@mui/material";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiRefreshCw,
  FiRotateCw
} from "react-icons/fi";

const PaginationCluster = ({
  ticketCount,
  pageNumber,
  loading,
  meta,
  reloadTickets,
  handleToStartPage,
  handlePrevPage,
  handleNextPage
}) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button
        disabled={loading}
        title="Reload Tickets"
        onClick={reloadTickets}
        variant="contained"
      >
        {loading ? <FiRefreshCw /> : <FiRotateCw />}
      </Button>
      <ButtonGroup variant="contained">
        <Button
          disabled={loading || pageNumber.current === 1}
          title="Back to Start"
          onClick={handleToStartPage}
        >
          <FiChevronsLeft />
        </Button>
        <Button
          disabled={loading || pageNumber.current === 1}
          title="Previous Page"
          onClick={handlePrevPage}
          color="secondary"
        >
          <FiChevronLeft />
        </Button>
        <Button
          disabled={loading || !meta.has_more}
          title="Next Page"
          onClick={handleNextPage}
          color="secondary"
        >
          <FiChevronRight />
        </Button>
      </ButtonGroup>
      <Typography variant="h6" textAlign="center">
        {loading ? <Skeleton width={50} />
          : <b>{ticketCount.current} tickets</b>}
      </Typography>
    </Stack>
  )
};

export default PaginationCluster;
