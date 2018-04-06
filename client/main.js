import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';

import { onAuthenticationChange, routes } from '../imports/routes/routes';

/*****************************************************************************/

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthenticationChange(isAuthenticated);
});

////////////////// CLIENT APPLICATION EXECUTION STARTS HERE //////////////////

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
