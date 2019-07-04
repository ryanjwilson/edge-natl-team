import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { sampleTournaments } from '../data/samples';
import { Tournaments } from './tournaments';

if (Meteor.isServer) {
	describe('Tournaments API', function () {
		beforeEach(function () {
			Tournaments.remove({});
			Tournaments.insert(sampleTournaments[0]);
			// Tournaments.insert(sampleTournaments[1]);
			// Tournaments.insert(sampleTournaments[2]);
		});

		describe('Tournament Insertions', function () {
			it('should insert a new tournament', function () {
				const userId = sampleTournaments[0].userId;
				const _id = Meteor.server.method_handlers['tournaments.insert'].apply({ userId });

				expect(Tournaments.findOne({ _id, userId })).toExist();
			});

			it('should not insert a new tournament if unauthenticated', function () {
				expect(() => {
					Meteor.server.method_handlers['tournaments.insert']();
				}).toThrow();
			});
		});

		describe('Tournament Removals', function () {
			it('should remove a tournament', function () {
				const _id = sampleTournaments[0]._id;
				const userId = sampleTournaments[0].userId;
				Meteor.server.method_handlers['tournaments.remove'].apply({ userId }, [_id]);

				expect(Tournaments.findOne({ _id })).toNotExist();
			});

			it('should not remove a tournament if unauthenticated', function () {
				const _id = sampleTournaments[0]._id;

				expect(() => {
					Meteor.server.method_handlers['tournaments.remove'].apply({}, [_id]);
				}).toThrow();
			});

			it('should not remove a tournament if _id is invalid', function () {
				const userId = sampleTournaments[0].userId;

				expect(() => {
					Meteor.server.method_handlers['tournaments.remove'].apply({ userId });
				}).toThrow();
			});
		});

		describe('Tournament Updates', function () {
			it('should update the name of a tournament', function () {
				const name = 'Updated Name';
				const _id = sampleTournaments[0]._id;
				const userId = sampleTournaments[0].userId;

				Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [_id, { name }]);
				const t = Tournaments.findOne(_id);

				expect(t).toInclude({
					_id,
					name,
					location: sampleTournaments[0].location,
					startDate: sampleTournaments[0].startDate,
					endDate: sampleTournaments[0].endDate,
					weighins: sampleTournaments[0].weighins,
					alternateWeighins: sampleTournaments[0].alternateWeighins,
					division: sampleTournaments[0].division,
					weightClasses: sampleTournaments[0].weightClasses,
					allowance: sampleTournaments[0].allowance,
					year: sampleTournaments[0].year,
					season: sampleTournaments[0].season,
					published: sampleTournaments[0].published,
					userId
				});
				expect(t.updatedAt).toBeGreaterThan(sampleTournaments[0].updatedAt);
			});

			it('should update the location of a tournament', function () {
				const location = 'Updated Location';
				const _id = sampleTournaments[0]._id;
				const userId = sampleTournaments[0].userId;

				Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [_id, { location }]);
				const t = Tournaments.findOne(_id);

				expect(t).toInclude({
					_id,
					name: sampleTournaments[0].name,
					location,
					startDate: sampleTournaments[0].startDate,
					endDate: sampleTournaments[0].endDate,
					weighins: sampleTournaments[0].weighins,
					alternateWeighins: sampleTournaments[0].alternateWeighins,
					division: sampleTournaments[0].division,
					weightClasses: sampleTournaments[0].weightClasses,
					allowance: sampleTournaments[0].allowance,
					year: sampleTournaments[0].year,
					season: sampleTournaments[0].season,
					published: sampleTournaments[0].published,
					userId
				});
				expect(t.updatedAt).toBeGreaterThan(sampleTournaments[0].updatedAt);
			});

			it('should update the start date of a tournament', function () {
				const startDate = 'Updated Start Date';
				const _id = sampleTournaments[0]._id;
				const userId = sampleTournaments[0].userId;

				Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [_id, { startDate }]);
				const t = Tournaments.findOne(_id);

				expect(t.updatedAt).toBeGreaterThan(sampleTournaments[0].updatedAt);
				expect(t).toInclude({
					_id,
					name: sampleTournaments[0].name,
					location: sampleTournaments[0].location,
					startDate,
					endDate: sampleTournaments[0].endDate,
					weighins: sampleTournaments[0].weighins,
					alternateWeighins: sampleTournaments[0].alternateWeighins,
					division: sampleTournaments[0].division,
					weightClasses: sampleTournaments[0].weightClasses,
					allowance: sampleTournaments[0].allowance,
					year: sampleTournaments[0].year,
					season: sampleTournaments[0].season,
					published: sampleTournaments[0].published,
					userId
				});
				expect(t.updatedAt).toBeGreaterThan(sampleTournaments[0].updatedAt);
			});

			it('should update the end date of a tournament', function () {
				const endDate = 'Updated End Date';
				const _id = sampleTournaments[0]._id;
				const userId = sampleTournaments[0].userId;

				Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [_id, { endDate }]);
				const t = Tournaments.findOne(_id);

				expect(t.updatedAt).toBeGreaterThan(sampleTournaments[0].updatedAt);
				expect(t).toInclude({
					_id,
					name: sampleTournaments[0].name,
					location: sampleTournaments[0].location,
					startDate: sampleTournaments[0].startDate,
					endDate,
					weighins: sampleTournaments[0].weighins,
					alternateWeighins: sampleTournaments[0].alternateWeighins,
					division: sampleTournaments[0].division,
					weightClasses: sampleTournaments[0].weightClasses,
					allowance: sampleTournaments[0].allowance,
					year: sampleTournaments[0].year,
					season: sampleTournaments[0].season,
					published: sampleTournaments[0].published,
					userId
				});
			});

			it('should update the weigh-ins of a tournament', function () {
				const weighins = 'Updated Weigh-ins';
				const _id = sampleTournaments[0]._id;
				const userId = sampleTournaments[0].userId;

				Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [_id, { weighins }]);
				const t = Tournaments.findOne(_id);

				expect(t).toInclude({
					_id,
					name: sampleTournaments[0].name,
					location: sampleTournaments[0].location,
					startDate: sampleTournaments[0].startDate,
					endDate: sampleTournaments[0].endDate,
					weighins,
					alternateWeighins: sampleTournaments[0].alternateWeighins,
					division: sampleTournaments[0].division,
					weightClasses: sampleTournaments[0].weightClasses,
					allowance: sampleTournaments[0].allowance,
					year: sampleTournaments[0].year,
					season: sampleTournaments[0].season,
					published: sampleTournaments[0].published,
					userId
				});
				expect(t.updatedAt).toBeGreaterThan(sampleTournaments[0].updatedAt);
			});

			it('should update the alternate weigh-ins of a tournament', function () {
				const alternateWeighins = 'Updated Alternate Weigh-ins';
				const _id = sampleTournaments[0]._id;
				const userId = sampleTournaments[0].userId;

				Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [_id, { alternateWeighins }]);
				const t = Tournaments.findOne(_id);

				expect(t).toInclude({
					_id,
					name: sampleTournaments[0].name,
					location: sampleTournaments[0].location,
					startDate: sampleTournaments[0].startDate,
					endDate: sampleTournaments[0].endDate,
					weighins: sampleTournaments[0].weighins,
					alternateWeighins,
					division: sampleTournaments[0].division,
					weightClasses: sampleTournaments[0].weightClasses,
					allowance: sampleTournaments[0].allowance,
					year: sampleTournaments[0].year,
					season: sampleTournaments[0].season,
					published: sampleTournaments[0].published,
					userId
				});
				expect(t.updatedAt).toBeGreaterThan(sampleTournaments[0].updatedAt);
			});

			it('should update the division of a tournament', function () {
				const division = 'Updated Division';
				const _id = sampleTournaments[0]._id;
				const userId = sampleTournaments[0].userId;

				Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [_id, { division }]);
				const t = Tournaments.findOne(_id);

				expect(t).toInclude({
					_id,
					name: sampleTournaments[0].name,
					location: sampleTournaments[0].location,
					startDate: sampleTournaments[0].startDate,
					endDate: sampleTournaments[0].endDate,
					weighins: sampleTournaments[0].weighins,
					alternateWeighins: sampleTournaments[0].alternateWeighins,
					division,
					weightClasses: sampleTournaments[0].weightClasses,
					allowance: sampleTournaments[0].allowance,
					year: sampleTournaments[0].year,
					season: sampleTournaments[0].season,
					published: sampleTournaments[0].published,
					userId
				});
				expect(t.updatedAt).toBeGreaterThan(sampleTournaments[0].updatedAt);
			});

			it('should update the weight classes of a tournament', function () {
				const weightClasses = '53, 58, 63, 68, 73, 78, 83, 88, 93, 98, 105, 112, 125, HWT';
				const _id = sampleTournaments[0]._id;
				const userId = sampleTournaments[0].userId;

				Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [_id, { weightClasses }]);
				const t = Tournaments.findOne(_id);

				expect(t).toInclude({
					_id,
					name: sampleTournaments[0].name,
					location: sampleTournaments[0].location,
					startDate: sampleTournaments[0].startDate,
					endDate: sampleTournaments[0].endDate,
					weighins: sampleTournaments[0].weighins,
					alternateWeighins: sampleTournaments[0].alternateWeighins,
					division: sampleTournaments[0].division,
					weightClasses,
					allowance: sampleTournaments[0].allowance,
					year: sampleTournaments[0].year,
					season: sampleTournaments[0].season,
					published: sampleTournaments[0].published,
					userId
				});
				expect(t.updatedAt).toBeGreaterThan(sampleTournaments[0].updatedAt);
			});

			it('should update the allowance of a tournament', function () {
				const allowance = 3;
				const _id = sampleTournaments[0]._id;
				const userId = sampleTournaments[0].userId;

				Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [_id, { allowance }]);
				const t = Tournaments.findOne(_id);

				expect(t).toInclude({
					_id,
					name: sampleTournaments[0].name,
					location: sampleTournaments[0].location,
					startDate: sampleTournaments[0].startDate,
					endDate: sampleTournaments[0].endDate,
					weighins: sampleTournaments[0].weighins,
					alternateWeighins: sampleTournaments[0].alternateWeighins,
					division: sampleTournaments[0].division,
					weightClasses: sampleTournaments[0].weightClasses,
					allowance,
					year: sampleTournaments[0].year,
					season: sampleTournaments[0].season,
					published: sampleTournaments[0].published,
					userId
				});
				expect(t.updatedAt).toBeGreaterThan(sampleTournaments[0].updatedAt);
			});

			it('should update the year of a tournament', function () {
				const year = 2019;
				const _id = sampleTournaments[0]._id;
				const userId = sampleTournaments[0].userId;

				Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [_id, { year }]);
				const t = Tournaments.findOne(_id);

				expect(t.updatedAt).toBeGreaterThan(sampleTournaments[0].updatedAt);
				expect(t).toInclude({
					_id,
					name: sampleTournaments[0].name,
					location: sampleTournaments[0].location,
					startDate: sampleTournaments[0].startDate,
					endDate: sampleTournaments[0].endDate,
					weighins: sampleTournaments[0].weighins,
					alternateWeighins: sampleTournaments[0].alternateWeighins,
					division: sampleTournaments[0].division,
					weightClasses: sampleTournaments[0].weightClasses,
					allowance: sampleTournaments[0].allowance,
					year,
					season: sampleTournaments[0].season,
					published: sampleTournaments[0].published,
					userId
				});
			});

			it('should update the season of a tournament', function () {
				const season = 'SPRING';
				const _id = sampleTournaments[0]._id;
				const userId = sampleTournaments[0].userId;

				Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [_id, { season }]);
				const t = Tournaments.findOne(_id);

				expect(t).toInclude({
					_id,
					name: sampleTournaments[0].name,
					location: sampleTournaments[0].location,
					startDate: sampleTournaments[0].startDate,
					endDate: sampleTournaments[0].endDate,
					weighins: sampleTournaments[0].weighins,
					alternateWeighins: sampleTournaments[0].alternateWeighins,
					division: sampleTournaments[0].division,
					weightClasses: sampleTournaments[0].weightClasses,
					allowance: sampleTournaments[0].allowance,
					year: sampleTournaments[0].year,
					season,
					published: sampleTournaments[0].published,
					userId
				});
				expect(t.updatedAt).toBeGreaterThan(sampleTournaments[0].updatedAt);
			});

			it('should update the publish status of a tournament', function () {
				const published = true;
				const _id = sampleTournaments[0]._id;
				const userId = sampleTournaments[0].userId;

				Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [_id, { published }]);
				const t = Tournaments.findOne(_id);

				expect(t).toInclude({
					_id,
					name: sampleTournaments[0].name,
					location: sampleTournaments[0].location,
					startDate: sampleTournaments[0].startDate,
					endDate: sampleTournaments[0].endDate,
					weighins: sampleTournaments[0].weighins,
					alternateWeighins: sampleTournaments[0].alternateWeighins,
					division: sampleTournaments[0].division,
					weightClasses: sampleTournaments[0].weightClasses,
					allowance: sampleTournaments[0].allowance,
					year: sampleTournaments[0].year,
					season: sampleTournaments[0].season,
					published,
					userId
				});
				expect(t.updatedAt).toBeGreaterThan(sampleTournaments[0].updatedAt);
			});

			it('should update a tournament', function () {
				const _id = sampleTournaments[0]._id;
				const name = 'Updated Name';
				const location = 'Updated Location';
				const startDate = 'Updated Start Date';
				const endDate = 'Updated End Date';
				const weighins = 'Updated Weigh-ins';
				const alternateWeighins = 'Updated Alternate Weigh-ins';
				const division = 'Updated Division';
				const weightClasses = '52, 57, 62, 67, 72, 77, 82, 87, 92, 97, 105, 112, 125, 150, HWT';
				const allowance = 0.9;
				const year = 2019;
				const season = 'SUMMER';
				const published = true;
				const userId = sampleTournaments[0].userId;

				Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [_id, {
					name,
					location,
					startDate,
					endDate,
					weighins,
					alternateWeighins,
					division,
					weightClasses,
					allowance,
					year,
					season,
					published
				}]);
				const t = Tournaments.findOne(_id);

				expect(t).toInclude({
					name,
					location,
					startDate,
					endDate,
					weighins,
					alternateWeighins,
					division,
					weightClasses,
					allowance,
					year,
					season,
					published
				});
				expect(t.updatedAt).toBeGreaterThan(sampleTournaments[0].updatedAt);
			});

			it('should not update a tournament with invalid properties', function () {
				const _id = sampleTournaments[0]._id;
				const userId = sampleTournaments[0].userId;
				const extras = {
					name: 'Updated Name',
					location: 'Updated Location',
					startDate: 'Updated Start Date',
					endDate: 'Updated End Date',
					weighins: 'Updated Weigh-ins',
					alternateWeighins: 'Updated Alternate Weigh-ins',
					division: 'Updated Division',
					weightClasses: '52, 57, 62, 67, 72, 77, 82, 87, 92, 97, 105, 112, 125, 150, HWT',
					allowance: 0.9,
					year: 2019,
					season: 'Winter',
					published: true,
					style: 'Scholastic'
				};

				expect(() => {
					Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [_id, extras]);
				}).toThrow();
			});

			it('should not update a tournament if user is not the owner', function () {
				const _id = sampleTournaments[0]._id;
				const userId = sampleTournaments[0].userId + '123';
				const name = 'Updated Name';

				Meteor.server.method_handlers['tournaments.update'].apply({ userId }, [_id, { name }]);
				const t = Tournaments.findOne(_id);

				expect(t).toInclude(sampleTournaments[0]);
			});

			it('should not update a tournament if unauthenticated', function () {
				const _id = sampleTournaments[0]._id;

				expect(() => {
					Meteor.server.method_handlers['tournaments.update'].apply({}, [_id]);
				}).toThrow();
			});

			it('should not update a tournament if _id is invalid', function () {
				const userId = sampleTournaments[0].userId;

				expect(() => {
					Meteor.server.method_handlers['notes.update'].apply({ userId });
				}).toThrow();
			});
		});

		describe('Tournament Retrievals', function () {
			it('should return all tournaments created by a user', function () {
				const userId = sampleTournaments[0].userId;
				const result = Meteor.server.publish_handlers.tournaments.apply({ userId });
				const tournaments = result.fetch();

				expect(tournaments.length).toBe(1);
				expect(tournaments[0]).toEqual(sampleTournaments[0]);
			});

			it('should return zero tournaments for a user that has not created any', function () {
				const userId = sampleTournaments[0].userId + '123';
				const result = Meteor.server.publish_handlers.tournaments.apply({ userId });
				const tournaments = result.fetch();

				expect(tournaments.length).toBe(0);
			});
		});
	});
}
