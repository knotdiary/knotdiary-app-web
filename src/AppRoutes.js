import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';

import {
  HomeView,
} from './views';

const propTypes = {
  location: PropTypes.object.isRequired,
};

function AppRoutes(props) {
  return (
    <Switch>
      <Route exact path="/" component={HomeView} />
    </Switch>
  );
}

AppRoutes.propTypes = propTypes;

export default withRouter(AppRoutes);
