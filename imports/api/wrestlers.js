import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

// import { Applications } from './applications';

export const Wrestlers = new Mongo.Collection('wrestlers');

if (Meteor.isServer) {
  Meteor.publish('wrestlers', function() {
    return Wrestlers.find({ userId: this.userId });
  });
}

/**
 * An API for inserting, removing, and updating a Wrestler, as well as
 * submitting an application for one or more Tournaments for a Wrestler.
 */

Meteor.methods({

  /**
   * Inserts a new Wrestler into the Collection.
   *
   * @return the unqiue _id of the inserted document
   */

  'wrestlers.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Wrestlers.insert({
      name: '',
      dob: '',
      grade: '',
      weight: '',
      parents: [''],
      emails: [''],
      phones: [''],
      applications: [],
      // applications: [{
      //   tournamentId: 'ciEodXxSyxxwR2sWS',
      //   name: 'Test 1a',
      //   startDate: 'July 21, 2018',
      //   division: 'Test 1 Division',
      //   weightClasses: [1],
      //   open: true,
      //   status: ''
      // }, {
      //   tournamentId: 'auBg5jHQfN4hDDap8',
      //   name: 'Test 2a',
      //   startDate: 'July 27, 2018',
      //   division: 'Test 2 Division',
      //   weightClasses: [4],
      //   open: true,
      //   status: ''
      // }, {
      //   tournamentId: '2x9PG3kGHdZ5CNrwG',
      //   name: 'Test 1b',
      //   startDate: 'August 1, 2018',
      //   division: 'Test 3 Division',
      //   weightClasses: [7],
      //   open: true,
      //   status: ''
      // }],
      userId: this.userId,
      updatedAt: moment().valueOf()
    });
  },

  /**
   * Inserts a new Wrestler into the Collection.
   *
   * @param values - the values submitted through the application
   * @return the unqiue _id of the inserted document
   */

  'wrestlers.submit'(values) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      name: { type: String },
      dob: { type: String },
      grade: { type: String },
      parents: { type: Array },
      'parents.$': { type: String },
      emails: { type: Array },
      'emails.$': { type: String },
      phones: { type: Array },
      'phones.$': { type: String },
      applications: { type: Array, minCount: 1 },
      'applications.$': { type: Object },
      'applications.$.tournamentId': { type: String, min: 1 },
      'applications.$.name': { type: String },
      'applications.$.division': { type: String },
      'applications.$.weightClasses': { type: Array, minCount: 1 },
      'applications.$.weightClasses.$': { type: Number },
    }, { requiredByDefault: false }).validate(...values);

    return Wrestlers.insert({
      name: values.name,
      dob: values.dob,
      grade: values.grade,
      parents: values.parents,
      emails: values.emails,
      phones: values.phones,
      applications: values.applications,
      updatedAt: moment().valueOf()
    });
  },

  /**
   * Removes a Wrestler from the Collection.
   *
   * @param _id - the unique _id of the Wrestler to be removed
   */

  'wrestlers.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: { type: String, min: 1 }
    }).validate({ _id });

    Wrestlers.remove({ _id, userId: this.userId });
  },

  /**
   * Updates a Wrestler in the Collection.
   *
   * @param _id - the unique _id of the Wrestler to update
   * @param updates - the updates to be applied to the Wrestler
   */

  'wrestlers.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: { type: String, min: 1 },
      name: { type: String },
      dob: { type: String },
      grade: { type: String },
      weight: { type: String },
      parents: { type: Array },
      'parents.$': { type: String },
      emails: { type: Array },
      'emails.$': { type: String },
      phones: { type: Array },
      'phones.$': { type: String },
      applications: { type: Array, minCount: 1 },
      'applications.$': { type: Object },
      'applications.$.tournamentId': { type: String, min: 1 },
      'applications.$.name': { type: String },
      'applications.$.division': { type: String },
      'applications.$.weightClasses': { type: Array, minCount: 1 },
      'applications.$.weightClasses.$': { type: Number },
    }, { requiredByDefault: false }).validate({ _id, ...updates });

    Wrestlers.update({ _id, userId: this.userId }, {
      $set: { updatedAt: moment().valueOf(), ...updates }
    });
  }
});
