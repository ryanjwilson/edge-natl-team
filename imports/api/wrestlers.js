import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

// import { Applications } from './applications';

export const Wrestlers = new Mongo.Collection('wrestlers');

if (Meteor.isServer) {
  Meteor.publish('wrestlers', () => {
    return Wrestlers.find({});
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
      parents: [{
        name: '',
        valid: false
      }],
      emails: [{
        text: '',
        valid: false
      }],
      phones: [{
        number: '',
        valid: false
      }],
      applications: [],
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
    new SimpleSchema({
      name: { type: String, min: 1 },
      dob: { type: String },
      grade: { type: String },
      weight: { type: String },
      parents: { type: Array },
      'parents.$': { type: Object },
      'parents.$.name': { type: String, min: 1 },
      'parents.$.valid': { type: Boolean },
      emails: { type: Array },
      'emails.$': { type: Object },
      'emails.$.text': { type: String, regEx: SimpleSchema.RegEx.EmailWithTLD },
      'emails.$.valid': { type: Boolean },
      phones: { type: Array },
      'phones.$': { type: Object },
      'phones.$.number': { type: String, regEx: SimpleSchema.RegEx.Phone },
      'phones.$.valid': { type: Boolean },
      applications: { type: Array, minCount: 1 },
      'applications.$': { type: Object },
      'applications.$.tournamentId': { type: String, min: 1 },
      'applications.$.name': { type: String },
      'applications.$.division': { type: String },
      'applications.$.weightClass': { type: Number },
      'applications.$.open': { type: Boolean, defaultValue: true },
      'applications.$.status': { type: String, defaultValue: '' },
      'applications.$.teamId': { type: String }
    }, { requiredByDefault: false }).validate({ ...values });

    return Wrestlers.insert({
      name: values.name,
      dob: values.dob,
      grade: values.grade,
      weight: values.weight,
      parents: values.parents,
      emails: values.emails,
      phones: values.phones,
      applications: values.applications,
      updatedAt: moment().valueOf(),
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

    Wrestlers.remove({ _id });
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
      name: { type: String, min: 1 },
      dob: { type: String },
      grade: { type: String },
      weight: { type: String },
      parents: { type: Array },
      'parents.$': { type: Object },
      'parents.$.name': { type: String, min: 1 },
      'parents.$.valid': { type: Boolean },
      emails: { type: Array },
      'emails.$': { type: Object },
      'emails.$.text': { type: String, regEx: SimpleSchema.RegEx.EmailWithTLD },
      'emails.$.valid': { type: Boolean },
      phones: { type: Array },
      'phones.$': { type: Object },
      'phones.$.number': { type: String, regEx: SimpleSchema.RegEx.Phone },
      'phones.$.valid': { type: Boolean },
      applications: { type: Array, minCount: 1 },
      'applications.$': { type: Object },
      'applications.$.tournamentId': { type: String, min: 1 },
      'applications.$.name': { type: String },
      'applications.$.division': { type: String },
      'applications.$.weightClass': { type: Number },
    }, { requiredByDefault: false }).validate({ _id, ...updates });

    Wrestlers.update({ _id }, {
      $set: { updatedAt: moment().valueOf(), ...updates }
    });
  }
});
