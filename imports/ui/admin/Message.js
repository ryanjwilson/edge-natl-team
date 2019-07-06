import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";

/**
 * A component that represents a single Message in the Message.
 */

export class Message extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            _id: props.message._id,
			sender: props.message.sender,
            email: props.message.email,
            phone: props.message.phone,
            body: props.message.body,
			responded: props.message.responded,
			css: props.message.selected || props.message.multiselected ? "item item--selected" : "item"
		};

		this.onMessageSelect = this.onMessageSelect.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ css: nextProps.message.selected || nextProps.message.multiselected ? "item item--selected" : "item", ...nextProps.message });
	}

	onMessageSelect(e) {
		let ids = Session.get("multiselectedMessageIds");
		const selectedMessageId = Session.get("selectedMessageId");

		if (selectedMessageId && !ids.includes(selectedMessageId)) {
			ids.push(selectedMessageId);
		}

		if (e.metaKey) {
			if (!ids.includes(this.state._id)) {
				ids.push(this.state._id);
			}

			if (ids.length === 1) {
				Session.set("selectedMessageId", this.state._id);
			} else {
				Session.set("selectedMessageId", undefined);
			}
		} else {
			ids = [];
			ids.push(this.state._id);

			Session.set("selectedMessageId", this.state._id);
		}
		Session.set("multiselectedMessageIds", ids);
	}

	render() {
		return (
			<div id="message" className={this.state.css} onClick={this.onMessageSelect}>
				<div className="item__text">
					<h5 className="item__title">{this.state.sender || "Unknown Sender"}</h5>
					<p className="item__subtitle">{this.state.body || "Message"}</p>
				</div>
				{this.state.responded ? <div className="item__status-icon"><img src="/images/published-icon.svg" /></div> : undefined}
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
