import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import { getAvatarImage } from 'lib/userUtils';
import './UserIcon.scss';

const getBackgroundImageStyle = (user, width, height) => {
  return {
    backgroundImage: `url(${getAvatarImage(user)}`,
    width: `${width}px`,
    height: `${height}px`,
  };
}

const UserIcon = (props) => {
  return (
    <div className={`user-icon ${props.className}`}>
      <div className="user-icon--image" style={getBackgroundImageStyle(props.user, props.width, props.height)} />
    </div>
  )
};

UserIcon.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

UserIcon.defaultProps = {
  id: uuid(),
  className: '',
  width: 30,
  height: 30,
};

export default UserIcon;
