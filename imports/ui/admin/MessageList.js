import { Meteor } from "meteor/meteor";
import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";

import EmptyItem from "./EmptyItem";
import Message from "./Message";
import MessageListHeader from "./MessageListHeader";
import { Messages } from "../../api/messages";

/**
 * A component that renders a list of Messages.
 */

export class MessageList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: props.messages
		};

		refreshMessageIds(props.messages);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.messages.length !== nextProps.messages.length) {
			this.setState({ messages: nextProps.messages });
		} else {
			this.props.messages.some((message, index) => {
				if (!isEquivalent(message, nextProps.messages[index])) {
					this.setState({ messages: nextProps.messages });
					return true;
				}
			});
		}

		refreshMessageIds(nextProps.messages);
	}

	render() {
		return (
			<div className="container container__item-list">
				<div className="container__header container__item-list-header">
					<h5 className="container__title">Messages</h5>
				</div>

				<div className="item-list">
					<MessageListHeader />

					{this.state.messages.length === 0 ? <EmptyItem label="Messages" /> : undefined}
					{this.state.messages.map((message) => {
						return <Message key={message._id} message={message} />;
					})}
				</div>
			</div>
		);
	}
}

/**
 * Refreshes the Session variables responsible for storing which messages are currently selected. This is done to
 * reflect changes in list filtering.
 *
 * @param messages the original list of messages before filtering
 */

const refreshMessageIds = (messages) => {
	if (messages) {
		let freshIds = [];
		const staleIds = Session.get("multiselectedMessageIds");

		messages.forEach((message) => {
			if (staleIds.includes(message._id)) {
				freshIds.push(message._id);
			}
		});

		if (freshIds.length === 1) {
			Session.set("selectedMessageId", freshIds[0]);
		}
		Session.set("multiselectedMessageIds", freshIds);

		if (messages.length === 0) {
			Session.set("selectedMessageId", undefined);
		} else if (messages.length === 1) {
			Session.set("selectedMessageId", messages[0]._id);
		} else {
			if (messages.filter((message) => message._id === Session.get("selectedMessageId")).length === 0) {
				Session.set("selectedMessageId", undefined);
			}
		}
	}
};

/**
 * Determines if two messages are logically equivalent.
 *
 * @param prevMessage the previous message
 * @param nextMessage the next message
 * @returns true if the message are logically equivalent; false otherwise
 */

const isEquivalent = (prevMessage, nextMessage) => {
	const prevProps = Object.getOwnPropertyNames(prevMessage);
	const nextProps = Object.getOwnPropertyNames(nextMessage);

	if (prevProps.length !== nextProps.length) {
		return false;
	}

	for (let i = 0; i < prevProps.length; i++) {
		const propName = prevProps[i];

		if (prevMessage[propName] !== nextMessage[propName]) {
			return false;
		}
	}

	return true;
};

/**
 * Property types for this component.
 */

MessageList.propTypes = {
	messages: PropTypes.array.isRequired
};

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	Meteor.subscribe("messages");

	const selectedMessageId = Session.get("selectedMessageId");
	const multiselectedMessageIds = Session.get("multiselectedMessageIds");
	const showAnswered = Session.get("showAnsweredFilter");
	const showUnanswered = Session.get("showUnansweredFilter");

	// conditionally query the messages collection based on the filter
	// selections made by the user.

	if (showAnswered && showUnanswered) {
		return {
			messages: Messages.find({}, {
				sort: { order: 1 }
			}).fetch().map((message) => {
				return {
					...message,
					selected: message._id === selectedMessageId,
					multiselected: multiselectedMessageIds.includes(message._id)
				};
			})
		};
	} else if (showAnswered || showUnanswered) {
		return {
			messages: Messages.find({
				published: showAnswered
			}, {
					sort: { order: 1 }
				}).fetch().map((message) => {
					return {
						...message,
						selected: message._id === selectedMessageId,
						multiselected: multiselectedMessageIds.includes(message._id)
					};
				})
		};
	} else {
		return {
			messages: []
		};
	}
}, MessageList);
