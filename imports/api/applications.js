import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

import { Wrestlers } from './wrestlers';

const Applications = new Mongo.Collection('applications');

if (Meteor.isServer) {
  Meteor.publish('applications', function() {
    return Applications.find({});
  });
}

Meteor.methods({
  'applications.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Applications.insert({
      wreslter: {},
      tournament: {},
      weightClass: '',
      updatedAt: moment().valueOf()
    });
  },

  'applications.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Applications.remove({ _id });
  },

  'applications.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      wrestler: {
        type: Object,
        optional: true
      },
      'wrestler.name': {
        type: String,
        optional: true
      },
      'wrestler.dob': {
        type: String,             // TODO - modify to support Date for sorting?
        optional: true
      },
      'wrestler.grade': {
        type: String,             // TODO - modify to support Number?
        optional: true
      },
      'wrestler.lastWrestled': {
        type: String,             // TODO - modify to support Date for sorting?
        optional: true
      },
      'wrestler.parentName': {
        type: String,
        optional: true
      },
      'wrestler.parentEmail': {
        type: String,
        optional: true
      },
      'wrestler.parentNumber': {
        type: String,
        optional: true
      },
      tournament: {
        type: Object,
        optional: true
      },
      'tournament.name': {
        type: String,
        optional: true
      },
      'tournament.division': {
        type: String,
        optional: true
      },
      weightClass: {
        type: String,
        optional: true
      }
    }).validate({ _id, ...updates });

    Applications.update({ _id }, {
      $set: { updatedAt: moment().valueOf(), ...updates }
    });
  },

  'applications.submit'(updates) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      wrestler: {
        type: Object,
        optional: false
      },
      'wrestler.name': {
        type: String,
        optional: false
      },
      'wrestler.dob': {
        type: String,             // TODO - modify to support Date for sorting?
        optional: false
      },
      'wrestler.grade': {
        type: String,             // TODO - modify to support Number?
        optional: false
      },
      'wrestler.parentName': {
        type: String,
        optional: false
      },
      'wrestler.parentEmail': {
        type: String,
        optional: false
      },
      'wrestler.parentNumber': {
        type: String,
        optional: false
      },
      tournament: {
        type: Object,
        optional: false
      },
      'tournament._id': {
        type: String,
        min: 1
      },
      'tournament.name': {
        type: String,
        optional: false
      },
      'tournament.division': {
        type: String,
        optional: false
      },
      weightClass: {
        type: String,
        optional: false
      }
    }).validate({ ...info });

    Applications.insert({
      wreslter: {},
      tournament: {},
      weightClass: '',
      updatedAt: moment().valueOf()
    });

    Applications.update({ _id }, {
      $set: { updatedAt: moment().valueOf(), ...updates }
    });

    // TODO - need to insert/update associated wrestler collection

    console.log(updates);
  }
});

export { Applications };
