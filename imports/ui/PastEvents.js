import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import EventPictuers from "./EventPictures";

/**
 * A component that displays past events and image galleries.
 */

export default class PastEvents extends React.Component {
	render() {
		return (
			<div>
				<Header />

				<div className="public-page-content">
					<div className="public-page-content__past-events">
						<EventPictuers />
					</div>
				</div>

				<Footer />
			</div>
		);
	}
}
