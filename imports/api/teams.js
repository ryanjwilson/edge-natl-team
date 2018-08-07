import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

import { Tournaments } from './tournaments';
import { Wrestlers } from './wrestlers';

export const Teams = new Mongo.Collection('teams');

if (Meteor.isServer) {
  Meteor.publish('teams', () => {
    return Teams.find({});
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

  'teams.insert'(tournamentId, divisionName) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const tournament = getTournament(tournamentId);
    const division = getDivision(tournament, divisionName);
    const roster = getRoster(division, tournamentId);

    return Teams.insert({
      name: '',
      tournament: {
        _id: tournament._id,
        name: tournament.name,
        division: {
          name: division.name
        }
      },
      roster,
      published: false,
      year: '',                   // TODO - if we make this an integer, what should the default value be?
      season: '',
      userId: this.userId,
      updatedAt: moment().valueOf()
    });
  },

  /**
   * Removes a Team from the Collection.
   *
   * @param _id - the unique _id of the Team to be removed
   */

  'teams.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: { type: String, min: 1 }
    }).validate({ _id });

    Teams.remove({ _id, userId: this.userId });
  },

  /**
   * Updates a Team in the Collection.
   *
   * @param _id - the unique _id of the Team to update
   * @param updates - the updates to be applied to the Team
   */

  'teams.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: { type: String, min: 1, required: true },
      name: { type: String },
      tournament: { type: Object },
      'tournament._id': { type: String, min: 1 },
      'tournament.name': { type: String },
      'tournament.division': { type: Object },
      'tournament.division.name': { type: String },
      roster: { type: Array, minCount: 1 },
      'roster.$': { type: Object },
      'roster.$.weightClass': { type: Number },
      'roster.$.wrestler': { type: Object },
      'roster.$.wrestler._id': { type: String },
      'roster.$.wrestler.name': { type: String },
      'roster.$.split': { type: Object },
      'roster.$.split._id': { type: String },
      'roster.$.split.name': { type: String },
      'roster.$.role': { type: String },
      'roster.$.status': { type: String },
      'roster.$.availableWrestlers': { type: Array },
      'roster.$.availableWrestlers.$': { type: Object },
      'roster.$.availableWrestlers.$._id': { type: String, min: 1 },
      'roster.$.availableWrestlers.$.name': { type: String },
      year: { type: SimpleSchema.Integer },
      season: { type: String }
    }, { requiredByDefault: false }).validate({ _id, ...updates });

    Teams.update({ _id, userId: this.userId }, {
      $set: { updatedAt: moment().valueOf(), ...updates }
    });
  }
});

const getTournament = (tournamentId) => {
  return Tournaments.findOne({ _id: tournamentId }, { name: 1, division: 1 });
};

const getDivision = (tournament, divisionName) => {
  return tournament.divisions.find((division) => division.name === divisionName);
};

const getRoster = (division, tournamentId) => {
  return division.weightClasses.map((weightClass) => {
    const availableWrestlers = Wrestlers.find({
      'applications.tournamentId': tournamentId, 'applications.division': division.name, 'applications.weightClass': weightClass
    }, { fields: { name: 1 }}).fetch();

    return {
      weightClass,
      wrestler: {
        _id: '',
        name: ''
      },
      split: {
        _id: '',
        name: ''
      },
      role: '',
      status: 'Open',
      availableWrestlers
    };
  });
}
