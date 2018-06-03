import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

import { Applications } from './applications';

const Wrestlers = new Mongo.Collection('wrestlers');

if (Meteor.isServer) {
  Meteor.publish('wrestlers', function() {
    return Wrestlers.find({ userId: this.userId });
  });
}

Meteor.methods({
  'wrestlers.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Wrestlers.insert({
      name: '',
      dob: '',
      grade: '',
      weight: '',
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      userId: this.userId,
      updatedAt: moment().valueOf()
    });
  },

  'wrestlers.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Wrestlers.remove({ _id, userId: this.userId });
  },

  'wrestlers.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      name: {
        type: String,
        optional: true
      },
      dob: {
        type: String,       // TODO - modify to support Date for sorting?
        optional: true
      },
      grade: {
        type: String,       // TODO - modify to support Number?
        optional: true
      },
      weight: {
        type: String,       // TODO - modify to support Number?
        optional: true
      },
      parentName: {
        type: String,
        optional: true
      },
      parentEmail: {
        type: String,
        optional: true
      },
      parentPhone: {
        type: String,
        optional: true
      }
    }).validate({ _id, ...updates });

    Wrestlers.update({ _id, userId: this.userId }, {
      $set: { updatedAt: moment().valueOf(), ...updates }
    });
  },

  'wrestlers.sync'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Applications.find({
      crossReferenced: false
    }).fetch().map((application) => {
      if (application.wrestler.name && application.wrestler.name !== '') {
        Wrestlers.insert({
          name: application.wrestler.name,
          dob: application.wrestler.dob,
          grade: application.wrestler.grade,
          weight: application.weightClass,
          parentName: application.wrestler.parentName,
          parentEmail: application.wrestler.parentEmail,
          parentPhone: application.wrestler.parentPhone,
          userId: this.userId,
          updatedAt: moment().valueOf()
        });

        Applications.update({ _id: application._id }, {
          $set: { crossReferenced: true, updatedAt: moment().valueOf() }
        });
      }
    });
  }
});

export { Wrestlers };
