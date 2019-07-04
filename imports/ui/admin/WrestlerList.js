import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import EmptyItem from './EmptyItem';
import Wrestler from './Wrestler';
import WrestlerListHeader from './WrestlerListHeader';
import { Wrestlers } from '../../api/wrestlers';

export const WrestlerList = (props) => {
	if (props.wrestlers) {
		const staleIds = Session.get('multiselectedWrestlerIds');   // current ids in multiselect list

		/*
		 * After filtering wrestlers, we need to refresh the list of multiselected wrestlers.
		 * This prevents users from accidentally deleting a wrestler that was previously selected,
		 * but is no longer visible (i.e., filtered out).
		 */

		let freshIds = [];
		props.wrestlers.forEach((wrestler) => {
			if (staleIds.includes(wrestler._id)) {
				freshIds.push(wrestler._id);
			}
		});

		/*
		 * Reset the selected wrestler(s).
		 */

		if (freshIds.length === 1) {
			Session.set('selectedWrestlerId', freshIds[0]);
		}
		Session.set('multiselectedWrestlerIds', freshIds);

		/*
		 * Auto-update the selected wrestler.
		 *    - undefined if the wrestler list is empty
		 *    - the first and only wrestler in the list
		 *    - whichever wrestler is marked as selected
		 */

		if (props.wrestlers.length === 0) {
			Session.set('selectedWrestlerId', undefined);
		} else if (props.wrestlers.length === 1) {
			Session.set('selectedWrestlerId', props.wrestlers[0]._id);
		} else {
			if (props.wrestlers.filter((wrestler) => wrestler._id === Session.get('selectedWrestlerId')).length === 0) {
				Session.set('selectedWrestlerId', undefined);
			}
		}
	}

	return (
		<div className="container container__item-list">
			<div className="container__header container__item-list-header">
				<h5 className="container__title">Wrestlers</h5>
			</div>

			<div className="item-list">
				<WrestlerListHeader />

				{props.wrestlers.length === 0 ? <EmptyItem label="Wrestlers" /> : undefined}
				{props.wrestlers.map((wrestler) => {
					return <Wrestler key={wrestler._id} wrestler={wrestler} />;
				})}
			</div>
		</div>
	);
};

WrestlerList.propTypes = {
	wrestlers: PropTypes.array.isRequired
};

export default createContainer(() => {
	Meteor.subscribe('wrestlers');

	const selectedWrestlerId = Session.get('selectedWrestlerId');
	const multiselectedWrestlerIds = Session.get('multiselectedWrestlerIds');
	const selectedTournamentFilter = Session.get('selectedTournamentFilter');
	const selectedDivisionFilter = Session.get('selectedDivisionFilter');
	const selectedWeightClassFilter = Session.get('selectedWeightClassFilter');

	if (selectedTournamentFilter && selectedDivisionFilter && selectedWeightClassFilter) {
		return {
			wrestlers: Wrestlers.find({
				'applications.tournamentId': selectedTournamentFilter,
				'applications.division': selectedDivisionFilter,
				'applications.weightClasses': Number(selectedWeightClassFilter)
			}).fetch().map((wrestler) => {
				return {
					...wrestler,
					selected: wrestler._id === selectedWrestlerId,
					multiselected: multiselectedWrestlerIds.includes(wrestler._id)
				};
			})
		};
	} else if (selectedTournamentFilter && selectedDivisionFilter) {
		return {
			wrestlers: Wrestlers.find({
				'applications.tournamentId': selectedTournamentFilter,
				'applications.division': selectedDivisionFilter
			}).fetch().map((wrestler) => {
				return {
					...wrestler,
					selected: wrestler._id === selectedWrestlerId,
					multiselected: multiselectedWrestlerIds.includes(wrestler._id)
				};
			})
		};
	} else if (selectedTournamentFilter && selectedWeightClassFilter) {
		return {
			wrestlers: Wrestlers.find({
				'applications.tournamentId': selectedTournamentFilter,
				'applications.weightClasses': Number(selectedWeightClassFilter)
			}).fetch().map((wrestler) => {
				return {
					...wrestler,
					selected: wrestler._id === selectedWrestlerId,
					multiselected: multiselectedWrestlerIds.includes(wrestler._id)
				};
			})
		};
	} else if (selectedDivisionFilter && selectedWeightClassFilter) {
		return {
			wrestlers: Wrestlers.find({
				'applications.division': selectedDivisionFilter,
				'applications.weightClasses': Number(selectedWeightClassFilter)
			}).fetch().map((wrestler) => {
				return {
					...wrestler,
					selected: wrestler._id === selectedWrestlerId,
					multiselected: multiselectedWrestlerIds.includes(wrestler._id)
				};
			})
		};
	} else if (selectedTournamentFilter) {
		return {
			wrestlers: Wrestlers.find({ 'applications.tournamentId': selectedTournamentFilter }).fetch().map((wrestler) => {
				return {
					...wrestler,
					selected: wrestler._id === selectedWrestlerId,
					multiselected: multiselectedWrestlerIds.includes(wrestler._id)
				};
			})
		};
	} else if (selectedDivisionFilter) {
		return {
			wrestlers: Wrestlers.find({ 'applications.division': selectedDivisionFilter }).fetch().map((wrestler) => {
				return {
					...wrestler,
					selected: wrestler._id === selectedWrestlerId,
					multiselected: multiselectedWrestlerIds.includes(wrestler._id)
				};
			})
		};
	} else if (selectedWeightClassFilter) {
		return {
			wrestlers: Wrestlers.find({ 'applications.weightClasses': Number(selectedWeightClassFilter) }).fetch().map((wrestler) => {
				return {
					...wrestler,
					selected: wrestler._id === selectedWrestlerId,
					multiselected: multiselectedWrestlerIds.includes(wrestler._id)
				};
			})
		};
	} else {
		return {
			wrestlers: Wrestlers.find().fetch().map((wrestler) => {
				return {
					...wrestler,
					selected: wrestler._id === selectedWrestlerId,
					multiselected: multiselectedWrestlerIds.includes(wrestler._id)
				};
			})
		};
	}
}, WrestlerList);
