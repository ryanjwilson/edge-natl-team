import { Meteor } from 'meteor/meteor';
import React from 'react';
import { browserHistory, Route, Router } from 'react-router';
import { Session } from 'meteor/session';

import Contact from '../ui/Contact';
import Dashboard from '../ui/admin/Dashboard';
import FAQs from '../ui/FAQs';
import Login from '../ui/admin/Login';
import NotFound from '../ui/NotFound';
import Rules from '../ui/Rules';
import Schedule from '../ui/Schedule';

/*****************************************************************************/

const onAuthenticationChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;

  // redirect to login page if:
  //    the user is not currently logged in
  //    the user is trying to access the dashboard page
  //
  // redirect to dashboard page if:
  //    the user is currently logged in
  //    the user is trying to access the login page

  if (pathname.includes('/dashboard') && !isAuthenticated) {
    browserHistory.replace('/admin');
  } else if (pathname.includes('/admin') && isAuthenticated) {
    browserHistory.replace('/dashboard');
  }
};

const onEnterLogin = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/dashboard');
  }
};

const onEnterDashboard = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/admin');
  }
};

const onEnterTournament = (nextState) => {
  if (!Meteor.userId()) {
    browserHistory.replace('/admin');
  } else {
    Session.set('selectedTournamentId', nextState.params.tournamentId);
  }
};

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Schedule}/>
    <Route path="/rules" component={Rules}/>
    <Route path="/faq" component={FAQs}/>
    <Route path="contact" component={Contact}/>
    <Route path="/admin" component={Login} onEnter={onEnterLogin}/>
    <Route path="/dashboard" component={Dashboard} onEnter={onEnterDashboard}/>
    <Route path="/dashboard/:tournamentId" component={Dashboard} onEnter={onEnterTournament}/>
    <Route path="*" component={NotFound}/>
  </Router>
);

/*****************************************************************************/

export { onAuthenticationChange, routes };
