import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { ToastContainer } from 'react-toastify';

import { AppHeader, NavMenu } from 'components';
import AppRoutes from './AppRoutes';
import AppTheme from './AppTheme';
import { toggleNavMenu } from 'actions/headerMenu';
import { getUser } from 'actions/user';
import pageNames from 'lib/pageNames';

import './App.scss';

const mapStateToProps = state => ({
  ...state.navigation,
  ...state.user,
});

const mapDispatchToProps = dispatch => ({
  toggleNavMenu: (val) => dispatch(toggleNavMenu(val)),
  getUser: () => dispatch(getUser()),
});

class App extends PureComponent {
  componentDidMount = () => {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    this.props.getUser();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.toggleNavMenu(false);
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { currentPage } = this.props;

    return (
      <CssBaseline>
        <MuiThemeProvider theme={AppTheme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <div id="knotdiary-main">
              <NavMenu />
              <div id="knotdiary-main--content">
                {
                  currentPage !== pageNames.login ? <AppHeader /> : null
                }
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
