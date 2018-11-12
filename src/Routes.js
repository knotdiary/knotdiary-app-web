import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';

import {
  NewChecklistView,
  ChecklistView,
  HomeView,
  LoginView,
  NotFoundView,
  SplashView,
  ErrorView,
  SignupView,
  PartnerInviteView,
  VendorDetailView,
  VendorListView,
} from './views';

const propTypes = {
  location: PropTypes.object.isRequired,
};

function AppRoutes(props) {
  return (
    <Switch>
      <Route exact path="/signup" component={SignupView} />
      <Route exact path="/login" component={LoginView} />
      <Route exact path="/partner-invite" component={PartnerInviteView} />
      <Route exact path="/:coupleId" component={HomeView} />
      <Route exact path="/:coupleId/feed" component={PostDetails} />
      <Route exact path="/:coupleId/check-list" component={ChecklistView} />
      <Route exact path="/:coupleId/check-list/new" component={NewChecklistView} />
      <Route exact path="/vendor" component={VendorListView} />
      <Route exact path="/vendor/:vendorId" component={VendorDetailView} />
      <Route exact path="/profile" component={AccountProfile} />
      <Route exact path="/error" component={ErrorView} />
      <Route component={NotFoundView} />
    </Switch>
  );
}

AppRoutes.propTypes = propTypes;

export default withRouter(AppRoutes);
