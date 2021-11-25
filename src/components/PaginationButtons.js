import { Button, ButtonGroup, Stack } from "@mui/material";
import { FiChevronRight, FiRotateCw, FiRefreshCw } from "react-icons/fi";

const PaginationButtons = ({
  loading, firstPage, handleFirstPage, handleNextPage, meta, reloadTickets
}) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        title="Reload Tickets"
        onClick={reloadTickets}
        variant="contained"
      >
        <FiRotateCw />
      </Button>
      <ButtonGroup variant="contained">
        <Button
          disabled={firstPage}
          title="1st Page"
          onClick={handleFirstPage}>
          1
        </Button>
        {loading
          ?
          <Button
            disabled
          >
            <FiRefreshCw />
          </Button>
          :
          <Button
            disabled={!loading && !meta.has_more}
            title="Next Page"
            onClick={handleNextPage}
          >
            <FiChevronRight />
          </Button>}
      </ButtonGroup>
    </Stack>
  )
}

export default PaginationButtons;
