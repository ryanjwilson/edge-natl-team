import React from "react";
import { Accounts } from "meteor/accounts-base";

import Footer from "../Footer";
import Header from "../Header";
import TeamEditor from "./TeamEditor";
import TeamList from "./TeamList";

/**
 * A component that represents all Team-related components, which includes the TeamList (of Teams) and TeamEditor.
 */

export default class TeamView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "Teams"
		};
	}

	render() {
		return (
			<div>
				<Header />

				<div className="private-page-content">
					<div className="private-page-content__sidebar">
						<TeamList />
					</div>
					<div className="private-page-content__main">
						<TeamEditor />
					</div>
				</div>

				<Footer />
			</div>
		);
	}
}
