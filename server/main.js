import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';

import '../imports/startup/simple-schema-config.js';
import '../imports/api/applications';
// import '../imports/api/rosters';
import '../imports/api/tournaments';
import '../imports/api/wrestlers';

////////////////// SERVER APPLICATION EXECUTION STARTS HERE //////////////////

Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({ username: 'admin', password: 'admin'});
  }
});
