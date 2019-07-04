import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";

/**
 * A component that represents a single Team in the TeamList.
 */

export class Team extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			_id: props.team._id,
			name: props.team.name,
			tournament: {
				_id: props.team.tournament._id,
				name: props.team.tournament.name,
				division: {
					name: props.team.tournament.division.name
				}
			},
			roster: props.team.roster,
			roles: ["Starter", "Split", "Alternate"],
			statuses: ["Open", "Pending", "Confirmed"],
			published: props.team.published,
			css: props.team.selected || props.team.multiselected ? "item item--selected" : "item"
		};

		this.onTeamSelect = this.onTeamSelect.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ css: nextProps.team.selected || nextProps.team.multiselected ? "item item--selected" : "item", ...nextProps.team });
	}

	onTeamSelect(e) {
		let ids = Session.get("multiselectedTeamIds");
		const selectedTeamId = Session.get("selectedTeamId");

		if (selectedTeamId && !ids.includes(selectedTeamId)) {
			ids.push(selectedTeamId);
		}

		if (e.metaKey) {
			if (!ids.includes(this.state._id)) {
				ids.push(this.state._id);
			}

			if (ids.length === 1) {
				Session.set("selectedTeamId", this.state._id);
			} else {
				Session.set("selectedTeamId", undefined);
			}
		} else {
			ids = [];
			ids.push(this.state._id);

			Session.set("selectedTeamId", this.state._id);
		}
		Session.set("multiselectedTeamIds", ids);
	}

	render() {
		return (
			<div id="team" className={this.state.css} onClick={this.onTeamSelect}>
				<div className="item__text">
					<h5 className="item__title">{this.state.name || "Untitled Team"}</h5>
					<p className="item__subtitle">{this.state.tournament.name || "Tournament"} &middot; {this.state.tournament.division.name || "Division"}</p>
				</div>
				{this.state.published ? <div className="item__status-icon"><img src="/images/published-icon.svg" /></div> : undefined}
			</div>
		);
	}
}

/**
 * Property types for this component.
 */

Team.propTypes = {
	team: PropTypes.object.isRequired
};

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	return {

	};
}, Team);
