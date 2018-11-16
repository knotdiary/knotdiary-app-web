import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { getDisplayTime } from 'lib/dateTimeUtils';

import './Checklist.scss';

const getVendorIcon = (icon) => {
  return {
    backgroundImage: `url(${icon})`,
  };
}

const CheckList = (props) => {
  return (
    <div className="check-list">
      {
        props.items.map((item, key) => {
          const { vendor } = item;

          return (
            <div className="check-list--item" key={key}>
              <div className="check-list--item-icon">
                <div style={getVendorIcon(vendor.avatarUrl)} alt={item.description} />
              </div>
              <div className="check-list--item-details">
                <Typography variant="h6">{item.description}</Typography>
                <Typography variant="caption">{`${getDisplayTime(item.appointmentDate)} of your appointment`}</Typography>
              </div>
            </div>
          );
        })
    }
    </div>
  )
}

CheckList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    appointmentDate: PropTypes.string,
    checkListType: PropTypes.number,
    isDone: PropTypes.bool.isRequired,
    vendor: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string,
    }),
  })).isRequired,
};

export default CheckList;
