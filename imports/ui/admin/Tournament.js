import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";

/**
 * A component that represents a single Tournament in the TournamentList.
 */

export class Tournament extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tournament: props.tournament,
			css: props.tournament.selected || props.tournament.multiselected ? "item item--selected" : "item"
		};

		this.onTournamentSelect = this.onTournamentSelect.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.tournament._id !== nextProps.tournament._id) this.setState({ tournament: nextProps.tournament });

		if (this.props.tournament.selected !== nextProps.tournament.selected || this.props.tournament.multiselected !== nextProps.tournament.multiselected) {
			this.setState({ css: nextProps.tournament.selected || nextProps.tournament.multiselected ? "item item--selected" : "item" });
		}

		this.setState({ tournament: nextProps.tournament });
	}

	onTournamentSelect(e) {
		let ids = Session.get("multiselectedTournamentIds");
		const selectedTournamentId = Session.get("selectedTournamentId");

		if (selectedTournamentId && !ids.includes(selectedTournamentId)) {
			ids.push(selectedTournamentId);
		}

		if (e.metaKey) {
			if (!ids.includes(this.state.tournament._id)) {
				ids.push(this.state.tournament._id);
			}

			if (ids.length === 1) {
				Session.set("selectedTournamentId", this.state.tournament._id);
			} else {
				Session.set("selectedTournamentId", undefined);
			}
		} else {
			ids = [];
			ids.push(this.state.tournament._id);

			Session.set("selectedTournamentId", this.state.tournament._id);
		}
		Session.set("multiselectedTournamentIds", ids);
	}

	render() {
		return (
			<div id="tournament" className={this.state.css} onClick={this.onTournamentSelect}>
				<div className="item__text">
					<h5 className="item__title">{this.state.tournament.name || "Untitled Tournament"}</h5>
					<p className="item__subtitle">{this.state.tournament.location || "Location"} &middot; {this.state.tournament.startDate || "Date"}</p>
				</div>
				{this.state.tournament.published ? <div className="item__status-icon"><img src="/images/published-icon.svg" /></div> : undefined}
			</div>
		);
	}
}

/**
 * Property types for this component.
 */

Tournament.propTypes = {
	tournament: PropTypes.object.isRequired
};

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	return {

	};
}, Tournament);
