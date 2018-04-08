import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Tournaments } from './tournaments';

/*****************************************************************************/

const tournament = {
  _id: 'testTournamentId1',
  name: 'Test Duals 1',
  location: 'Somewhere, NJ',
  date: 'January 2, 2019',
  weighins: 'January 1, 2019, at 6:00pm',
  alternateWeighins: 'January 2, 2019, at 7:00am',
  division: 'K-6',
  weightClasses: '55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 112, 119, 127, 136, 144, HWT',
  allowance: 0,
  year: 0,
  season: 'Fall',
  readyToPublish: false,
  userId: 'testUserId1',
  updatedAt: 0
};

if (Meteor.isServer) {
  describe('Tournaments API', function() {
    beforeEach(function() {
      Tournaments.remove({});
      Tournaments.insert(tournament);
    });

    describe('Tournament Insertions', function() {
      it('should insert a new tournament', function() {
        const userId = tournament.userId;
        const _id = Meteor.server.method_handlers['tournaments.insert'].apply({ userId });

        expect(Tournaments.findOne({ _id, userId })).toExist();
      });

      it('should not insert a new tournament if unauthenticated', function() {
        expect(() => {
          Meteor.server.method_handlers['tournaments.insert']();
        }).toThrow();
      });
    });

    describe('Tournament Removals', function() {
      it('should remove a tournament', function() {
        const _id = tournament._id;
        const userId = tournament.userId;
        Meteor.server.method_handlers['tournaments.remove'].apply({ userId }, [ _id ]);

        expect(Tournaments.findOne({ _id })).toNotExist();
      });

      it('should not remove a tournament if unauthenticated', function() {
        const _id = tournament._id;

        expect(() => {
          Meteor.server.method_handlers['tournaments.remove'].apply({}, [ _id ]);
        }).toThrow();
      });

      it('should not remove a tournament if _id is invalid', function() {
        const userId = tournament.userId;

        expect(() => {
          Meteor.server.method_handlers['tournaments.remove'].apply({ userId });
        }).toThrow();
      });
    });

    describe('Tournament Updates', function() {
      it('should update the name of a tournament', function() {
        const name = 'Updated Name';
        const _id = tournament._id;
        const userId = tournament.userId;

        Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [ _id, { name } ]);

        const t = Tournaments.findOne(_id);

        expect(t.updatedAt).toBeGreaterThan(tournament.updatedAt);
        expect(t).toInclude({
          name,
          location: tournament.location,
          date: tournament.date,
          weighins: tournament.weighins,
          alternateWeighins: tournament.alternateWeighins,
          division: tournament.division,
          weightClasses: tournament.weightClasses,
          allowance: tournament.allowance,
          year: tournament.year,
          season: tournament.season,
          readyToPublish: tournament.readyToPublish
        });
      });

      it('should update the location of a tournament', function() {
        const location = 'Updated Location';
        const _id = tournament._id;
        const userId = tournament.userId;

        Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [ _id, { location } ]);

        const t = Tournaments.findOne(_id);

        expect(t.updatedAt).toBeGreaterThan(tournament.updatedAt);
        expect(t).toInclude({
          name: tournament.name,
          location,
          date: tournament.date,
          weighins: tournament.weighins,
          alternateWeighins: tournament.alternateWeighins,
          division: tournament.division,
          weightClasses: tournament.weightClasses,
          allowance: tournament.allowance,
          year: tournament.year,
          season: tournament.season,
          readyToPublish: tournament.readyToPublish
        });
      });

      it('should update the date of a tournament', function() {
        const date = 'Updated Date';
        const _id = tournament._id;
        const userId = tournament.userId;

        Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [ _id, { date } ]);

        const t = Tournaments.findOne(_id);

        expect(t.updatedAt).toBeGreaterThan(tournament.updatedAt);
        expect(t).toInclude({
          name: tournament.name,
          location: tournament.location,
          date,
          weighins: tournament.weighins,
          alternateWeighins: tournament.alternateWeighins,
          division: tournament.division,
          weightClasses: tournament.weightClasses,
          allowance: tournament.allowance,
          year: tournament.year,
          season: tournament.season,
          readyToPublish: tournament.readyToPublish
        });
      });

      it('should update the weigh-ins of a tournament', function() {
        const weighins = 'Updated Weigh-ins';
        const _id = tournament._id;
        const userId = tournament.userId;

        Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [ _id, { weighins } ]);

        const t = Tournaments.findOne(_id);

        expect(t.updatedAt).toBeGreaterThan(tournament.updatedAt);
        expect(t).toInclude({
          name: tournament.name,
          location: tournament.location,
          date: tournament.date,
          weighins,
          alternateWeighins: tournament.alternateWeighins,
          division: tournament.division,
          weightClasses: tournament.weightClasses,
          allowance: tournament.allowance,
          year: tournament.year,
          season: tournament.season,
          readyToPublish: tournament.readyToPublish
        });
      });

      it('should update the alternate weigh-ins of a tournament', function() {
        const alternateWeighins = 'Updated Alternate Weigh-ins';
        const _id = tournament._id;
        const userId = tournament.userId;

        Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [ _id, { alternateWeighins } ]);

        const t = Tournaments.findOne(_id);

        expect(t.updatedAt).toBeGreaterThan(tournament.updatedAt);
        expect(t).toInclude({
          name: tournament.name,
          location: tournament.location,
          date: tournament.date,
          weighins: tournament.weighins,
          alternateWeighins,
          division: tournament.division,
          weightClasses: tournament.weightClasses,
          allowance: tournament.allowance,
          year: tournament.year,
          season: tournament.season,
          readyToPublish: tournament.readyToPublish
        });
      });

      it('should update the division of a tournament', function() {
        const division = 'Updated Division';
        const _id = tournament._id;
        const userId = tournament.userId;

        Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [ _id, { division } ]);

        const t = Tournaments.findOne(_id);

        expect(t.updatedAt).toBeGreaterThan(tournament.updatedAt);
        expect(t).toInclude({
          name: tournament.name,
          location: tournament.location,
          date: tournament.date,
          weighins: tournament.weighins,
          alternateWeighins: tournament.alternateWeighins,
          division,
          weightClasses: tournament.weightClasses,
          allowance: tournament.allowance,
          year: tournament.year,
          season: tournament.season,
          readyToPublish: tournament.readyToPublish
        });
      });

      it('should update the weight classes of a tournament', function() {
        const weightClasses = '53, 58, 63, 68, 73, 78, 83, 88, 93, 98, 105, 112, 125, HWT';
        const _id = tournament._id;
        const userId = tournament.userId;

        Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [ _id, { weightClasses } ]);

        const t = Tournaments.findOne(_id);

        expect(t.updatedAt).toBeGreaterThan(tournament.updatedAt);
        expect(t).toInclude({
          name: tournament.name,
          location: tournament.location,
          date: tournament.date,
          weighins: tournament.weighins,
          alternateWeighins: tournament.alternateWeighins,
          division: tournament.division,
          weightClasses,
          allowance: tournament.allowance,
          year: tournament.year,
          season: tournament.season,
          readyToPublish: tournament.readyToPublish
        });
      });

      it('should update the allowance of a tournament', function() {
        const allowance = 3;
        const _id = tournament._id;
        const userId = tournament.userId;

        Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [ _id, { allowance } ]);

        const t = Tournaments.findOne(_id);

        expect(t.updatedAt).toBeGreaterThan(tournament.updatedAt);
        expect(t).toInclude({
          name: tournament.name,
          location: tournament.location,
          date: tournament.date,
          weighins: tournament.weighins,
          alternateWeighins: tournament.alternateWeighins,
          division: tournament.division,
          weightClasses: tournament.weightClasses,
          allowance,
          year: tournament.year,
          season: tournament.season,
          readyToPublish: tournament.readyToPublish
        });
      });

      it('should update the year of a tournament', function() {
        const year = 2019;
        const _id = tournament._id;
        const userId = tournament.userId;

        Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [ _id, { year } ]);

        const t = Tournaments.findOne(_id);

        expect(t.updatedAt).toBeGreaterThan(tournament.updatedAt);
        expect(t).toInclude({
          name: tournament.name,
          location: tournament.location,
          date: tournament.date,
          weighins: tournament.weighins,
          alternateWeighins: tournament.alternateWeighins,
          division: tournament.division,
          weightClasses: tournament.weightClasses,
          allowance: tournament.allowance,
          year,
          season: tournament.season,
          readyToPublish: tournament.readyToPublish
        });
      });

      it('should update the season of a tournament', function() {
        const season = 'Winter';
        const _id = tournament._id;
        const userId = tournament.userId;

        Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [ _id, { season } ]);

        const t = Tournaments.findOne(_id);

        expect(t.updatedAt).toBeGreaterThan(tournament.updatedAt);
        expect(t).toInclude({
          name: tournament.name,
          location: tournament.location,
          date: tournament.date,
          weighins: tournament.weighins,
          alternateWeighins: tournament.alternateWeighins,
          division: tournament.division,
          weightClasses: tournament.weightClasses,
          allowance: tournament.allowance,
          year: tournament.year,
          season,
          readyToPublish: tournament.readyToPublish
        });
      });

      it('should update the publish status of a tournament', function() {
        const readyToPublish = true;
        const _id = tournament._id;
        const userId = tournament.userId;

        Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [ _id, { readyToPublish } ]);

        const t = Tournaments.findOne(_id);

        expect(t.updatedAt).toBeGreaterThan(tournament.updatedAt);
        expect(t).toInclude({
          name: tournament.name,
          location: tournament.location,
          date: tournament.date,
          weighins: tournament.weighins,
          alternateWeighins: tournament.alternateWeighins,
          division: tournament.division,
          weightClasses: tournament.weightClasses,
          allowance: tournament.allowance,
          year: tournament.year,
          season: tournament.season,
          readyToPublish
        });
      });

      it('should update a tournament', function() {
        const name = 'Updated Name';
        const location = 'Updated Location';
        const date = 'Updated Date';
        const weighins = 'Updated Weigh-ins';
        const alternateWeighins = 'Updated Alternate Weigh-ins';
        const division = 'Updated Division';
        const weightClasses = '52, 57, 62, 67, 72, 77, 82, 87, 92, 97, 105, 112, 125, 150, HWT';
        const allowance = 0.9;
        const year = 2019;
        const season = 'Winter';
        const readyToPublish = true;
        const _id = tournament._id;
        const userId = tournament.userId;

        Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [ _id, {
          name,
          location,
          date,
          weighins,
          alternateWeighins,
          division,
          weightClasses,
          allowance,
          year,
          season,
          readyToPublish
        }]);

        const t = Tournaments.findOne(_id);

        expect(t.updatedAt).toBeGreaterThan(tournament.updatedAt);
        expect(t).toInclude({
          name,
          location,
          date,
          weighins,
          alternateWeighins,
          division,
          weightClasses,
          allowance,
          year,
          season,
          readyToPublish
        });
      });

      it('should not update a tournament with invalid properties', function() {
        const _id = tournament._id;
        const userId = tournament.userId;
        const extras = {
          name: 'Updated Name',
          location: 'Updated Location',
          date: 'Updated Date',
          weighins: 'Updated Weigh-ins',
          alternateWeighins: 'Updated Alternate Weigh-ins',
          division: 'Updated Division',
          weightClasses: '52, 57, 62, 67, 72, 77, 82, 87, 92, 97, 105, 112, 125, 150, HWT',
          allowance: 0.9,
          year: 2019,
          season: 'Winter',
          readyToPublish: true,
          style: 'Scholastic'
        };

        expect(() => {
          Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [ _id, extras ]);
        }).toThrow();
      });

      it('should not update a tournament if user is not the owner', function() {
        const _id = tournament._id;
        const userId = tournament.userId + '123';
        const name = 'Updated Name';

        Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [ _id, { name } ]);

        const t = Tournaments.findOne(_id);

        expect(t).toInclude(tournament);
      });

      it('should not update a tournament if unauthenticated', function() {
        const _id = tournament._id;

        expect(() => {
          Meteor.server.method_handlers['tournaments.update'].apply({ }, [ _id ]);
        }).toThrow();
      });

      it('should not update a tournament if _id is invalid', function() {
        const userId = tournament.userId;

        expect(() => {
          Meteor.server.method_handlers['notes.update'].apply({ userId });
        }).toThrow();
      });
    });

    describe('Tournament Retrievals', function() {
      it('should return all tournaments created by a user', function() {
        const userId = tournament.userId;
        const result = Meteor.server.publish_handlers.tournaments.apply({ userId });
        const tournaments = result.fetch();

        expect(tournaments.length).toBe(1);
        expect(tournaments[0]).toEqual(tournament);
      });

      it('should return zero tournaments for a user that has not created any', function() {
        const userId = tournament.userId + '123';
        const result = Meteor.server.publish_handlers.tournaments.apply({ userId });
        const tournaments = result.fetch();

        expect(tournaments.length).toBe(0);
      });
    });
  });
}
