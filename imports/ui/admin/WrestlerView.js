import React from "react";

import Header from "../Header";
import Footer from "../Footer";
import WrestlerEditor from "./WrestlerEditor";
import WrestlerList from "./WrestlerList";

/**
 * A component that represents all Wrestler-related components, which includes the WrestlerList and WrestlerEditor.
 */

export default class WrestlerView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "Wrestlers"
		};
	}

	render() {
		return (
			<div>
				<Header />

				<div className="private-page-content">
					<div className="private-page-content__sidebar">
						<WrestlerList />
					</div>
					<div className="private-page-content__main">
						<WrestlerEditor />
					</div>
				</div>

				<Footer />
			</div>
		);
	}
}
