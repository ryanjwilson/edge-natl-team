import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";

import { Roster } from "./Roster";
import { RosterTabBar } from "./RosterTabBar";

/**
 * A list component that renders one or more Rosters.
 */

export class RosterList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			teams: props.teams,
			tournamentId: props.tournamentId,
			selectedTab: 0
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.teams.length !== nextProps.teams.length) {
			this.setState({ teams: nextProps.teams });
		} else {
			this.props.teams.some((team, index) => {
				if (team._id !== nextProps.teams[index]._id) {
					this.setState({ teams: nextProps.teams });

					return true;
				}
			});
		}
	}

	showRoster(selectedTab) {
		this.setState({ selectedTab });
	}

	render() {
		return (
			<div className="event__roster-list">
				{this.state.teams.length === 0 ? <p className="empty-item">There are no Rosters to display.</p> : undefined}
				<RosterTabBar tabs={this.state.teams} callbackFromParent={this.showRoster.bind(this)} />

				{this.state.teams.map((team, index, teams) => {
					return (
						this.state.selectedTab === index ? <Roster key={index} team={team} isLastRoster={index === teams.length - 1} /> : undefined
					);
				})}
			</div>
		);
	}
}

/**
 * Property types for this component.
 */

RosterList.propTypes = {
	teams: PropTypes.array.isRequired
};

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	return {

	};
}, RosterList);
