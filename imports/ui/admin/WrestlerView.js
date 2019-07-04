import React from "react";
import { Accounts } from "meteor/accounts-base";

import Header from "../Header";
import Footer from "../Footer";
import WrestlerEditor from "./WrestlerEditor";
import WrestlerList from "./WrestlerList";

/**
 * A component that represents all Wrestler-related components, which includes the WrestlerList (of Wrestlers) and WrestlerEditor.
 */

export default WrestlerView = () => {
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
};
