import { createMuiTheme } from '@material-ui/core/styles';

const Theme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#003f56',
      },
    },
    MuiPickersCalendarHeader: {
    },
    MuiPickersDay: {
      day: {
        color: '#003f56',
      },
      selected: {
        backgroundColor: '#00aeef',
      },
      current: {
        color: '#003f56',
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: '#003f56',
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: '#fff',
      },
    },
  },
  palette: {
    primary: {
      main: '#00aeef',
      contrastText: '#fff',
    },
    secondary: {
      main: '#003f56',
      contrastText: '#fff',
    },
    type: 'light',
    background: '#dee2e6',
  },
});

export default Theme;
