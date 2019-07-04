import { Meteor } from "meteor/meteor";
import React from "react";
import { browserHistory } from "react-router";
import { createContainer } from "meteor/react-meteor-data";
import Modal from "react-modal";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";
import swal from "sweetalert2";

import TeamListFilters from "./TeamListFilters";
import TeamListHeaderFilters from "./TeamListHeaderFilters";

/**
 * A component that represents a fixture above the TeamList. It contains buttons for adding, showing, hiding, and
 * deleting one or more Teams, as well as the TeamListFilters.
 */

export class TeamListHeader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isAddModalOpen: false
		};

		this.onAddTeam = this.onAddTeam.bind(this);
		this.onShowTeams = this.onShowTeams.bind(this);
		this.onHideTeams = this.onHideTeams.bind(this);
		this.onDeleteTeams = this.onDeleteTeams.bind(this);
		this.onShowAddModal = this.onShowAddModal.bind(this);
		this.onCloseAddModal = this.onCloseAddModal.bind(this);
	}

	onAddTeam() {
		if (Session.get("selectedTeamTournamentModalFilter") && Session.get("selectedTeamDivisionModalFilter")) {
			Session.set("multiselectedTeamIds", []);    // clear any previously multiselected teams

			Meteor.call("teams.insert", Session.get("selectedTeamTournamentModalFilter"), Session.get("selectedTeamDivisionModalFilter"), (err, res) => {
				if (res) Session.set("selectedTeamId", res);
			});

			this.onCloseAddModal();
		} else {

		}
	}

	onShowTeams() {
		let teamIds = Session.get("multiselectedTeamIds");

		if (teamIds.length === 0 && Session.get("selectedTeamId")) {
			teamIds.push(Session.get("selectedTeamId"));
		}

		if (teamIds.length === 0) {
			showInvalidSelectionAlert("publish", "#2e8b57", "modal-button button--publish");
		} else {
			showConfirmationAlert("publish", teamIds, "Show", "modal-button button--publish", "#2e8b57", true)
		}
	}

	onHideTeams() {
		let teamIds = Session.get("multiselectedTeamIds");

		if (teamIds.length === 0 && Session.get("selectedTeamId")) {
			teamIds.push(Session.get("selectedTeamId"));
		}

		if (teamIds.length === 0) {
			showInvalidSelectionAlert("unpublish", "#5a5a5a", "modal-button button--unpublish");
		} else {
			showConfirmationAlert("unpublish", teamIds, "Hide", "modal-button button--unpublish", "#5a5a5a", false)
		}
	}

	onDeleteTeams() {
		let teamIds = Session.get("multiselectedTeamIds");

		if (teamIds.length === 0 && Session.get("selectedTeamId")) {
			teamIds.push(Session.get("selectedTeamId"));
		}

		if (teamIds.length === 0) {
			showInvalidSelectionAlert("unpublish", "#e64942", "modal-button button--unpublish");
		} else {
			showDeletionAlert(teamIds);
		}
	}

	onShowAddModal() {
		this.setState({ isAddModalOpen: true });
	}

	onCloseAddModal() {
		this.setState({ isAddModalOpen: false });
	}

	render() {
		return (
			<div className="item-list__header">
				<button className="button--add" onClick={this.onShowAddModal}>Add Team</button>

				<Modal appElement={document.getElementById("app")} isOpen={this.state.isAddModalOpen} contentLabel="Add Team" onRequestClose={this.onCloseAddModal} className="boxed-view__box unbounded-height" overlayClassName="boxed-view boxed-view--modal">
					<div className="boxed-view__header">
						<h5 className="boxed-view__title">Add Team</h5>
						<img src="/images/navigation/menu-close-button.svg" onClick={this.onCloseAddModal} />
					</div>

					<div className="boxed-view__box-content">
						<TeamListHeaderFilters />
						<button className="button--add" onClick={this.onAddTeam}>Add Team</button>
					</div>
				</Modal>

				<div className="multiselect-group three">
					<button className="button button--publish" onClick={this.onShowTeams}>Show</button>
					<button className="button button--unpublish" onClick={this.onHideTeams}>Hide</button>
					<button className="button button--delete" onClick={this.onDeleteTeams}>Delete</button>
				</div>
				<TeamListFilters />
			</div>
		);
	}
}

/**
 * Shows an alert dialog informing the user that they haven"t selected any Teams from the TeamList.
 *
 * @param action the action the user is attemping to perform
 * @param color the button color associated with the attempted action
 * @param css the css associated with the attempted action
 */

const showInvalidSelectionAlert = (action, color, css) => {
	swal({
		titleText: "No Team Selected",
		html: "<div class=\"swal-modal-text\">You'll need to select at least one Team to \" + action + \".</div>",
		type: "info",
		confirmButtonColor: color,
		confirmButtonClass: css,
		customClass: "swal-modal"
	});
};

/**
 * Shows a confirmation dialog warning the user that they are about to show or hide one or more Teams to the public
 * schedule.
 *
 * @param action the action the user is attemping to perform
 * @param tournamentIds the teams the user is going to show or hide
 * @param text the button text associated with the attempted action
 * @param css the css associated with the attempted action
 * @param color the button color associated with the attempted action
 * @param published true for publish actions; false for unpublish actions
 */

const showConfirmationAlert = (action, teamIds, text, css, color, published) => {
	swal({
		titleText: "Are you sure?",
		html: "<div class=\"swal-modal-text\">You're about to \" + action + \" \" + teamIds.length + (teamIds.length > 1 ? \" Teams.\" : \" Team.\") + \"</div>",
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
			teamIds.forEach((teamId) => {
				Meteor.call("teams.update", teamId, { published });
			});
		}
	});
};

/**
 * Shows a confirmation dialog warning the user that they are about to delete or hide one or more Tournaments from the
 * TournamentList.
 *
 * @param tournamentIds the tournaments the user is going to delete
 */

const showDeletionAlert = (teamIds) => {
	swal({
		titleText: "Are you sure?",
		html: "<div class=\"swal-modal-text\">You're about to delete \" + teamIds.length + (teamIds.length > 1 ? \" Teams.\" : \" Team.\") + \"</div>",
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
			teamIds.forEach((teamId) => {
				Meteor.call("teams.remove", teamId);
			});
			browserHistory.push("/teams");
		}
	});
};

/**
 * Property types for this component.
 */

TeamListHeader.propTypes = {
	meteorCall: PropTypes.func.isRequired,
	Session: PropTypes.object.isRequired
};

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	return {
		browserHistory,
		meteorCall: Meteor.call,
		Session
	};
}, TeamListHeader);
