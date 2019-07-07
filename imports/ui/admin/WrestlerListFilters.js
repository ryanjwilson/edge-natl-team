import { Meteor } from "meteor/meteor";
import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";

import { Tournaments } from "../../api/tournaments";

/**
 * A component that provides filters allowing the user to customize the Wrestlers that appear in the WrestlerList.
 */

export class WrestlerListFilters extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tournaments: props.tournaments,
			divisions: props.divisions,
			weightClasses: props.weightClasses,
			selectedTournament: "",
			selectedDivision: "",
			selectedWeightClass: ""
		};

		this.onTournamentSelect = this.onTournamentSelect.bind(this);
		this.onDivisionSelect = this.onDivisionSelect.bind(this);
		this.onWeightClassSelect = this.onWeightClassSelect.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.selectedTournament !== nextProps.selectedTournament) this.setState({ selectedTournament: nextProps.selectedTournament });
		if (this.props.selectedDivision !== nextProps.selectedDivision) this.setState({ selectedDivision: nextProps.selectedDivision });
		if (this.props.selectedWeightClass !== nextProps.selectedWeightClass) this.setState({ selectedWeightClass: nextProps.selectedWeightClass });

		this.refreshTournaments(this.props.tournaments, nextProps.tournaments);
		this.refreshDivisions(this.props.divisions, nextProps.divisions);
		this.refreshWeightClasses(this.props.weightClasses, nextProps.weightClasses);
	}

	refreshTournaments(oldTournaments, newTournaments) {
		if (oldTournaments.length !== newTournaments.length) {
			this.setState({ tournaments: newTournaments });
		} else {
			oldTournaments.some((tournament, index) => {
				if (tournament._id !== newTournaments[index]._id) {
					this.setState({ tournaments: newTournaments });

					return true;
				}
			});
		}
	}

	refreshDivisions(oldDivisions, newDivisions) {
		if (oldDivisions.length !== newDivisions.length) {
			this.setState({ divisions: newDivisions });
		} else {
			oldDivisions.some((division, index) => {
				if (division !== newDivisions[index]) {
					this.setState({ divisions: newDivisions });

					return true;
				}
			});
		}
	}

	refreshWeightClasses(oldWeightClasses, newWeightClasses) {
		if (oldWeightClasses.length !== newWeightClasses.length) {
			this.setState({ weightClasses: newWeightClasses });
		} else {
			oldWeightClasses.some((weightClass, index) => {
				if (weightClass !== newWeightClasses[index]) {
					this.setState({ weightClasses: newWeightClasses });

					return true;
				}
			});
		}
	}

	onTournamentSelect(e) {
		const selectedTournament = (e.target.value.length > 0 ? e.target.value : undefined);
		const divisions = getDivisions(this.state.tournaments, selectedTournament);
		const weightClasses = getWeightClasses(this.state.tournaments, selectedTournament, undefined);

		this.setState({ divisions, weightClasses, selectedTournament, selectedDivision: "", selectedWeightClass: "" });
		Session.set("selectedTournamentFilter", selectedTournament);
	}

	onDivisionSelect(e) {
		const selectedDivision = (e.target.value.length > 0 ? e.target.value : undefined);
		const weightClasses = getWeightClasses(this.state.tournaments, this.state.selectedTournament, selectedDivision);

		this.setState({ weightClasses, selectedDivision, selectedWeightClass: "" });
		Session.set("selectedDivisionFilter", selectedDivision);
	}

	onWeightClassSelect(e) {
		const selectedWeightClass = (e.target.value.length > 0 ? e.target.value : undefined);

		this.setState({ selectedWeightClass });
		Session.set("selectedWeightClassFilter", selectedWeightClass);
	}

	render() {
		return (
			<div className="editor__dropdown-filter-group">
				<select className="editor__dropdown-menu" value={this.state.selectedTournament} onChange={this.onTournamentSelect}>
					<option key="-1" value="">--Tournament--</option>

					{this.state.tournaments.map((tournament, index) => {
						return (
							<option key={index} value={tournament._id}>{tournament.name}</option>
						);
					})}
				</select>
				<select className="editor__dropdown-menu" value={this.state.selectedDivision} onChange={this.onDivisionSelect}>
					<option key="-1" value="">--Division--</option>

					{this.state.divisions.map((division, index) => {
						return (
							<option key={index} value={division}>{division}</option>
						);
					})}
				</select>
				<select className="editor__dropdown-menu" value={this.state.selectedWeightClass} onChange={this.onWeightClassSelect}>
					<option key="-1" value="">--Weight Class--</option>

					{this.state.weightClasses.map((weightClass, index) => {
						return (
							<option key={index} value={weightClass}>{weightClass}</option>
						);
					})}
				</select>
			</div>
		);
	}
}

/**
 * Retrieves a list of published tournaments.
 *
 * @returns a list of tournaments
 */

const getTournaments = () => {
	return Tournaments.find({ published: true }).fetch().map((tournament) => {
		return { ...tournament };
	});
};

/**
 * Retrieves a list of divisions for a specific tournament.
 *
 * @param {Array} tournaments a list of tournaments
 * @param {string} selectedTournament the unique identifier of the selected tournament
 * @returns a list of divisions
 */

const getDivisions = (tournaments, selectedTournament) => {
	const divisions = [];

	if (selectedTournament) {
		tournaments.forEach((tournament) => {
			if (tournament._id === selectedTournament) {
				tournament.divisions.forEach((division) => {
					if (!divisions.includes(division.name)) divisions.push(division.name);
				});
			}
		});
	} else {
		tournaments.forEach((tournament) => {
			tournament.divisions.forEach((division) => {
				if (!divisions.includes(division.name)) divisions.push(division.name);
			});
		});
	}

	return divisions;
};

/**
 * Retrieves a list of weight classes for the specified tournament and division.
 *
 * @param {Array} tournaments a list of tournaments
 * @param {string} selectedTournament the unique identifier of the selected tournament
 * @param {string} selectedDivision the name of the selected division
 * @returns a list of weight classes
 */

const getWeightClasses = (tournaments, selectedTournament, selectedDivision) => {
	if (selectedTournament && selectedDivision) {
		const tournament = tournaments.find((tournament) => tournament._id === selectedTournament);
		const division = tournament.divisions.find((division) => division.name === selectedDivision);

		return division.weightClasses.filter(isUnique).sort(sortAscending);
	} else if (selectedTournament) {
		const tournament = tournaments.find((tournament) => tournament._id === selectedTournament);
		const weightClasses = tournament.divisions.map((division) => division.weightClasses);

		return [].concat.apply([], weightClasses).filter(isUnique).sort(sortAscending);
	} else if (selectedDivision) {
		const weightClasses = tournaments.map((tournament) => {
			const division = tournament.divisions.find((division) => division.name === selectedDivision);

			return division ? division.weightClasses : [];
		});

		return [].concat.apply([], weightClasses).filter(isUnique).sort(sortAscending);
	} else {
		return [];
	}
};

/**
 * Determines whether a specific weight class is unique.
 *
 * @param {number} value the weight class
 * @param {number} index the index of the weight class
 * @param {Array} self the list of weight classes
 * @returns true if the weight class is unique, or false if it is not
 */

const isUnique = (value, index, self) => {
	return self.indexOf(value) === index;
};

/**
 * Compares two values for the purpose of sorting.
 *
 * @param {*} a the first value
 * @param {*} b the second value
 * @returns an integer value that is used to determine the sorted order
 */

const sortAscending = (a, b) => {
	return a - b;
};

/**
 * Property types for this component.
 */

WrestlerListFilters.propTypes = {
	tournaments: PropTypes.array.isRequired,
	divisions: PropTypes.array.isRequired,
	weightClasses: PropTypes.array.isRequired,
	selectedTournament: PropTypes.string,
	selectedDivision: PropTypes.string,
	selectedWeightClass: PropTypes.string
};

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	Meteor.subscribe("tournaments");

	const tournaments = getTournaments();
	const divisions = getDivisions(tournaments, undefined);
	const weightClasses = getWeightClasses(tournaments, undefined, undefined);

	return {
		tournaments,
		divisions,
		weightClasses,
		selectedTournament: Session.get("selectedTournamentFilter"),
		selectedDivision: Session.get("selectedDivisionFilter"),
		selectedWeightClass: Session.get("selectedWeightClassFilter")
	};
}, WrestlerListFilters);
