import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Mongo } from "meteor/mongo";

import "../imports/api/teams";
import "../imports/api/tournaments";
import "../imports/api/wrestlers";
import "../imports/startup/simple-schema-config.js";

/**
 * Executes on application startup.
 */

Meteor.startup(() => {
	if (Meteor.users.find().count() === 0) {
		Accounts.createUser({ username: "admin", password: "admin" });
	}
});
