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

const onAuthenticationChange = (isAuthenticated, currentPagePrivacy) => {
  const isPrivatePage = (currentPagePrivacy === 'authenticated');
  const isPublicPage = (currentPagePrivacy === 'unauthenticated');

  // redirect to login page if:
  //    the user is not currently logged in
  //    the user is trying to access the dashboard page
  //
  // redirect to dashboard page if:
  //    the user is currently logged in
  //    the user is trying to access the login page

  if (isPrivatePage && !isAuthenticated) {
    browserHistory.replace('/admin');
  } else if (isPublicPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  }
};

const onEnterGlobal = (nextState) => {
  const destination = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', destination.privacy);

  Session.set('isMenuOpen', false);   // close the dropdown (desktop) / slide-out (mobile) menu after selection
};

const onChangeGlobal = (prevState, nextState) => {
  onEnterGlobal(nextState);
};

const onEnterTournament = (nextState) => {
  Session.set('selectedTournamentId', nextState.params.tournamentId);
};

const onLeaveTournament = () => {
  Session.set('selectedTournamentId', undefined);
};

const routes = (
  <Router history={browserHistory}>
    <Route onEnter={onEnterGlobal} onChange={onChangeGlobal}>
      <Route path="/" component={Schedule}/>
      <Route path="/rules" component={Rules}/>
      <Route path="/faq" component={FAQs}/>
      <Route path="contact" component={Contact}/>
      <Route path="/admin" component={Login} privacy="unauthenticated"/>
      <Route path="/dashboard" component={Dashboard} privacy="authenticated"/>
      <Route path="/dashboard/:tournamentId" component={Dashboard} privacy="authenticated" onEnter={onEnterTournament} onLeave={onLeaveTournament}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

/*****************************************************************************/

export { onAuthenticationChange, routes };
