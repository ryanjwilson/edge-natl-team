import { Meteor } from "meteor/meteor";
import React from "react";
import { browserHistory } from "react-router";
import { createContainer } from "meteor/react-meteor-data";
import Modal from "react-modal";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";
import swal from "sweetalert2";

import MessageListFilters from "./MessageListFilters";

/**
 * A component that represents a fixture above the MessageList. It contains buttons deleting one or more Message, as
 * well as the MessageListFilters.
 */

export class MessageListHeader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isAddModalOpen: false
		};

		this.onDeleteMessages = this.onDeleteMessages.bind(this);
	}

	onDeleteMessages() {
		let messageIds = Session.get("multiselectedMessageIds");

		if (messageIds.length === 0 && Session.get("selectedMessageId")) {
			messageIds.push(Session.get("selectedMessageId"));
		}

		if (messageIds.length === 0) {
			showInvalidSelectionAlert("unpublish", "#e64942", "modal-button button--unpublish");
		} else {
			showDeletionAlert(messageIds);
		}
	}

	render() {
		return (
			<div className="item-list__header">
				<button className="button--remove" onClick={this.onDeleteMessages}>Delete Message</button>
                <MessageListFilters />
			</div>
		);
	}
}

/**
 * Shows an alert dialog informing the user that they haven"t selected any Messages from the MessageList.
 *
 * @param action the action the user is attemping to perform
 * @param color the button color associated with the attempted action
 * @param css the css associated with the attempted action
 */

const showInvalidSelectionAlert = (action, color, css) => {
	swal({
		titleText: "No Message Selected",
		html: "<div class=\"swal-modal-text\">You'll need to select at least one Message to \" + action + \".</div>",
		type: "info",
		confirmButtonColor: color,
		confirmButtonClass: css,
		customClass: "swal-modal"
	});
};

/**
 * Shows a confirmation dialog warning the user that they are about to delete one or more Message from the MessageList.
 *
 * @param messageIds the messages the user is going to delete
 */

const showDeletionAlert = (messageIds) => {
	swal({
		titleText: "Are you sure?",
		html: "<div class=\"swal-modal-text\">You're about to delete \" + messageIds.length + (messageIds.length > 1 ? \" Messages.\" : \" Message.\") + \"</div>",
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
 * Property types for this component.
 */

MessageListHeader.propTypes = {
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
}, MessageListHeader);
