import React from "react";
import { createContainer } from "meteor/react-meteor-data";

/**
 * A component that renders image galleries from past events.
 */

export class EventPictures extends React.Component {
	constructor(props) {
		super(props);
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

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	return {

	};
}, EventPictures);
