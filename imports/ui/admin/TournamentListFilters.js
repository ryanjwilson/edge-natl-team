import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";

/**
 * A component that provides filters that allow the user to customize the Tournaments that appear in the TournamentList.
 */

export class TournamentListFilters extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showPublished: true,
			showUnpublished: true
		};

		this.togglePublished = this.togglePublished.bind(this);
		this.toggleUnpublished = this.toggleUnpublished.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.showPublished !== nextProps.showPublished) this.setState({ showPublished: nextProps.showPublished });
		if (this.props.showUnpublished !== nextProps.showUnpublished) this.setState({ showUnpublished: nextProps.showUnpublished });
	}

	togglePublished(e) {
		const showPublished = e.target.checked;

		Session.set("showPublishedFilter", showPublished);
		this.setState({ showPublished });
	}

	toggleUnpublished(e) {
		const showUnpublished = e.target.checked;

		Session.set("showUnpublishedFilter", showUnpublished);
		this.setState({ showUnpublished });
	}

	render() {
		return (
			<div className="checkbox__filter-group">
				<label className="checkbox">
					<input className="checkbox__box" type="checkbox" checked={this.state.showPublished} onChange={this.togglePublished} />
					Shown
				</label>
				<label className="checkbox">
					<input className="checkbox__box" type="checkbox" checked={this.state.showUnpublished} onChange={this.toggleUnpublished} />
					Hidden
				</label>
			</div>
		);
	}
}

/**
 * Property types for this component.
 */

TournamentListFilters.propTypes = {
	showPublished: PropTypes.bool,
	showUnpublished: PropTypes.bool
};

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	const showPublished = Session.get("showPublishedFilter");
	const showUnpublished = Session.get("showUnpublishedFilter");

	return {
		showPublished,
		showUnpublished
	};
}, TournamentListFilters);
