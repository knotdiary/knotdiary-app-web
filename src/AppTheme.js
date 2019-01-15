import { createMuiTheme } from '@material-ui/core/styles';

const AppTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#e9ecef',
      },
    },
    MuiPickersCalendarHeader: {
    },
    MuiPickersModal: {
      dialogAction: {
        color: '#ffa27f',
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: '#fff',
      },
    },
    MuiIconButton: {
      root: {
        padding: 0,
      },
    },
    MuiInputAdornment: {
      root: {
        padding: 0,
      },
    },
  },
  palette: {
    primary: {
      main: '#d04d1c',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffa27f',
      contrastText: '#fff',
    },
    type: 'light',
    background: '#d1ccca',
  },
});

export default AppTheme;
