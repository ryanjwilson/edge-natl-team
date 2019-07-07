import { Meteor } from "meteor/meteor";
import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";

import { Tournaments } from "../../api/tournaments";

/**
 * A component that represnts filter options for a TeamList in the add modal.
 */

export class TeamListHeaderFilters extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tournaments: props.tournaments,
			divisions: props.divisions,
			selectedTournament: "",
			selectedDivision: ""
		};

		this.onTournamentSelect = this.onTournamentSelect.bind(this);
		this.onDivisionSelect = this.onDivisionSelect.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.selectedTournament !== nextProps.selectedTournament) this.setState({ selectedTournament: nextProps.selectedTournament });
		if (this.props.selectedDivision !== nextProps.selectedDivision) this.setState({ selectedDivision: nextProps.selectedDivision });

		this.refreshTournaments(this.props.tournaments, nextProps.tournaments);
		this.refreshDivisions(this.props.divisions, nextProps.divisions);
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

	onTournamentSelect(e) {
		const selectedTournament = (e.target.value.length > 0 ? e.target.value : undefined);
		const divisions = getDivisions(this.state.tournaments, selectedTournament);

		this.setState({ divisions, selectedTournament, selectedDivision: "", selectedWeightClass: "" });
		Session.set("selectedTeamTournamentModalFilter", selectedTournament);
	}

	onDivisionSelect(e) {
		const selectedDivision = (e.target.value.length > 0 ? e.target.value : undefined);

		this.setState({ selectedDivision });
		Session.set("selectedTeamDivisionModalFilter", selectedDivision);
	}

	render() {
		return (
			<div className="editor__dropdown-filter-group editor__modal-filters">
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
 * Property types for this component.
 */

TeamListHeaderFilters.propTypes = {
	tournaments: PropTypes.array.isRequired,
	divisions: PropTypes.array.isRequired,
	selectedTournament: PropTypes.string,
	selectedDivision: PropTypes.string,
};

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	Meteor.subscribe("tournaments");

	const tournaments = getTournaments();
	const divisions = getDivisions(tournaments, undefined);

	return {
		tournaments,
		divisions,
		selectedTournament: Session.get("selectedTeamTournamentModalFilter"),
		selectedDivision: Session.get("selectedTeamDivisionModalFilter")
	};
}, TeamListHeaderFilters);
