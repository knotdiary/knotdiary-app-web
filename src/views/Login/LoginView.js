import React, { PureComponent, Fragment } from 'react';
import { Redirect } from 'react-router';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import qs from 'qs';

import { Spinner, PasswordField } from 'components';
import pageNames from 'lib/pageNames';
import { login } from 'actions/login';
import { setCurrentPage } from 'actions/navigation';
import './LoginView.scss';
import logo from 'assets/knot-diary-splash-bg.png';

const mapStateToProps = state => ({
  ...state.login,
  ...state.user,
  ...state.couple,
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password)),
  setCurrentPage: () => dispatch(setCurrentPage(pageNames.login)),
});

class LoginView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      returnUrl: null,
    };
  }

  componentDidMount = () => {
    const params = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    if (params.returnUrl) {
      this.setState({ returnUrl: params.returnUrl });
    }

    this.props.setCurrentPage();
  };

  handleTextChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  }

  login = async (e) => {
    e.preventDefault();

    const { login } = this.props;
    const { username, password } = this.state;

    login(username, password);
  }

  getReturnUrl = () => {
    const { coupleInfo } = this.props;

    if (coupleInfo) {
      return this.state.returnUrl || `/${coupleInfo.id}`;
    }

    return '/';
  }

  render() {
    const { isLoginBusy, loginError, user } = this.props;

    return (
      <div className="login-view">
        <form className="login-view--form" onSubmit={this.login}>
          <Spinner isLoading={isLoginBusy}>
            <Fragment>
              <img src={logo} alt="Knot Diary" />
              <div className="login-view--form-input">
                <TextField
                  type="text"
                  label="Username"
                  name="username"
                  id="login-username"
                  fullWidth
                  placeholder="Enter your username..."
                  onChange={this.handleTextChange} disabled={isLoginBusy}
                />
              </div>
              <div className="login-view--form-input">
                <PasswordField
                  name="password"
                  id="login-password"
                  value={this.state.password}
                  fullWidth
                  placeholder="Enter your password..."
                  onChange={this.handleTextChange} disabled={isLoginBusy}
                />
              </div>
              {
                loginError &&
                <p className="login-view--form-error">
                  {loginError}
                </p>
              }
              <div className="login-view--form-action">
                <Link to="/signup">
                  <Button>Sign-up</Button>
                </Link>
                <Button type="submit" variant="contained" onClick={this.login} color="primary">Login</Button>
              </div>
              {
                user && user.id && <Redirect to={this.getReturnUrl()} />
              }
            </Fragment>
          </Spinner>
        </form>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginView));
export { LoginView as PlainLoginView };
