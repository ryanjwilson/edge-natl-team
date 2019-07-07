import { Meteor } from "meteor/meteor";
import React from "react";
import { browserHistory } from "react-router";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";

import { Messages } from "../../api/messages";

/**
 * A component that represents an editor to enter, modify, or a view Message information.
 */

export class MessageEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sender: "",
			email: "",
			phone: "",
			body: "",
			answered: false
		};
	}

	componentDidMount() {
		if (this.props.message) {
			this.setState({ ...this.props.message });
		}
	}

	componentDidUpdate(prevProps) {
		const currMessageId = this.props.message ? this.props.message._id : undefined;
		const prevMessageId = prevProps.message ? prevProps.message._id : undefined;

		if (currMessageId && currMessageId !== prevMessageId) {
			this.setState({ ...this.props.message });
		}
	}

	render() {
		if (this.props.message) {
			return (
				<div className="container">
					<div className="container__content container__contact-message">
						<label>
							<p>Name</p>
							<input id="sender-field" name="sender" value={this.state.sender} readOnly />
						</label>
						<label>
							<p>Email</p>
							<input id="email-field" name="email" type="email" value={this.state.email} readOnly />
						</label>
						<label>
							<p>Phone</p>
							<input id="phone-field" name="phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={this.state.phone} readOnly />
						</label>
						<label>
							<p>Message</p>
						</label>
						<textarea id="body-field" name="body" value={this.state.body} readOnly></textarea>
					</div>
				</div>
			);
		} else {
			return (
				<div className="container">
					<div className="editor">
						<p className="editor__message">{this.props.selectedMessageId ? "Message not found." : "Select or add a Message to get started."}</p>
					</div>
				</div>
			);
		}
	}
}

/**
 * Property types for this component.
 */

MessageEditor.propTypes = {
	message: PropTypes.object,
	selectedMessageId: PropTypes.string,
	browserHistory: PropTypes.object.isRequired
};

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	return {
		message: Messages.findOne(selectedMessageId),
		selectedMessageId: Session.get("selectedMessageId"),
		browserHistory
	};
}, MessageEditor);
