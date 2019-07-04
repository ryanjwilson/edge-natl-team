import { Meteor } from "meteor/meteor";
import moment from "moment";
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

import { Tournaments } from "./tournaments";
import { Wrestlers } from "./wrestlers";

export const Teams = new Mongo.Collection("teams");

if (Meteor.isServer) {
	Meteor.publish("teams", () => {
		return Teams.find({});
	});
}

/**
 * An API for inserting, removing, and updating a Team.
 */

Meteor.methods({

	/**
	 * Inserts a new Tournament into the Collection.
	 *
	 * @param {string} tournamentId the tournament identifier
	 * @param {string} divisionName the tournament division
	 * @returns {string} the unqiue identifier of the inserted document
	 */

	"teams.insert"(tournamentId, divisionName) {
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		const tournament = getTournament(tournamentId);
		const division = getDivision(tournament, divisionName);
		const roster = getRoster(division);

		return Teams.insert({
			name: "",
			tournament: {
				_id: tournament._id,
				name: tournament.name,
				division: {
					name: division.name
				}
			},
			roster,
			published: false,
			year: "",
			season: "",
			order: "",
			userId: this.userId,
			updatedAt: moment().valueOf()
		});
	},

	/**
	 * Removes a Team from the Collection.
	 *
	 * @param _id the unique identifier of the Team to be removed
	 */

	"teams.remove"(_id) {
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		new SimpleSchema({
			_id: { type: String, min: 1 }
		}).validate({ _id });

		Teams.remove({ _id, userId: this.userId });
	},

	/**
	 * Updates a Team in the Collection.
	 *
	 * @param _id the unique identifier of the Team to update
	 * @param updates the updates to be applied to the Team
	 */

	"teams.update"(_id, updates) {
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		new SimpleSchema({
			_id: { type: String, min: 1, required: true },
			name: { type: String },
			tournament: { type: Object },
			"tournament._id": { type: String, min: 1 },
			"tournament.name": { type: String },
			"tournament.division": { type: Object },
			"tournament.division.name": { type: String },
			roster: { type: Array, minCount: 1 },
			"roster.$": { type: Object },
			"roster.$.weightClass": { type: Number },
			"roster.$.wrestler": { type: String },
			"roster.$.role": { type: String },
			"roster.$.status": { type: String },
			published: { type: Boolean },
			year: { type: SimpleSchema.Integer },
			season: { type: String },
			order: { type: SimpleSchema.Integer }
		}, { requiredByDefault: false }).validate({ _id, ...updates });

		Teams.update({ _id, userId: this.userId }, {
			$set: { updatedAt: moment().valueOf(), ...updates }
		});
	}
});

/**
 * Retrieves a tournament by its unique identifier.
 * 
 * @param {string} tournamentId the unique identifier of the tournament
 * @returns {Object} the requested tournament
 */

const getTournament = (tournamentId) => {
	return Tournaments.findOne({ _id: tournamentId }, { name: 1, division: 1 });
};

/**
 * Retrieves a division by tournament and division name.
 * 
 * @param {Object} tournament the tournament for this division
 * @param {string} divisionName the name of this division
 * @returns {Object} the requested division
 */

const getDivision = (tournament, divisionName) => {
	return tournament.divisions.find((division) => division.name === divisionName);
};


/**
 * Retrieves a roster by division and unique tournament identifier.
 * 
 * @param {Object} division the division for this roster
 * @returns {Object} the requested roster
 */

const getRoster = (division) => {
	return division.weightClasses.map((weightClass) => {
		return {
			weightClass,
			wrestler: "",
			role: "",
			status: "Open"
		};
	});
};
