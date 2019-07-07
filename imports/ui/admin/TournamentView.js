import React from "react";

import Footer from "../Footer";
import Header from "../Header";
import TournamentEditor from "./TournamentEditor";
import TournamentList from "./TournamentList";

/**
 * A component that represents all Tournament-related components, which includes the TournamentList and TournamentEditor.
 */

export default class TournamentView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "Tournaments"
		};
	}

	render() {
		return (
			<div>
				<Header />

				<div className="private-page-content">
					<div className="private-page-content__sidebar">
						<TournamentList />
					</div>
					<div className="private-page-content__main">
						<TournamentEditor />
					</div>
				</div>

				<Footer />
			</div>
		);
	}
}
