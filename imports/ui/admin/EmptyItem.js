import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";

/**
 * A placeholder component for an empty list.
 * 		- MessageList
 * 		- TeamList
 * 		- TournamentList
 * 		- WrestlerList
 */

export class EmptyItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			label: props.label
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.label !== nextProps.label) {
			this.setState({ label: nextProps.label });
		}
	}

	render() {
		return (
			<p className="empty-item">No {this.state.label} to display.</p>
		);
	}
}

/**
 * Property types for this component.
 */

EmptyItem.propTypes = {
	label: PropTypes.string.isRequired
};

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	return {

	};
}, EmptyItem);
