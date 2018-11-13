import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { FiBell, FiMenu } from 'react-icons/fi';

import { toggleNavMenu } from 'actions/headerMenu';

import './AppHeader.scss';
import { Typography } from '@material-ui/core';

const mapStateToProps = state => ({
  ...state.headerMenu,
});

const mapDispatchToProps = dispatch => ({
  toggleNavMenu: (val) => dispatch(toggleNavMenu(val)),
});

class AppHeader extends PureComponent {
  toggleNavigationMenu = () => {
    const { isNavMenuOpen, toggleNavMenu } = this.props;
    toggleNavMenu(!isNavMenuOpen);
  }

  render() {
    const { isNavMenuOpen } = this.props;

    return (
      <AppBar id="app-header" className="app-header" position="static">
        <Toolbar>
          <IconButton
            className={`app-header--menu-toggle ${isNavMenuOpen ? 'open' : ''}`}
            onClick={this.toggleNavigationMenu}
            color="inherit"
            aria-label="Menu"
          >
            <FiMenu />
          </IconButton>
          <Typography className="app-header--brand" variant="h6">
            Knot Diary
          </Typography>
          <IconButton
            className="app-header--notifications"
            color="inherit"
            aria-label="Notifications"
          >
            <FiBell />
          </IconButton>
        </Toolbar>
      </AppBar>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
export { AppHeader as PlainAppHeader };
