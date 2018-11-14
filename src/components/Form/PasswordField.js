import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import uuid from 'uuid';

import passwordStrength from 'lib/passwordStrength';
import './PasswordField.scss';

class PasswordField extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    inputLabel: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    errorMessage: PropTypes.string,
    strength: PropTypes.oneOf([
      passwordStrength.strong,
      passwordStrength.medium,
      passwordStrength.weak,
      passwordStrength.clean,
    ]),
  };

  static defaultProps = {
    id: uuid(),
    className: '',
    inputLabel: 'Password',
    placeholder: 'Enter your password...',
    errorMessage: null,
    disabled: false,
    fullWidth: false,
    strength: passwordStrength.clean,
  };

  constructor(props) {
    super(props);

    this.state = {
      showPassword: false,
    };
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }

  render() {
    const { className, id, value, name, inputLabel, onChange, placeholder, disabled, fullWidth, errorMessage, strength } = this.props;
    const { showPassword } = this.state;
    const hasError = !!errorMessage;

    return (
      <FormControl fullWidth={fullWidth} error={hasError} className={`form-password-field ${className} ${strength}`}>
        <InputLabel htmlFor={id} className="form-password-field--label">{inputLabel}</InputLabel>
        <Input
          id={id}
          type={showPassword ? 'text' : 'password'}
          className="form-password-field--input"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                className="form-password-field--icon"
                aria-label="Toggle password visibility"
                onClick={this.handleClickShowPassword}
              >
                {this.state.showPassword ? <FiEyeOff /> : <FiEye />}
              </IconButton>
            </InputAdornment>
          }
        />
        {
          errorMessage && <FormHelperText className="form-password-field--error">{errorMessage}</FormHelperText>
        }
      </FormControl>
    )
  }
}

export default PasswordField;
