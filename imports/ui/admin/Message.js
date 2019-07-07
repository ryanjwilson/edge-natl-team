import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";

/**
 * A component that represents a single Message in the MessageList.
 */

export class Message extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			message: props.message,
			css: props.message.selected || props.message.multiselected ? "item item--selected" : "item"
		};

		this.onMessageSelect = this.onMessageSelect.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.message._id !== nextProps.message._id) this.setState({ message: nextProps.message });

		if (this.props.message.selected !== nextProps.message.selected || this.props.message.multiselected !== nextProps.message.multiselected) {
			this.setState({ css: nextProps.message.selected || nextProps.message.multiselected ? "item item--selected" : "item" });
		}

		this.setState({ message: nextProps.message });
	}

	onMessageSelect(e) {
		let ids = Session.get("multiselectedMessageIds");
		const selectedMessageId = Session.get("selectedMessageId");

		if (selectedMessageId && !ids.includes(selectedMessageId)) {
			ids.push(selectedMessageId);
		}

		if (e.metaKey) {
			if (!ids.includes(this.state.message._id)) {
				ids.push(this.state.message._id);
			}

			if (ids.length === 1) {
				Session.set("selectedMessageId", this.state.message._id);
			} else {
				Session.set("selectedMessageId", undefined);
			}
		} else {
			ids = [];
			ids.push(this.state.message._id);

			Session.set("selectedMessageId", this.state.message._id);
		}
		Session.set("multiselectedMessageIds", ids);
	}

	render() {
		return (
			<div id="message" className={this.state.css} onClick={this.onMessageSelect}>
				<div className="item__text">
					<h5 className="item__title">{this.state.message.sender || "Unknown Sender"}</h5>
					<p className="item__subtitle">{this.state.message.body || "Message"}</p>
				</div>
				{this.state.message.answered ? <div className="item__status-icon"><img src="/images/published-icon.svg" /></div> : undefined}
			</div>
		);
	}
}

/**
 * Property types for this component.
 */

Message.propTypes = {
	message: PropTypes.object.isRequired
};

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	return {

	};
}, Message);
