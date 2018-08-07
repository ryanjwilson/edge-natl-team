import { Meteor } from 'meteor/meteor';
import React from 'react';
import { browserHistory, Route, Router } from 'react-router';
import { Session } from 'meteor/session';

import Contact from '../ui/Contact';
import FAQs from '../ui/FAQs';
import Login from '../ui/admin/Login';
import NotFound from '../ui/NotFound';
import PastEvents from '../ui/PastEvents';
import Schedule from '../ui/Schedule';
import TeamRules from '../ui/TeamRules';
import ApplicationView from '../ui/admin/ApplicationView';
import TeamView from '../ui/admin/TeamView';
import TournamentView from '../ui/admin/TournamentView';
import WrestlerView from '../ui/admin/WrestlerView';

/*****************************************************************************/

const onAuthenticationChange = (isAuthenticated, currentPagePrivacy) => {
  const isPrivatePage = (currentPagePrivacy === 'authenticated');
  const isPublicPage = (currentPagePrivacy === 'unauthenticated');

  if (isPrivatePage && !isAuthenticated) {
    browserHistory.replace('/admin');
  } else if (isPublicPage && isAuthenticated) {
    browserHistory.replace('/');
  }
};

const onEnterGlobal = (nextState) => {
  const destination = nextState.routes[nextState.routes.length - 1];

  Session.set('currentPagePrivacy', destination.privacy);
  Session.set('isMenuOpen', false);
};

const onChangeGlobal = (prevState, nextState) => {
  const prev = (Object.keys(prevState.params).length === 0
    ? prevState.location.pathname.substring(1)
    : prevState.location.pathname.substring(1, prevState.location.pathname.lastIndexOf('/'))
  );
  const next = (Object.keys(nextState.params).length === 0
    ? nextState.location.pathname.substring(1)
    : nextState.location.pathname.substring(1, nextState.location.pathname.lastIndexOf('/'))
  );

  if (prev !== next) {
    switch (prev) {
      case 'tournaments': Session.set('multiselectedTournamentIds', []); break;
      case 'wrestlers': Session.set('multiselectedWrestlerIds', []); break;
      case 'teams': Session.set('multiselectedTeamIds', []); break;
    }
  }

  onEnterGlobal(nextState);
};

const onEnterTournament = (nextState) => {
  Session.set('selectedTournamentId', nextState.params.tournamentId);
};

const onEnterWrestler = (nextState) => {
  Session.set('selectedWrestlerId', nextState.params.wrestlerId);
};

const onEnterTeam = (nextState) => {
  Session.set('selectedTeamId', nextState.params.teamId);
};

const onLeaveTournament = () => {
  Session.set('selectedTournamentId', undefined);
};

const onLeaveWrestler = () => {
  Session.set('selectedWrestlerId', undefined);
};

const onLeaveTeam = () => {
  Session.set('selectedTeamId', undefined);
};

const routes = (
  <Router history={browserHistory}>
    <Route onEnter={onEnterGlobal} onChange={onChangeGlobal}>
      <Route path="/" component={Schedule}/>
      <Route path="/rules" component={TeamRules}/>
      <Route path="/faq" component={FAQs}/>
      <Route path="/media" component={PastEvents}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/admin" component={Login} privacy="unauthenticated"/>
      <Route path="/tournaments" component={TournamentView} privacy="authenticated"/>
      <Route path="/tournaments/:tournamentId" component={TournamentView} privacy="authenticated" onEnter={onEnterTournament} onLeave={onLeaveTournament}/>
      <Route path="/wrestlers" component={WrestlerView} privacy="authenticated"/>
      <Route path="/wrestlers/:wrestlerId" component={WrestlerView} privacy="authenticated" onEnter={onEnterWrestler} onLeave={onLeaveWrestler}/>
      <Route path="/teams" component={TeamView} privacy="authenticated"/>
      <Route path="/teams/:teamId" component={TeamView} privacy="authenticated" onEnter={onEnterTeam} onLeave={onLeaveTeam}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

/*****************************************************************************/

export { onAuthenticationChange, routes };
