import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { FiChevronRight } from 'react-icons/fi';
import uuid from 'uuid';

import './TextIconField.scss';

class TextIconField extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    inputLabel: PropTypes.string.isRequired,
    icon: PropTypes.any,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onIconClick: PropTypes.func,
    iconPosition: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    errorMessage: PropTypes.string,
  };

  static defaultProps = {
    id: uuid(),
    icon: <FiChevronRight />,
    className: '',
    errorMessage: null,
    disabled: false,
    fullWidth: false,
    iconPosition: 'start',
    onIconClick: () => { },
  };

  getInputAdornment = (iconPosition, icon, onIconClick) => {
    return (
      <InputAdornment position={iconPosition}>
        <IconButton
          className="form-text-icon-field--icon"
          aria-label="Toggle password visibility"
          onClick={onIconClick}
        >
          {icon}
        </IconButton>
      </InputAdornment>
    );
  }

  render() {
    const { className, id, value, name, inputLabel, onChange, onIconClick, icon, iconPosition, placeholder, disabled, fullWidth, errorMessage } = this.props;
    const hasError = !!errorMessage;

    return (
      <FormControl fullWidth={fullWidth} error={hasError} className={`form-text-icon-field ${className}`}>
        <InputLabel htmlFor={id} className="form-text-icon-field--label">{inputLabel}</InputLabel>
        <Input
          id={id}
          type="text"
          className="form-text-icon-field--input"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          startAdornment={iconPosition === 'start' ? this.getInputAdornment(iconPosition, icon, onIconClick) : null}
          endAdornment={iconPosition === 'end' ? this.getInputAdornment(iconPosition, icon, onIconClick) : null}
        />
        {
          errorMessage && <FormHelperText className="form-text-icon-field--error">{errorMessage}</FormHelperText>
        }
      </FormControl>
    )
  }
}

export default TextIconField;
