import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

import '../imports/startup/simple-schema-config.js';
import { onAuthenticationChange, routes } from '../imports/routes/routes';

/*****************************************************************************/

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
 * Session variable. This code is executed whenever a cxhange is detected.
 */

Tracker.autorun(() => {
  const selectedTournamentId = Session.get('selectedTournamentId');

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
  document.body.classList.toggle('is-nav-open', Session.get('isNavOpen'));
});

////////////////// CLIENT APPLICATION EXECUTION STARTS HERE //////////////////

Meteor.startup(() => {
  Session.set('isNavOpen', false);
  Session.set('selectedTournamentId', undefined);
  Session.set('showPublished', true);
  Session.set('showUnpublished', true);

  ReactDOM.render(routes, document.getElementById('app'));
});
