import { Meteor } from "meteor/meteor";
import React from "react";
import { browserHistory } from "react-router";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";
import swal from "sweetalert2";

import MessageListFilters from "./MessageListFilters";

/**
 * A component that represents a fixture above the MessageList. It contains buttons for answering, unanswering, or
 * deleting one or more Messages, as well as the MessageListFilters.
 */

export class MessageListHeader extends React.Component {
	constructor(props) {
		super(props);

		this.onMarkAnswered = this.onMarkAnswered.bind(this);
		this.onMarkUnanswered = this.onMarkUnanswered.bind(this);
		this.onDeleteMessages = this.onDeleteMessages.bind(this);
	}

	onMarkAnswered() {
		let messageIds = Session.get("multiselectedMessageIds");

		if (messageIds.length === 0 && Session.get("selectedMessageId")) {
			messageIds.push(Session.get("selectedMessageId"));
		}

		if (messageIds.length === 0) {
			showInvalidSelectionAlert("answered", "#5a5a5a", "modal-button button--unpublish");
		} else {
			showAnsweredDialog("answered", messageIds, "Mark as Answered", "modal-button button--publish", "#2e8b57", true)
		}
	}

	onMarkUnanswered() {
		let messageIds = Session.get("multiselectedMessageIds");

		if (messageIds.length === 0 && Session.get("selectedMessageId")) {
			messageIds.push(Session.get("selectedMessageId"));
		}

		if (messageIds.length === 0) {
			showInvalidSelectionAlert("unanswered", "#5a5a5a", "modal-button button--unpublish");
		} else {
			showAnsweredDialog("unanswered", messageIds, "Mark as Unanswered", "modal-button button--unpublish", "#5a5a5a", false)
		}
	}

	onDeleteMessages() {
		let messageIds = Session.get("multiselectedMessageIds");

		if (messageIds.length === 0 && Session.get("selectedMessageId")) {
			messageIds.push(Session.get("selectedMessageId"));
		}

		if (messageIds.length === 0) {
			showInvalidSelectionAlert("delete", "#e64942", "modal-button button--unpublish");
		} else {
			showDeletionAlert(messageIds);
		}
	}

	render() {
		return (
			<div className="item-list__header">
				<div className="multiselect-group three">
					<button className="button button--publish" onClick={this.onMarkAnswered}>Answered</button>
					<button className="button button--unpublish" onClick={this.onMarkUnanswered}>Unanswered</button>
					<button className="button button--delete" onClick={this.onDeleteMessages}>Delete</button>
				</div>
				<MessageListFilters />
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
		titleText: "No Message Selected",
		html: "<div class=\"swal-modal-text\">You'll need to select at least one Message to mark as " + action + ".</div>",
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
 * @param messageIds the messages the user is going to mark as answered or unanswered
 * @param text the button text associated with the attempted action
 * @param css the css associated with the attempted action
 * @param color the button color associated with the attempted action
 * @param anwered true for answered actions; false for unanswered actions
 */

const showAnsweredDialog = (action, messageIds, text, css, color, answered) => {
	swal({
		titleText: "Are you sure?",
		html: "<div class=\"swal-modal-text\">You're about to mark " + messageIds.length + (messageIds.length > 1 ? " Messages" : " Message") + " as " + action + ".</div>",
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
			messageIds.forEach((messageId) => {
				Meteor.call("messages.update", messageId, { answered });
			});
		}
	});
};

/**
 * Shows a confirmation dialog warning the user that they are about to delete or hide one or more Tournaments from the TournamentList.
 *
 * @param messageIds the tournaments the user is going to delete
 */

const showDeletionAlert = (messageIds) => {
	swal({
		titleText: "Are you sure?",
		html: "<div class=\"swal-modal-text\">You're about to delete " + messageIds.length + (messageIds.length > 1 ? " Messages" : " Message") + ".</div>",
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
			messageIds.forEach((messageId) => {
				Meteor.call("messages.remove", messageId);
			});
			browserHistory.push("/messages");
		}
	});
};

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	return {

	};
}, MessageListHeader);
