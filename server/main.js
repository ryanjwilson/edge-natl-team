import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';

import '../imports/api/tournaments';

////////////////// SERVER APPLICATION EXECUTION STARTS HERE //////////////////

Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({ username: 'admin', password: 'admin'});
  }
});
