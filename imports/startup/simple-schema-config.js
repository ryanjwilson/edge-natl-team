import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";

/**
 * Defines a default schema validation error.
 */

SimpleSchema.defineValidationErrorTransform(function (error) {
	return new Meteor.Error(400, error.message);
});
