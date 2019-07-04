import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';

export class EventPictures extends React.Component {
	constructor(props) {
		super(props);

		this.state = {

		};

		// bind field listeners to this context. remaining listeners are bound
		// manually, as they take additional parameters.
	}

	componentWillReceiveProps(nextProps) {

	}

	render() {
		return (
			<div className="container container__past-events">
				<h5 className="container__title">Media</h5>

				<div className="container__content">
					<p className="container__subtitle">Coming soon!</p>
					<hr />

					<div>

					</div>
				</div>
			</div>
		);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

EventPictures.propTypes = {

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
	return {

	};
}, EventPictures);
