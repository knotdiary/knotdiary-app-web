import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { ToastContainer } from 'react-toastify';

import { AppHeader } from 'components';
import AppRoutes from './AppRoutes';
import AppTheme from './AppTheme';
import { toggleNavMenu } from 'actions/headerMenu';

import './App.scss';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  toggleNavMenu: (val) => dispatch(toggleNavMenu(val)),
});

class App extends PureComponent {
  componentDidMount = () => {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.toggleNavMenu(false);
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <CssBaseline>
        <MuiThemeProvider theme={AppTheme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <div id="knotdiary-main">
              <div id="knotdiary-main--content">
                <AppHeader />
                <div id="knotdiary-main--content-body">
                  <AppRoutes />
                </div>
                <ToastContainer
                  className="knotdiary-toasts"
                  toastClassName="knotdiary-toasts--item"
                  draggablePercent={50}
                  position="top-right"
                  hideProgressBar={false}
                  closeOnClick
                  pauseOnHover
                  draggable
                  newestOnTop
                />
              </div>
            </div>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </CssBaseline>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
export { App as PlainApp };
