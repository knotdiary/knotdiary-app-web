import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Drawer from 'react-motion-drawer';

import { toggleNavMenu } from 'actions/headerMenu';
import { logout } from 'actions/login';

import './NavMenu.scss';

const mapStateToProps = state => ({
  ...state.headerMenu,
});

const mapDispatchToProps = dispatch => ({
  toggleNavMenu: (val) => dispatch(toggleNavMenu(val)),
  logout: () => dispatch(logout()),
});

class NavMenu extends PureComponent {
  onStateChange = (newState) => {
    const { toggleNavMenu } = this.props;
    toggleNavMenu(newState);
  }

  logout = () => {
    this.props.logout();
  }

  render() {
    const { isNavMenuOpen, logout } = this.props;

    return (
      <Drawer
        id="nav-menu"
        className="nav-menu"
        open={isNavMenuOpen}
        onChange={this.onStateChange}
      >
        <div className="nav-menu--links">
          <Link className="nav-menu--links-item" to="/">
            <span>Home</span>
          </Link>
          <Link className="nav-menu--links-item" to="/feed">
            <span>Newsfeed</span>
          </Link>
          <Link className="nav-menu--links-item" to="/vendors">
            <span>Vendors</span>
          </Link>
          <Link className="nav-menu--links-item" to="/settings">
            <span>Settings</span>
          </Link>
          <div className="nav-menu--links-item" role="menuitem" onClick={logout}>
            <span>Logout</span>
          </div>
        </div>
      </Drawer>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
export { NavMenu as PlainNavMenu };
