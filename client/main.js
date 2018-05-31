import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

import { onAuthenticationChange, routes } from '../imports/routes/routes';
import '../imports/startup/simple-schema-config.js';

/******************************************************************************/

/*
 * Tracks authentication changes via the isAuthenticated variable. This code
 * is executed whenever a change is detected.
 */

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');

  onAuthenticationChange(isAuthenticated, currentPagePrivacy);
});

/*
 * Tracks changes in the selected tournament via the selectedTournamentId
 * Session variable. This code is executed whenever a change is detected.
 */

Tracker.autorun(() => {
  const selectedTournamentId = Session.get('selectedTournamentId');

  Session.set('isSidebarOpen', false);    // close on tournament selection and browser refresh
  Session.set('isMenuOpen', false);       // close on browser refresh (TODO: maybe there's a better place for this?)

  if (selectedTournamentId) {
    browserHistory.replace(`/dashboard/${selectedTournamentId}`);
  } else {
    browserHistory.replace('/dashboard');
  }
});

/*
 * Tracks changes in the navigation status, allowing for the mobile-friendly
 * slide-out navigation panel to take effect.
 */

Tracker.autorun(() => {
  document.body.classList.toggle('is-sidebar-open', Session.get('isSidebarOpen'));
});

/*
 * Tracks changes in the dropdown (desktop) / slide-out (mobile) menu status.
 */

Tracker.autorun(() => {
  document.body.classList.toggle('is-menu-open', Session.get('isMenuOpen'));
});

/////// EVENT LISTENERS ////////////////////////////////////////////////////////

/*
 * Close the slide-out menu (desktop-only) when a user clicks somewhere else in
 * the application.
 */

const closeMenu = function(e) {
  if (Session.get('isMenuOpen')) {
    Session.set('isMenuOpen', false);
  }
};

const ignoreCloseMenu = function(e) {
  if (Session.get('isMenuOpen')) {
    e.stopPropagation();
  }
};

/////// CLIENT APPLICATION EXECUTION STARTS HERE ///////////////////////////////

Meteor.startup(() => {
  Session.set('selectedTournamentId', undefined);
  Session.set('isSidebarOpen', false);                // items list (mobile only)
  Session.set('isMenuOpen', false);                   // menu (desktop and mobile)
  Session.set('showPublished', true);
  Session.set('showUnpublished', true);

  ReactDOM.render(routes, document.getElementById('app'));

  /*
   * Add event listeners.
   */
   
  document.body.addEventListener('click', closeMenu);
  document.getElementById('slide-out-menu').addEventListener('click', ignoreCloseMenu);
});
