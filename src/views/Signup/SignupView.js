import React, { PureComponent, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { push } from "react-router-redux";
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { toast } from "react-toastify";
import { FiAtSign } from 'react-icons/fi';

import { Spinner, PasswordField, TextIconField } from 'components';
import pageNames from 'lib/pageNames';
import { getPasswordStrength } from 'lib/userUtils';
import passwordStrength from 'lib/passwordStrength';
import { setCurrentPage } from 'actions/navigation';
import { createUser, resetSignupUser } from 'actions/signUp';
import './SignupView.scss';

class SignupView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
      confirmPassword: '',
      usernameError: null,
      emailError: null,
      passwordError: null,
      confirmPasswordError: null,
      passwordStrength: passwordStrength.clean,
    };
  }

  componentDidMount = () => {
    this.props.setCurrentPage(pageNames.signup);
  };

  componentWillUnmount = () => {
    this.props.resetSignupUser();
  }

  async componentDidUpdate() {
    const { goToHome, createUserSuccess } = this.props;

    if (createUserSuccess && createUserSuccess.id) {
      toast.success(`Successfully created your account!`);

      goToHome();
    }
  }

  handleTextChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const { password, confirmPassword } = this.state;

    switch (name) {
      case 'password': {
        const passwordStrength = getPasswordStrength(value);
        switch (passwordStrength) {
          case passwordStrength.clean:
          case passwordStrength.strong: {
            this.setState({ passwordError: null });
            break;
          }
          case passwordStrength.medium: {
            this.setState({ passwordError: 'Password is getting better but not strong enough just yet' });
            break;
          }
          case passwordStrength.weak: {
            this.setState({ passwordError: 'Password is too weak' });
            break;
          }
          default: {
            break;
          }
        }

        this.setState({ passwordStrength });

        if (this.state.confirmPassword) {
          this.setState({ confirmPasswordError: password === confirmPassword ? null : 'Passwords does not match' });
        }
        break;
      }
      case 'email': {
        const emailMatches = value.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/);
        if (!emailMatches || emailMatches.length === 0) {
          this.setState({ emailError: 'Email is not correct' });
        } else {
          this.setState({ emailError: null });
        }
        break;
      }
      case 'confirmPassword': {
        this.setState({ confirmPasswordError: password === value ? null : 'Passwords does not match' });
        break;
      }
      default:
        break;
    }

    this.setState({
      [name]: value,
    });
  }

  onSignUp = (e) => {
    e.preventDefault();
    const { username, password, email } = this.state;

    const model = { username, password, email };
    this.props.createUser(model);
  }

  getErrorMessageDisplay = (error) => {
    switch (error) {
      case 'EmailInUse':
        return 'Email is already in use';
      case 'UsernameInUse':
        return 'Username is already in use';
      default:
        return error;
    }
  }

  render() {
    const { isCreateUserBusy, createUserError } = this.props;
    const { username, email, emailError, password, passwordError, confirmPassword, confirmPasswordError, passwordStrength } = this.state;

    return (
      <div className="signup-view">
        <Paper className="signup-view--form-container">
          <div className="signup-view--desc">
            <Typography variant="h5">
              Create an account
            </Typography>
            <Typography component="p">
              Join us in the most exciting bonfire chatting ever!
            </Typography>
          </div>
          <Spinner isLoading={isCreateUserBusy}>
            <Fragment>
              <form className="signup-view--form" onSubmit={this.onSignUp}>
                <div className="signup-view--form-input">
                  <TextField
                    type="text"
                    label="Username"
                    name="username"
                    id="signup-view--form-input-username"
                    value={username}
                    fullWidth
                    placeholder="Enter your username..."
                    onChange={this.handleTextChange}
                    disabled={isCreateUserBusy}
                  />
                </div>
                <div className="signup-view--form-input">
                  <TextIconField
                    type="text"
                    name="email"
                    inputLabel="Email"
                    id="signup-view--form-input-email"
                    value={email}
                    fullWidth
                    placeholder="Enter your email..."
                    onChange={this.handleTextChange}
                    disabled={isCreateUserBusy}
                    icon={<FiAtSign />}
                    iconPosition="start"
                    errorMessage={emailError}
                  />
                </div>
                <div className="signup-view--form-input">
                  <PasswordField
                    id="signup-view--form-input-password"
                    name="password"
                    inputLabel="Password"
                    fullWidth
                    value={password}
                    onChange={this.handleTextChange}
                    disabled={isCreateUserBusy}
                    errorMessage={passwordError}
                    strength={passwordStrength}
                  />
                </div>
                <div className="signup-view--form-input">
                  <PasswordField
                    id="signup-view--form-input-confirm-password"
                    name="confirmPassword"
                    inputLabel="Confirm password"
                    placeholder="Enter your password again..."
                    fullWidth
                    value={confirmPassword}
                    onChange={this.handleTextChange}
                    disabled={isCreateUserBusy}
                    errorMessage={confirmPasswordError}
                  />
                </div>
                {
                  createUserError &&
                  <p className="signup-view--form-error">
                    {this.getErrorMessageDisplay(createUserError)}
                  </p>
                }
                <div className="signup-view--form-action">
                  <Button type="submit" variant="contained" onClick={this.onSignUp} color="primary">Sign-up</Button>
                </div>
              </form>
            </Fragment>
            <div className="signup-view--form-login">
              <p>Already have an account? <Link to="/login">Log-in</Link> here.</p>
            </div>
          </Spinner>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.user,
});

const mapDispatchToProps = dispatch => ({
  goToHome: () => dispatch(push('/')),
  setCurrentPage: (page) => dispatch(setCurrentPage(page)),
  createUser: (user) => dispatch(createUser(user)),
  resetSignupUser: () => dispatch(resetSignupUser()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupView));
export { SignupView as PlainSignupView };
