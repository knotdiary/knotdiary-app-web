import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const IsAuthorized = (ComposedComponent) => {
  class IsAuthorizedWrapper extends PureComponent {
    componentDidMount() {
      this.checkIfLoggedIn();
    }

    componentDidUpdate() {
      this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
      const { isBusy, redirect } = this.props;

      if (isBusy) {
        return;
      }

      if (!this.isUserAuthorized()) {
        redirect();
      }
    }

    isUserAuthorized = () => {
      const { user, session } = this.props;
      return user && user.id && session && session.access_token;
    }

    render() {
      return (
        <Fragment>
          {this.isUserAuthorized() ? <ComposedComponent {...this.props} /> : null}
        </Fragment>
      );
    }
  }

  const mapStateToProps = (state) => ({
    user: state.user.user,
    session: state.user.session,
    isBusy: state.user.isGetActiveUserBusy,
    coupleInfo: state.couple.coupleInfo,
  });

  const mapDispatchToProps = dispatch => bindActionCreators({
    redirect: () => push('/login'),
  }, dispatch)

  IsAuthorizedWrapper.propTypes = {
    user: PropTypes.any,
    session: PropTypes.any,
    isBusy: PropTypes.bool,
    redirect: PropTypes.func.isRequired,
  };

  IsAuthorized.defaultProps = {
    user: null,
    session: null,
    isBusy: false,
  };

  return connect(mapStateToProps, mapDispatchToProps)(IsAuthorizedWrapper);
}

export default IsAuthorized;
