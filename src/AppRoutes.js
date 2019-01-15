import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';

import { IsAuthorized } from 'components';

import {
  NewChecklistView,
  ChecklistView,
  HomeView,
  LoginView,
  NotFoundView,
  ErrorView,
  SignupView,
  VendorDetailView,
  VendorListView,
} from './views';
import { FeedView } from './views/Feed/FeedView';

const propTypes = {
  location: PropTypes.object.isRequired,
};

function AppRoutes(props) {
  return (
    <Switch>
      <Route exact path="/signup" component={SignupView} />
      <Route exact path="/login" component={LoginView} />
      <Route exact path="/" component={IsAuthorized(HomeView)} />
      <Route exact path="/:coupleId" component={IsAuthorized(HomeView)} />
      <Route exact path="/:coupleId/feed" component={IsAuthorized(FeedView)} />
      <Route exact path="/:coupleId/check-list" component={IsAuthorized(ChecklistView)} />
      <Route exact path="/:coupleId/check-list/new" component={IsAuthorized(NewChecklistView)} />
      <Route exact path="/vendor" component={IsAuthorized(VendorListView)} />
      <Route exact path="/vendor/:vendorId" component={IsAuthorized(VendorDetailView)} />
      <Route exact path="/error" component={IsAuthorized(ErrorView)} />
      <Route component={NotFoundView} />
    </Switch>
  );
}

AppRoutes.propTypes = propTypes;

export default withRouter(AppRoutes);
