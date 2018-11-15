import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { UserIcon } from 'components';
import { getDateDiffByDays } from 'lib/dateTimeUtils';

import './CoupleBanner.scss';

const getCoverPhotoStyle = (coverPhotoUrl) => {
  return {
    backgroundImage: `url(${coverPhotoUrl})`,
  };
}

const CoupleBanner = (props) => {
  return (
    <div className="couple-banner">
      <div className="couple-banner--cover-photo" style={getCoverPhotoStyle(props.coverPhotoUrl)}>
        <div className="couple-banner--users">
          <UserIcon className="couple-banner--user groom" user={props.groom} />
          <UserIcon className="couple-banner--user bride" user={props.bride} />
        </div>
        <div className="couple-banner--date">
          <Typography variant="h2">{getDateDiffByDays(props.weddingDate)}</Typography>
          <Typography variant="h4">days left till your big day</Typography>
        </div>
      </div>
    </div>
  )
}

CoupleBanner.propTypes = {
  groom: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatarUrl: PropTypes.string,
  }).isRequired,
  bride: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatarUrl: PropTypes.string,
  }).isRequired,
  coverPhotoUrl: PropTypes.string,
  weddingDate: PropTypes.string.isRequired,
};

export default CoupleBanner;
