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
 * Tracks changes in the selected application, tournament, or wrestler Session
 * variable. This code is executed whenever a change is detected.
 */

Tracker.autorun(() => {
  const selectedApplicationId = Session.get('selectedApplicationId');
  const selectedTournamentId = Session.get('selectedTournamentId');
  const selectedWrestlerId = Session.get('selectedWrestlerId');

  Session.set('isSidebarOpen', false);    // close on selection and browser refresh
  Session.set('isMenuOpen', false);       // close on browser refresh

  // conditionally re-direct the application based on selected application,
  // tournament, wrestler, or current pathname.

  if (selectedApplicationId) {
    browserHistory.replace(`/applications/${selectedApplicationId}`);
  } else if (selectedTournamentId) {
    browserHistory.replace(`/tournaments/${selectedTournamentId}`);
  } else if (selectedWrestlerId) {
    browserHistory.replace(`/wrestlers/${selectedWrestlerId}`);
  } else {
    if (this.location.pathname.includes('/applications')) {
      browserHistory.replace('/applications');
    } else if (this.location.pathname.includes('/tournaments')) {
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
  Session.set('selectedTournamentId', undefined);     // tournament view
  Session.set('selectedWrestlerId', undefined);       // wrestler view
  Session.set('selectedApplicationId', undefined);    // applicant view
  //Session.set('selectedRosterId', undefined);       // roster view

  Session.set('multiselectedTournamentIds', []);
  Session.set('multiselectedWrestlerIds', []);
  Session.set('multiselectedApplicationIds', []);
  // Session.set('multiselectedRosterIds', []);

  Session.set('isSidebarOpen', false);                // items list (mobile only)
  Session.set('isMenuOpen', false);                   // menu (desktop and mobile)

  // TODO - filters for other views need to be added

  Session.set('showPublished', true);                 // toggles tournaments shown on the public schedule
  Session.set('showUnpublished', true);               // toggles tournaments hidden from the public schedule

  ReactDOM.render(routes, document.getElementById('app'));
});
