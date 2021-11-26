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
}) => {
  const numPages = Math.ceil(ticketCount / perPage);

  return (
    <Stack direction="row" spacing={2}>
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
          onClick={handleToStartPage}>
          <FiChevronsLeft />
        </Button>
        <Button
          disabled={loading || pageNumber.current === 1}
          title="Previous Page"
          onClick={handlePrevPage}>
          <FiChevronLeft />
        </Button>
        <Button
          disabled={loading || !meta.has_more}
          title="Next Page"
          onClick={handleNextPage}>
          <FiChevronRight />
        </Button>
      </ButtonGroup>
      <Typography variant="h6">
        <Stack direction="row">
          Total Tickets:&nbsp;
          {loading ? <Skeleton width={50} />
            : ticketCount.current}
        </Stack>
      </Typography>
    </Stack>
  )
}

export default PaginationCluster;
