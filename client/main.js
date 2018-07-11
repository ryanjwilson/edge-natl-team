import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

import '../imports/startup/simple-schema-config.js';
import { onAuthenticationChange, routes } from '../imports/routes/routes';

/**
 * Tracks authentication changes via the isAuthenticated variable. This code is
 * executed whenever a change is detected.
 */

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');

  onAuthenticationChange(isAuthenticated, currentPagePrivacy);
});

/**
 * Tracks changes in the selected Tournament or Wrestler Session variable. This
 * code is executed whenever a change is detected.
 */

Tracker.autorun(() => {
  const selectedTournamentId = Session.get('selectedTournamentId');
  const selectedWrestlerId = Session.get('selectedWrestlerId');

  Session.set('isSidebarOpen', false);    // close on selection and browser refresh
  Session.set('isMenuOpen', false);       // close on browser refresh

  // conditionally re-direct the application based on selected application,
  // tournament, wrestler, or current pathname.

  if (selectedTournamentId) {
    browserHistory.replace(`/tournaments/${selectedTournamentId}`);
  } else if (selectedWrestlerId) {
    browserHistory.replace(`/wrestlers/${selectedWrestlerId}`);
  } else {
    if (this.location.pathname.includes('/tournaments')) {
      browserHistory.replace('/tournaments');
    } else if (this.location.pathname.includes('/wrestlers')) {
      browserHistory.replace('/wrestlers');
    }
  }
});

/**
 * Tracks changes in the sidebar menu status, allowing for the mobile-friendly
 * slide-out item list panel to take effect.
 */

Tracker.autorun(() => {
  document.body.classList.toggle('is-sidebar-open', Session.get('isSidebarOpen'));
});

/**
 * Tracks changes in the slide-out menu (desktop-only).
 */

Tracker.autorun(() => {
  document.body.classList.toggle('is-menu-open', Session.get('isMenuOpen'));
});

/////// CLIENT APPLICATION EXECUTION STARTS HERE ///////////////////////////////////////////////////////////////////////////////////////////

Meteor.startup(() => {
  Session.set('isSidebarOpen', false);    // mobile list selected (tournament, wrestler, roster)
  Session.set('isMenuOpen', false);       // application navigation (desktop and mobile)

  // setup selected tournament, wrestler, and roster for each view

  Session.set('selectedTournamentId', undefined);
  Session.set('selectedWrestlerId', undefined);
  //Session.set('selectedRosterId', undefined);

  // setup multiselected tournaments, wrestlers, and rosters for each view

  Session.set('multiselectedTournamentIds', []);
  Session.set('multiselectedWrestlerIds', []);
  // Session.set('multiselectedRosterIds', []);

  // setup session variables for list filtering

  Session.set('showPublishedFilter', true);               // tournament view, events shown on public calendar
  Session.set('showUnpublishedFilter', true);             // tournament view, events hidden on public calendar
  Session.set('selectedTournamentFilter', undefined);     // wrestler view, tournament selected from filter dropdown menu
  Session.set('selectedDivisionFilter', undefined);       // wrestler view, division selected from filter dropdown
  Session.set('selectedWeightClassFilter', undefined);    // wrestler view, weight class selected from filter dropdown

  ReactDOM.render(routes, document.getElementById('app'));
});
