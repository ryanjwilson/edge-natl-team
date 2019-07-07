import { Meteor } from "meteor/meteor";
import React from "react";
import { browserHistory } from "react-router";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";
import swal from "sweetalert2";

import TournamentListFilters from "./TournamentListFilters";

/**
 * A component that represents a fixture above the TournamentList. It contains buttons for adding, showing, hiding, and
 * deleting one or more Tournaments, as well as the TournamentListFilters.
 */

export class TournamentListHeader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {

		};

		this.onAddTournament = this.onAddTournament.bind(this);
		this.onShowTournaments = this.onShowTournaments.bind(this);
		this.onHideTournaments = this.onHideTournaments.bind(this);
		this.onDeleteTournaments = this.onDeleteTournaments.bind(this);
	}

	componentWillReceiveProps(nextProps) {

	}

	onAddTournament() {
		Session.set("multiselectedTournamentIds", []);    // clear any previously multiselected tournaments

		Meteor.call("tournaments.insert", (err, res) => {
			if (res) Session.set("selectedTournamentId", res);
		});
	}

	onShowTournaments() {
		let tournamentIds = Session.get("multiselectedTournamentIds");

		if (tournamentIds.length === 0 && Session.get("selectedTournamentId")) {
			tournamentIds.push(Session.get("selectedTournamentId"));
		}

		if (tournamentIds.length === 0) {
			showInvalidSelectionAlert("publish", "#2e8b57", "modal-button button--publish");
		} else {
			showConfirmationAlert("publish", tournamentIds, "Show", "modal-button button--publish", "#2e8b57", true)
		}
	}

	onHideTournaments() {
		let tournamentIds = Session.get("multiselectedTournamentIds");

		if (tournamentIds.length === 0 && Session.get("selectedTournamentId")) {
			tournamentIds.push(Session.get("selectedTournamentId"));
		}

		if (tournamentIds.length === 0) {
			showInvalidSelectionAlert("unpublish", "#5a5a5a", "modal-button button--unpublish");
		} else {
			showConfirmationAlert("unpublish", tournamentIds, "Hide", "modal-button button--unpublish", "#5a5a5a", false)
		}
	}

	onDeleteTournaments() {
		let tournamentIds = Session.get("multiselectedTournamentIds");

		if (tournamentIds.length === 0 && Session.get("selectedTournamentId")) {
			tournamentIds.push(Session.get("selectedTournamentId"));
		}

		if (tournamentIds.length === 0) {
			showInvalidSelectionAlert("unpublish", "#e64942", "modal-button button--unpublish");
		} else {
			showDeletionAlert(tournamentIds);
		}
	}

	render() {
		return (
			<div className="item-list__header">
				<button className="button--add" onClick={this.onAddTournament}>Add Tournament</button>
				<div className="multiselect-group three">
					<button className="button button--publish" onClick={this.onShowTournaments}>Show</button>
					<button className="button button--unpublish" onClick={this.onHideTournaments}>Hide</button>
					<button className="button button--delete" onClick={this.onDeleteTournaments}>Delete</button>
				</div>
				<TournamentListFilters />
			</div>
		);
	}
}

/**
 * Shows an alert dialog informing the user that they haven"t selected any Tournaments from the TournamentList.
 *
 * @param action the action the user is attemping to perform
 * @param color the button color associated with the attempted action
 * @param css the css associated with the attempted action
 */

const showInvalidSelectionAlert = (action, color, css) => {
	swal({
		titleText: "No Tournament Selected",
		html: "<div class=\"swal-modal-text\">You'll need to select at least one Tournament to " + action + ".</div>",
		type: "info",
		confirmButtonColor: color,
		confirmButtonClass: css,
		customClass: "swal-modal"
	});
};

/**
 * Shows a confirmation dialog warning the user that they are about to show or hide one or more Tournaments to the public schedule.
 *
 * @param action the action the user is attemping to perform
 * @param tournamentIds the tournaments the user is going to show or hide
 * @param text the button text associated with the attempted action
 * @param css the css associated with the attempted action
 * @param color the button color associated with the attempted action
 * @param published true for publish actions; false for unpublish actions
 */

const showConfirmationAlert = (action, tournamentIds, text, css, color, published) => {
	swal({
		titleText: "Are you sure?",
		html: "<div class=\"swal-modal-text\">You're about to " + action + " " + tournamentIds.length + (tournamentIds.length > 1 ? " Tournaments." : " Tournament.") + "</div>",
		type: "warning",
		showCancelButton: true,
		cancelButtonClass: "modal-button button--cancel",
		confirmButtonText: text,
		confirmButtonClass: css,
		confirmButtonColor: color,
		reverseButtons: true,
		customClass: "swal-modal"
	}).then((response) => {
		if (response && response.value) {
			tournamentIds.forEach((tournamentId) => {
				Meteor.call("tournaments.update", tournamentId, { published });
			});
		}
	});
};

/**
 * Shows a confirmation dialog warning the user that they are about to delete or hide one or more Tournaments from the TournamentList.
 *
 * @param tournamentIds the tournaments the user is going to delete
 */

const showDeletionAlert = (tournamentIds) => {
	swal({
		titleText: "Are you sure?",
		html: "<div class=\"swal-modal-text\">You're about to delete " + tournamentIds.length + (tournamentIds.length > 1 ? " Tournaments." : " Tournament.") + "</div>",
		type: "warning",
		showCancelButton: true,
		cancelButtonClass: "modal-button button--cancel",
		confirmButtonText: "Delete",
		confirmButtonClass: "modal-button button--delete",
		confirmButtonColor: "#e64942",
		reverseButtons: true,
		customClass: "swal-modal"
	}).then((response) => {
		if (response && response.value) {
			tournamentIds.forEach((tournamentId) => {
				Meteor.call("tournaments.remove", tournamentId);
			});
			browserHistory.push("/tournaments");
		}
	});
};

/**
 * Property types for this component.
 */

TournamentListHeader.propTypes = {
	meteorCall: PropTypes.func,
	Session: PropTypes.object
};

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	return {

	};
}, TournamentListHeader);
