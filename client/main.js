import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

import '../imports/startup/simple-schema-config.js';
import { onAuthenticationChange, routes } from '../imports/routes/routes';

/**
 * Tracks authentication changes via the isAuthenticated variable. This code is executed whenever a change is detected.
 */

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');

  onAuthenticationChange(isAuthenticated, currentPagePrivacy);
});

/**
 * Tracks changes in the selected Tournament or Wrestler Session variable. This code is executed whenever a change is detected.
 */

Tracker.autorun(() => {
  const selectedTournamentId = Session.get('selectedTournamentId');
  const selectedWrestlerId = Session.get('selectedWrestlerId');
  const selectedTeamId = Session.get('selectedTeamId');

  Session.set('isNavigationOpen', false);       // prevents admin sidebar panel animation on browser refresh
  Session.set('isMenuOpen', false);             // prevents admin menu animation on browser refresh
  Session.set('isApplicationOpen', false);      // prevents application animation on browser refresh

  // conditionally re-direct the application based on selected tournament, wrestler, team, or current pathname.

  if (selectedTournamentId) {
    browserHistory.replace(`/tournaments/${selectedTournamentId}`);
  } else if (selectedWrestlerId) {
    browserHistory.replace(`/wrestlers/${selectedWrestlerId}`);
  } else if (selectedTeamId) {
    browserHistory.replace(`/teams/${selectedTeamId}`);
  } else {
    if (this.location.pathname.includes('/tournaments')) {
      browserHistory.replace('/tournaments');
    } else if (this.location.pathname.includes('/wrestlers')) {
      browserHistory.replace('/wrestlers');
    } else if (this.location.pathname.includes('/teams')) {
      browserHistory.replace('/teams');
    }
  }
});

/**
 * Tracks changes in the sidebar menu status, allowing for the mobile-friendly slide-out item list panel to take effect.
 */

// TODO - how will slide-out item list panel be handled for mobile version of the application?

// Tracker.autorun(() => {
//   document.body.classList.toggle('is-sidebar-open', Session.get('isSidebarOpen'));
// });

/*
 * Tracks changes in the mobile-frienly public navigation menu (i.e., opened or closed).
 */

Tracker.autorun(() => {
  document.body.classList.toggle('is-navigation-open', Session.get('isNavigationOpen'));
  document.body.classList.toggle('no-scroll', Session.get('isNavigationOpen'));
});

/**
 * Tracks changes in the slide-out menu (desktop-only).
 */

Tracker.autorun(() => {
  document.body.classList.toggle('is-menu-open', Session.get('isMenuOpen'));
  document.body.classList.toggle('no-scroll', Session.get('isMenuOpen'));
});

/*
 * Tracks changes in the slide-out application view (mobile-only).
 */

// Tracker.autorun(() => {
//   document.body.classList.toggle('is-application-open', Session.get('isApplicationOpen'));
// });

/////// CLIENT APPLICATION EXECUTION STARTS HERE ///////////////////////////////////////////////////////////////////////////////////////////

Meteor.startup(() => {
  Session.set('isNavigationOpen', false);       // public navigation menu (mobile-only)
  Session.set('isMenuOpen', false);             // admin menu (mobile-only)
  Session.set('isApplicationOpen', false);      // wrestler application (mobile-only)

  // setup selected tournament, wrestler, team, and message for each of the associated views

  Session.set('selectedTournamentId', undefined);
  Session.set('selectedWrestlerId', undefined);
  Session.set('selectedTeamId', undefined);

  // setup multiselected tournaments, wrestlers, teams, and messages for each of the associated views

  Session.set('multiselectedTournamentIds', []);
  Session.set('multiselectedWrestlerIds', []);
  Session.set('multiselectedTeamIds', []);

  // setup session variables for list filtering

  Session.set('showPublishedFilter', true);                      // tournament view, events shown on public calendar
  Session.set('showUnpublishedFilter', true);                    // tournament view, events hidden on public calendar

  Session.set('selectedTournamentFilter', undefined);            // wrestler view, tournament selected from dropdown menu
  Session.set('selectedDivisionFilter', undefined);              // wrestler view, division selected from dropdown menu
  Session.set('selectedWeightClassFilter', undefined);           // wrestler view, weight class selected from dropdown menu

  Session.set('selectedTeamTournamentFilter', undefined);        // team view, tournament selected from dropdown menu
  Session.set('selectedTeamDivisionFilter', undefined);          // team view, division selected from dropdown menu
  Session.set('selectedTeamTournamentModalFilter', undefined);   // team view, tournament selected from the modal dropdown menu
  Session.set('selectedTeamDivisionNidakFilter', undefined);     // team view, division selected from the modal dropdown menu

  ReactDOM.render(routes, document.getElementById('app'));
});
