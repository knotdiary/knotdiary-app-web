import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { toggleNavMenu } from 'actions/headerMenu';

import './AppHeader.scss';

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
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
export { AppHeader as PlainAppHeader };
