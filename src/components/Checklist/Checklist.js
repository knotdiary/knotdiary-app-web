import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
      <h3 className="check-list--header">{props.title}</h3>
      {
        props.items.map((item, key) => {
          const { vendor } = item;

          if (key > props.maxDisplay - 1) {
            return null;
          }

          return (
            <div className="check-list--item" key={key}>
              <div className="check-list--item-icon">
                <div style={getVendorIcon(vendor.avatarUrl)} alt={item.description} />
              </div>
              <div className="check-list--item-details">
                <h4 variant="body1">{item.description}</h4>
                <p variant="body2">{`${getDisplayTime(item.appointmentDate)} of your appointment`}</p>
              </div>
            </div>
          );
        })
      }
      {
        props.items.length > (props.maxDisplay - 1) && (
          <Link className="check-list--show-more" to="/check-list">
            Show more...
          </Link>
        )
      }

    </div>
  )
}

CheckList.propTypes = {
  title: PropTypes.string,
  maxDisplay: PropTypes.number,
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

CheckList.defaultProps = {
  title: 'Checklist',
  maxDisplay: 5,
};

export default CheckList;
