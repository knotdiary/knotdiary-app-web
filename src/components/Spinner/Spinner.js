import React from 'react';
import PropTypes from 'prop-types';
import { BounceLoader } from 'react-spinners';
import Loader from 'react-loader-advanced';

import './Spinner.scss';

const propTypes = {
  isLoading: PropTypes.bool,
  hideContent: PropTypes.bool,
  children: PropTypes.any,
  blur: PropTypes.number,
  color: PropTypes.string,
};

const defaultProps = {
  isLoading: false,
  hideContent: false,
  children: null,
  blur: 10,
  color: '#00aeef',
};

const showContent = (props) => {
  if (props.hideContent && props.isLoading) {
    return null;
  }

  return props.children;
}

function Spinner(props) {
  const message = (
    <BounceLoader loading={props.isLoading} color={props.color} />
  );

  return (
    <div className="spinner-block">
      <Loader
        show={props.isLoading}
        message={message}
        hideContentOnLoad={props.hideContent}
        contentBlur={props.blur}
        backgroundStyle={{backgroundColor: 'none'}}
      >
        {
          showContent(props)
        }
      </Loader>
    </div>
  );
}

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner
