import { Meteor } from 'meteor/meteor';
import React from 'react';
import { browserHistory, Route, Router } from 'react-router';
import { Session } from 'meteor/session';

import Contact from '../ui/Contact';
import FAQs from '../ui/FAQs';
import Login from '../ui/admin/Login';
import NotFound from '../ui/NotFound';
import Rules from '../ui/Rules';
import Schedule from '../ui/Schedule';
import ApplicationView from '../ui/admin/ApplicationView';
import TournamentView from '../ui/admin/TournamentView';
import WrestlerView from '../ui/admin/WrestlerView';

/*****************************************************************************/

const onAuthenticationChange = (isAuthenticated, currentPagePrivacy) => {
  const isPrivatePage = (currentPagePrivacy === 'authenticated');
  const isPublicPage = (currentPagePrivacy === 'unauthenticated');

  // redirect to login page if:
  //    the user is not currently logged in
  //    the user is trying to access the tournaments view page
  //
  // redirect to dashboard page if:
  //    the user is currently logged in
  //    the user is trying to access the login page

  if (isPrivatePage && !isAuthenticated) {
    browserHistory.replace('/admin');
  } else if (isPublicPage && isAuthenticated) {
    browserHistory.replace('/tournaments');       // default view
  }
};

const onEnterGlobal = (nextState) => {
  const destination = nextState.routes[nextState.routes.length - 1];

  Session.set('currentPagePrivacy', destination.privacy);
  Session.set('isMenuOpen', false);   // close the slide-out (desktop-only) menu after selection
};

const onChangeGlobal = (prevState, nextState) => {
  onEnterGlobal(nextState);
};

const onEnterApplication = (nextState) => {
  Session.set('selectedApplicationId', nextState.params.applicationId);
};

const onEnterTournament = (nextState) => {
  Session.set('selectedTournamentId', nextState.params.tournamentId);
};

const onEnterWrestler = (nextState) => {
  Session.set('selectedWrestlerId', nextState.params.wrestlerId);
};

const onLeaveApplication = () => {
  Session.set('selectedApplicationId', undefined);
};

const onLeaveTournament = () => {
  Session.set('selectedTournamentId', undefined);
};

const onLeaveWrestler = () => {
  Session.set('selectedWrestlerId', undefined);
};

const routes = (
  <Router history={browserHistory}>
    <Route onEnter={onEnterGlobal} onChange={onChangeGlobal}>
      <Route path="/" component={Schedule}/>
      <Route path="/rules" component={Rules}/>
      <Route path="/faq" component={FAQs}/>
      <Route path="contact" component={Contact}/>
      <Route path="/admin" component={Login} privacy="unauthenticated"/>
      <Route path="/applications" component={ApplicationView} privacy="authenticated"/>
      <Route path="/applications/:applicationId" component={ApplicationView} privacy="authenticated" onEnter={onEnterApplication} onLeave={onLeaveApplication}/>
      <Route path="/tournaments" component={TournamentView} privacy="authenticated"/>
      <Route path="/tournaments/:tournamentId" component={TournamentView} privacy="authenticated" onEnter={onEnterTournament} onLeave={onLeaveTournament}/>
      <Route path="/wrestlers" component={WrestlerView} privacy="authenticated"/>
      <Route path="/wrestlers/:wrestlerId" component={WrestlerView} privacy="authenticated" onEnter={onEnterWrestler} onLeave={onLeaveWrestler}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

/*****************************************************************************/

export { onAuthenticationChange, routes };
