import { Meteor } from "meteor/meteor";
import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";

import { Messages } from "../../api/messages";

/**
 * A component that represnts filter options for a MessageList.
 */

export class MessageListFilters extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            showPublished: true,
			showUnpublished: true
		};

		this.toggleAnswered = this.toggleAnswered.bind(this);
		this.toggleUnanswered = this.toggleUnanswered.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.showAnswered !== nextProps.showAnswered) this.setState({ showAnswered: nextProps.showAnswered });
		if (this.props.showUnanswered !== nextProps.showUnanswered) this.setState({ showUnanswered: nextProps.showUnanswered });
	}

	toggleAnswered(e) {
		const showAnswered = e.target.checked;

		Session.set("showAnsweredFilter", showAnswered);
		this.setState({ showAnswered });
	}

	toggleUnanswered(e) {
		const showUnanswered = e.target.checked;

		Session.set("showUnansweredFilter", showUnanswered);
		this.setState({ showUnanswered });
	}

	render() {
		return (
			<div className="checkbox__filter-group">
				<label className="checkbox">
					<input className="checkbox__box" type="checkbox" checked={this.state.showAnswered} onChange={this.toggleAnswered} />
					Answered
				</label>
				<label className="checkbox">
					<input className="checkbox__box" type="checkbox" checked={this.state.showUnanswered} onChange={this.toggleUnanswered} />
					Unanswered
				</label>
			</div>
		);
	}
}

/**
 * Retrieves a list of answered messages.
 * 
 * @returns a list of messages
 */

const getMessages = () => {
	return Messages.find({ answered: true }).fetch().map((message) => {
		return { ...message };
	});
};

/**
 * Property types for this component.
 */

MessageListFilters.propTypes = {
	showAnswered: PropTypes.bool,
	showUnanswered: PropTypes.bool
};

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	const showAnswered = Session.get("showAnsweredFilter");
	const showUnanswered = Session.get("showUnansweredFilter");

	return {
		showAnswered,
		showUnanswered
	};
}, MessageListFilters);
