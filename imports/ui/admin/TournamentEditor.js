import { Meteor } from "meteor/meteor";
import React from "react";
import { browserHistory } from "react-router";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";

import { Tournaments } from "../../api/tournaments";

/**
 * A component that represents an editor to enter, modify, or a view Tournament information.
 */

export class TournamentEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			location: "",
			startDate: "",
			endDate: "",
			weighins: "",
			alternateWeighins: "",
			divisions: [{
				name: "",
				weightClasses: [],
				allowance: "",
				teams: ""
			}],
			published: false,
			publishClass: "button--unpublish",
			publishText: "Unpublish",
			year: "",
			season: "",
			order: ""
		};

		this.onNameChange = this.onNameChange.bind(this);
		this.onLocationChange = this.onLocationChange.bind(this);
		this.onStartDateChange = this.onStartDateChange.bind(this);
		this.onEndDateChange = this.onEndDateChange.bind(this);
		this.onWeighinsChange = this.onWeighinsChange.bind(this);
		this.onAlternateWeighinsChange = this.onAlternateWeighinsChange.bind(this);
		this.onOrderChange = this.onOrderChange.bind(this);
	}

	componentWillMount() {
		if (this.props.tournament) {
			this.setState({ ...this.props.tournament });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const currTournamentId = this.props.tournament ? this.props.tournament._id : undefined;
		const prevTournamentId = prevProps.tournament ? prevProps.tournament._id : undefined;

		if (currTournamentId && currTournamentId !== prevTournamentId) {
			this.setState({ ...this.props.tournament });
		}
	}

	onAddDivision(index) {
		const divisions = this.state.divisions;

		divisions.splice(index + 1, 0, {
			name: "",
			weightClasses: [],
			allowance: 0,
			teams: 1
		});
		this.setState({ divisions });
		Meteor.call("tournaments.update", this.props.tournament._id, { divisions });
	}

	onDeleteDivision(index) {
		const divisions = this.state.divisions;

		divisions.splice(index, 1);
		this.setState({ divisions });
		Meteor.call("tournaments.update", this.props.tournament._id, { divisions });
	}

	onNameChange(e) {
		const name = e.target.value;

		this.setState({ name });
		Meteor.call("tournaments.update", this.props.tournament._id, { name });
	}

	onLocationChange(e) {
		const location = e.target.value;

		this.setState({ location });
		Meteor.call("tournaments.update", this.props.tournament._id, { location });
	}

	onStartDateChange(e) {
		const startDate = e.target.value;

		this.setState({ startDate });
		Meteor.call("tournaments.update", this.props.tournament._id, { startDate });
	}

	onEndDateChange(e) {
		const endDate = e.target.value;

		this.setState({ endDate });
		Meteor.call("tournaments.update", this.props.tournament._id, { endDate });
	}

	onWeighinsChange(e) {
		const weighins = e.target.value;

		this.setState({ weighins });
		Meteor.call("tournaments.update", this.props.tournament._id, { weighins });
	}

	onAlternateWeighinsChange(e) {
		const alternateWeighins = e.target.value;

		this.setState({ alternateWeighins });
		Meteor.call("tournaments.update", this.props.tournament._id, { alternateWeighins });
	}

	onOrderChange(e) {
		const order = Number(e.target.value);

		this.setState({ order });
		Meteor.call("tournaments.update", this.props.tournament._id, { order });
	}

	onDivisionChange(index, e) {
		const divisions = this.state.divisions;

		divisions[index].name = e.target.value;
		this.setState({ divisions });
		Meteor.call("tournaments.update", this.props.tournament._id, { divisions });
	}

	onWeightClassesChange(index, e) {
		const divisions = this.state.divisions;
		const weightClasses = e.target.value.replace(/\s/g, "").split(",").map(Number);

		divisions[index].weightClasses = weightClasses;
		this.setState({ divisions });
		Meteor.call("tournaments.update", this.props.tournament._id, { divisions });
	}

	onAllowanceChange(index, e) {
		const divisions = this.state.divisions;
		const allowance = Number(e.target.value) >= 0 ? Number(e.target.value) : 0;

		divisions[index].allowance = allowance;
		this.setState({ divisions });
		Meteor.call("tournaments.update", this.props.tournament._id, { divisions });
	}

	onTeamsChange(index, e) {
		const divisions = this.state.divisions;
		const teams = parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 1;

		divisions[index].teams = teams;
		this.setState({ divisions });
		Meteor.call("tournaments.update", this.props.tournament._id, { divisions });
	}

	render() {
		if (this.props.tournament) {
			return (
				<div className="container">
					<div className="editor">
						<input id="name" className="editor__title" value={this.state.name} placeholder="Untitled Tournament" onChange={this.onNameChange} />
						<label className="editor__label">
							<p>Location</p>
							<input id="location" name="location" className="editor__field" value={this.state.location} placeholder="Location" onChange={this.onLocationChange} />
						</label>
						<label className="editor__label">
							<p>Start Date</p>
							<input id="start-date" name="date" className="editor__field" value={this.state.startDate} placeholder="Start Date" onChange={this.onStartDateChange} />
						</label>
						<label className="editor__label">
							<p>End Date</p>
							<input id="end-date" name="date" className="editor__field" value={this.state.endDate} placeholder="End Date" onChange={this.onEndDateChange} />
						</label>
						<label className="editor__label">
							<p>Weigh-ins</p>
							<input id="weighins" name="weighins" className="editor__field" value={this.state.weighins} placeholder="Weigh-ins" onChange={this.onWeighinsChange} />
						</label>
						<label className="editor__label">
							<p>Alternate Weigh-ins</p>
							<input id="alternateWeighins" name="alternateWeighins" className="editor__field" value={this.state.alternateWeighins} placeholder="Alternate Weigh-ins" onChange={this.onAlternateWeighinsChange} />
						</label>
						<label className="editor__label">
							<p>Display Order</p>
							<input id="displayOrder" name="displayOrder" type="number" min="1" className="editor__field" value={this.state.order} placeholder="Display Order" onChange={this.onOrderChange} />
						</label>
						{this.state.divisions.map((division, index, divisions) => {
							return (
								<div id="division-group" key={index}>
									<label className="editor__label">
										{index === 0
											? <p className="editor__dynamic-label editor__top-label">Age Division <img className="editor__add" src="/images/add-button.svg" onClick={this.onAddDivision.bind(this, index)} /></p>
											: <p className="editor__dynamic-label editor__top-label">Age Division <img className="editor__delete" src="/images/remove-button.svg" onClick={this.onDeleteDivision.bind(this, index)} /></p>
										}
										<input id="division" name="division" className="editor__field" value={this.state.divisions[index].name} placeholder="Age Division" onChange={this.onDivisionChange.bind(this, index)} />
									</label>
									<label className="editor__label">
										<p>Weight Classes</p>
										<input id="weightClasses" name="weightClasses" className="editor__field" value={this.state.divisions[index].weightClasses.length > 0 && this.state.divisions[index].weightClasses[0] === 0 ? "" : this.state.divisions[index].weightClasses} placeholder="Weight Classes" onChange={this.onWeightClassesChange.bind(this, index)} />
									</label>
									<label className="editor__label">
										<p>Weight Allowance</p>
										<input id="allowance" name="allowance" type="number" min="0" step="0.1" className="editor__field" value={this.state.divisions[index].allowance} placeholder="Allowance" onChange={this.onAllowanceChange.bind(this, index)} />
									</label>
									<label className="editor__label">
										<p>Teams Entered</p>
										<input id="teams" name="teams" type="number" min="1" className={index === divisions.length - 1 ? "editor__field editor__bottom-field" : "editor__field"} value={this.state.divisions[index].teams} placeholder="Teams Entered" onChange={this.onTeamsChange.bind(this, index)} />
									</label>
								</div>
							);
						})}
					</div>
				</div>
			);
		} else {
			return (
				<div className="container">
					<div className="editor">
						<p className="editor__message">{this.props.selectedTournamentId ? "Tournament not found." : "Select or add a Tournament to get started."}</p>
					</div>
				</div>
			);
		}
	}
}

/**
 * Property types for this component.
 */

TournamentEditor.propTypes = {
	tournament: PropTypes.object,
	selectedTournamentId: PropTypes.string,
	browserHistory: PropTypes.object.isRequired
};

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	return {
		tournament: Tournaments.findOne(selectedTournamentId),
		selectedTournamentId: Session.get("selectedTournamentId"),
		browserHistory
	};
}, TournamentEditor);
