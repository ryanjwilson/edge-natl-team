import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Tournaments = new Mongo.Collection('tournaments');

if (Meteor.isServer) {
	Meteor.publish('tournaments', () => {
		return Tournaments.find({});
	});
}

/**
 * An API for inserting, removing, and updating a Tournament.
 */

Meteor.methods({

	/**
	 * Inserts a new Tournament into the Collection.
	 *
	 * @return the unqiue _id of the inserted document
	 */

	'tournaments.insert'() {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		return Tournaments.insert({
			name: '',
			location: '',
			startDate: '',              // TODO - default date object rather than empty string.
			endDate: '',                // TODO - but what should the default date be?
			weighins: '',
			alternateWeighins: '',
			divisions: [{
				name: '',
				weightClasses: [],
				allowance: 0,
				teams: 1
			}],
			published: false,
			year: '',                   // TODO - if we make this an integer, what should the default value be?
			season: '',
			order: '',
			userId: this.userId,
			updatedAt: moment().valueOf()
		});
	},

	/**
	 * Removes a Tournament from the Collection.
	 *
	 * @param _id - the unique _id of the Tournament to be removed
	 */

	'tournaments.remove'(_id) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		new SimpleSchema({
			_id: { type: String, min: 1 }
		}).validate({ _id });

		Tournaments.remove({ _id, userId: this.userId });
	},

	/**
	 * Updates a Tournament in the Collection.
	 *
	 * @param _id - the unique _id of the Tournament to update
	 * @param updates - the updates to be applied to the Tournament
	 */

	'tournaments.update'(_id, updates) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		new SimpleSchema({
			_id: { type: String, min: 1, required: true },
			name: { type: String },
			location: { type: String },
			startDate: { type: String },                          // TODO - convert to DateTime
			endDate: { type: String },                            // TODO - convert to DateTime
			weighins: { type: String },                           // TODO - convert to DateTime
			alternateWeighins: { type: String },                  // TODO - convert to DateTime
			divisions: { type: Array, minCount: 1 },
			'divisions.$': { type: Object },
			'divisions.$.name': { type: String },
			'divisions.$.weightClasses': { type: Array },
			'divisions.$.weightClasses.$': { type: Number },
			'divisions.$.allowance': { type: Number, min: 0 },
			'divisions.$.teams': { type: SimpleSchema.Integer, min: 1 },
			published: { type: Boolean, defaultValue: false },
			year: { type: SimpleSchema.Integer },
			season: { type: String },
			order: { type: SimpleSchema.Integer }
		}, { requiredByDefault: false }).validate({ _id, ...updates });

		Tournaments.update({ _id, userId: this.userId }, {
			$set: { updatedAt: moment().valueOf(), ...updates }
		});
	}
});
