import React from "react";

import Header from "./Header";
import Footer from "./Footer"

/**
 * A component that renders a custom 404 page.
 */

export default class NotFound extends React.Component {
	render() {
		return (
			<div>
				<Header />

				<div className="public-page-content">
					<div className="public-page-content__not-found">
						<div className="container">
							<h5 className="container__title">404</h5>
			
							<div className="container__not-found">
								<img src="/images/not-found.png" className="not-found__image" />
								<p className="container__error-title">Oops! 404. That's an error.</p>
								<p className="container__error-subtitle">The requested URL was not found.</p>
							</div>
						</div>
					</div>
				</div>

				<Footer />
			</div>
		);
	}
}
