import { Meteor } from "meteor/meteor";
import moment from "moment";
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const Messages = new Mongo.Collection("messages");

if (Meteor.isServer) {
	Meteor.publish("messages", () => {
		return Messages.find({});
	});
}

/**
 * An API for inserting, removing, and updating a Message.
 */

Meteor.methods({

	/**
	 * Inserts a new Message into the Collection.
	 *
	 * @returns the unqiue identifier of the inserted document
	 */

	"messages.insert"() {
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		return Messages.insert({
			sender: "",
			email: "",
			phone: "",
			body: "",
			answered: false,
			updatedAt: moment().valueOf()
		});
	},

	/**
	 * Inserts a new Message into the Collection.
	 *
	 * @param values the values submitted through the contact form
	 * @returns the unqiue identifier of the inserted document
	 */

	"messages.submit"(values) {
		new SimpleSchema({
			sender: { type: String },
            email: { type: String },
            phone: { type: String },
            body: { type: String },
            answered: { type: Boolean, required: true },
		}, { requiredByDefault: false }).validate({ ...values });

		return Messages.insert({
			sender: values.sender,
			email: values.email,
			phone: values.phone,
			body: values.body,
			answered: false,
			updatedAt: moment().valueOf()
		});
	},

	/**
	 * Removes a Message from the Collection.
	 *
	 * @param _id the unique identifier of the Message to be removed
	 */

	"messages.remove"(_id) {
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		new SimpleSchema({
			_id: { type: String, min: 1 }
		}).validate({ _id });

		Messages.remove({ _id });
	},

	/**
	 * Updates a Message in the Collection.
	 *
	 * @param _id the unique identifier of the Team to update
	 * @param updates the updates to be applied to the Team
	 */

	"messages.update"(_id, updates) {
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		new SimpleSchema({
			_id: { type: String, min: 1, required: true },
            sender: { type: String },
            email: { type: String },
            phone: { type: String },
            body: { type: String },
            answered: { type: Boolean, required: true },
		}, { requiredByDefault: false }).validate({ _id, ...updates });

		Messages.update({ _id }, {
			$set: { updatedAt: moment().valueOf(), ...updates }
		});
	}
});
