import { Meteor } from "meteor/meteor";
import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";

import EmptyItem from "./EmptyItem";
import Wrestler from "./Wrestler";
import WrestlerListHeader from "./WrestlerListHeader";
import { Wrestlers } from "../../api/wrestlers";

/**
 * A component that renders a list of Wrestlers.
 */

export class WrestlerList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			wrestlers: props.wrestlers
		};

		refreshWrestlerIds(props.wrestlers);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.wrestlers.length !== nextProps.wrestlers.length) {
			this.setState({ wrestlers: nextProps.wrestlers });
		} else {
			this.props.wrestlers.some((wrestler, index) => {
				if (!isEquivalent(wrestler, nextProps.wrestlers[index])) {
					this.setState({ wrestlers: nextProps.wrestlers });
					return true;
				}
			});
		}

		refreshWrestlerIds(nextProps.wreslters);
	}

	render() {
		return (
			<div className="container container__item-list">
				<div className="container__header container__item-list-header">
					<h5 className="container__title">Wrestlers</h5>
				</div>
	
				<div className="item-list">
					<WrestlerListHeader />
	
					{this.state.wrestlers.length === 0 ? <EmptyItem label="Wrestlers" /> : undefined}
					{this.state.wrestlers.map((wrestler) => {
						return <Wrestler key={wrestler._id} wrestler={wrestler} />;
					})}
				</div>
			</div>
		);
	}
}

/**
 * Refreshes the Session variables responsible for storing which wrestlers are currently selected. This is done to
 * reflect changes in list filtering.
 *
 * @param wrestlers the original list of wrestlers before filtering
 */

const refreshWrestlerIds = (wrestlers) => {
	if (wrestlers) {
		let freshIds = [];
		const staleIds = Session.get("multiselectedWrestlerIds");

		wrestlers.forEach((wrestler) => {
			if (staleIds.includes(wrestler._id)) {
				freshIds.push(wrestler._id);
			}
		});

		if (freshIds.length === 1) {
			Session.set("selectedWrestlerId", freshIds[0]);
		}
		Session.set("multiselectedWrestlerIds", freshIds);

		if (wrestlers.length === 0) {
			Session.set("selectedWrestlerId", undefined);
		} else if (wrestlers.length === 1) {
			Session.set("selectedWrestlerId", wrestlers[0]._id);
		} else {
			if (wrestlers.filter((wrestler) => wrestler._id === Session.get("selectedWrestlerId")).length === 0) {
				Session.set("selectedWrestlerId", undefined);
			}
		}
	}
};

/**
 * Determines if two wrestlers are logically equivalent.
 *
 * @param prevWrestler the previous wrestler
 * @param nextWrestler the next wrestler
 * @returns true if the wrestlers are logically equivalent; false otherwise
 */

const isEquivalent = (prevWrestler, nextWrestler) => {
	const prevProps = Object.getOwnPropertyNames(prevWrestler);
	const nextProps = Object.getOwnPropertyNames(nextWrestler);

	if (prevProps.length !== nextProps.length) {
		return false;
	}

	for (let i = 0; i < prevProps.length; i++) {
		const propName = prevProps[i];

		if (prevWrestler[propName] !== nextWrestler[propName]) {
			return false;
		}
	}

	return true;
};

/**
 * Property types for this component.
 */

WrestlerList.propTypes = {
	wrestlers: PropTypes.array.isRequired
};

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	Meteor.subscribe("wrestlers");

	const selectedWrestlerId = Session.get("selectedWrestlerId");
	const multiselectedWrestlerIds = Session.get("multiselectedWrestlerIds");
	const selectedTournamentFilter = Session.get("selectedTournamentFilter");
	const selectedDivisionFilter = Session.get("selectedDivisionFilter");
	const selectedWeightClassFilter = Session.get("selectedWeightClassFilter");

	// conditionally query the wrestlers collection based on the filter
	// selections made by the user.

	if (selectedTournamentFilter && selectedDivisionFilter && selectedWeightClassFilter) {
		return {
			wrestlers: Wrestlers.find({
				"applications.tournamentId": selectedTournamentFilter,
				"applications.division": selectedDivisionFilter,
				"applications.weightClasses": Number(selectedWeightClassFilter)
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
				"applications.tournamentId": selectedTournamentFilter,
				"applications.division": selectedDivisionFilter
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
				"applications.tournamentId": selectedTournamentFilter,
				"applications.weightClasses": Number(selectedWeightClassFilter)
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
				"applications.division": selectedDivisionFilter,
				"applications.weightClasses": Number(selectedWeightClassFilter)
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
			wrestlers: Wrestlers.find({ "applications.tournamentId": selectedTournamentFilter }).fetch().map((wrestler) => {
				return {
					...wrestler,
					selected: wrestler._id === selectedWrestlerId,
					multiselected: multiselectedWrestlerIds.includes(wrestler._id)
				};
			})
		};
	} else if (selectedDivisionFilter) {
		return {
			wrestlers: Wrestlers.find({ "applications.division": selectedDivisionFilter }).fetch().map((wrestler) => {
				return {
					...wrestler,
					selected: wrestler._id === selectedWrestlerId,
					multiselected: multiselectedWrestlerIds.includes(wrestler._id)
				};
			})
		};
	} else if (selectedWeightClassFilter) {
		return {
			wrestlers: Wrestlers.find({ "applications.weightClasses": Number(selectedWeightClassFilter) }).fetch().map((wrestler) => {
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
