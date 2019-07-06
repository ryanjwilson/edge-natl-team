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
	 * @param {string} messageId the message identifier
	 * @returns {string} the unqiue identifier of the inserted document
	 */

	"messages.insert"(messageId) {
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		return Messages.insert({
            sender: "",
            email: "",
            phone: "",
            body: "",
			responded: false,
			userId: this.userId,
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

		Messages.remove({ _id, userId: this.userId });
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
            responded: { type: Boolean, required: true },
		}, { requiredByDefault: false }).validate({ _id, ...updates });

		Messages.update({ _id, userId: this.userId }, {
			$set: { updatedAt: moment().valueOf(), ...updates }
		});
	}
});
