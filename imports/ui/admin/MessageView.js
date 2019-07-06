import React from "react";

import Footer from "../Footer";
import Header from "../Header";
import TeamEditor from "./TeamEditor";
import MessageList from "./MessageList";

/**
 * A component that represents all Message-related components, which includes the MessageList (of Messages) and MessageEditor.
 */

export default class MessageView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "Messages"
		};
	}

	render() {
		return (
			<div>
				<Header />

				<div className="private-page-content">
					<div className="private-page-content__sidebar">
						<MessageList />
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
