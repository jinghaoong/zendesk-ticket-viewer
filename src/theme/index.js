import { createTheme } from "@mui/material";

const theme = createTheme({
  /**
   * Theme using Zendesk Brand Colors
   * https://brandland.zendesk.com/color#zendesk-colors
   */
  palette: {
    background: {
      default: '#F8F9F9', // tofu
      paper: '#F3F0EE' // karl
    },
    primary: {
      main: '#17494D', // pale kale
      contrastText: '#FFFFFF' // white
    },
    secondary: {
      main: '#BDD9D7', // nessie
      contrastText: '#03363D' // kale
    },
    text: {
      primary: '#03363D' // kale
    },
    /**
     * Ticket Status Colors
     * new, open, pending, hold, solved, closed
     */
    new: {
      main: '#E91E63', //pink(500)
      contrastText: '#fff'
    },
    open: {
      main: '#F44336', // red(500)
      contrastText: '#FFF'
    },
    pending: {
      main: '#FFC107', // amber(500)
      contrastText: '#FFF'
    },
    hold: {
      main: '#546E7A', // blueGrey(600)
      contrastText: '#FFF'
    },
    solved: {
      main: '#689F38', // lightGreen(700)
      contrastText: '#FFF'
    },
    closed: {
      main: '#757575', // grey(600)
      contrastText: '#FFF'
    }
  }
});

export default theme;
