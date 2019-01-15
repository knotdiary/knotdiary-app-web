import { createMuiTheme } from '@material-ui/core/styles';

const AppTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#a6daef',
      },
    },
    MuiPickersCalendarHeader: {
    },
    MuiPickersDay: {
      day: {
        color: '#d0e2ec',
      },
      selected: {
        backgroundColor: '#a6daef',
      },
      current: {
        color: '#d0e2ec',
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: '#d0e2ec',
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
      main: '#a6daef',
      contrastText: '#fff',
    },
    secondary: {
      main: '#d0e2ec',
      contrastText: '#fff',
    },
    type: 'light',
    background: '#dee2e6',
  },
});

export default AppTheme;
