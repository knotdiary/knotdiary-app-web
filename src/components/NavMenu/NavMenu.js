import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Drawer from 'react-motion-drawer';

import { toggleNavMenu } from 'actions/headerMenu';

import './NavMenu.scss';

const mapStateToProps = state => ({
  ...state.headerMenu,
});

const mapDispatchToProps = dispatch => ({
  toggleNavMenu: (val) => dispatch(toggleNavMenu(val)),
});

class NavMenu extends PureComponent {
  onStateChange = (newState) => {
    const { toggleNavMenu } = this.props;
    toggleNavMenu(newState);
  }

  render() {
    const { isNavMenuOpen } = this.props;

    return (
      <Drawer
        id="nav-menu"
        className="nav-menu"
        open={isNavMenuOpen}
        onChange={this.onStateChange}
      >
        <div className="nav-menu--links">
          <Link className="nav-menu--links-item" to="/">
            <span className="nav-menu--links-item-icon home"></span>
            <span>Home</span>
          </Link>
          <Link className="nav-menu--links-item" to="/feed">
            <span className="nav-menu--links-item-icon feed"></span>
            <span>Newsfeed</span>
          </Link>
          <Link className="nav-menu--links-item" to="/vendors">
            <span className="nav-menu--links-item-icon vendors"></span>
            <span>Vendors</span>
          </Link>
          <Link className="nav-menu--links-item" to="/settings">
            <span className="nav-menu--links-item-icon settings"></span>
            <span>Settings</span>
          </Link>
        </div>
      </Drawer>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
export { NavMenu as PlainNavMenu };
