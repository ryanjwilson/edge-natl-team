import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";

/**
 * A component that renders a Roster.
 */

export class Roster extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			team: props.team
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.team._id !== nextProps.team._id) this.setState({ team: nextProps.team });
	}

	render() {
		return (
			<table className="event__roster-table" border="1">
				<thead>
					<tr>
						<th>Weight</th>
						<th>Wrestler</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{this.state.team.roster ?
						this.state.team.roster.map((position, index) => {
							return (
								<tr key={index}>
									<td>{position.weightClass}</td>
									<td>
										{this.state.team.published
											? position.wrestler
											: position.status === "Pending" || position.status === "Confirmed" ? "Filled" : ""
										}
									</td>
									<td>
										{this.state.team.published
											? position.status
											: position.status === "Pending" || position.status === "Confirmed" ? "Filled" : "Open"
										}
									</td>
								</tr>
							);
						})
						:
						this.state.team.division.weightClasses.map((weightClass, index) => {
							return (
								<tr key={index}>
									<td>{weightClass}</td>
									<td></td>
									<td>Open</td>
								</tr>
							);
						})
					}
				</tbody>
			</table>
		);
	}
}

/**
 * Property types for this component.
 */

Roster.propTypes = {
	team: PropTypes.object,
	isLastRoster: PropTypes.bool.isRequired
};

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	return {
		isSidebarOpen: Session.get("isSidebarOpen")
	};
}, Roster);
