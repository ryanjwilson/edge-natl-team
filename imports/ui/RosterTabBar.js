import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";

/**
 * A tabbed header component for dual rosters.
 */

export class RosterTabBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tabs: props.tabs,
			selectedTab: 0
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.tabs.length !== nextProps.tabs.length) {
			this.setState({ tabs: nextProbs.tabs });
		} else {
			this.props.tabs.some((tab, index) => {
				if (tab.name !== nextProps.tabs[index].name) {
					this.setState({ tabs: nextProps.tabs });

					return true;
				}
			});
		}
	}

	render() {
		return (
			<div className="event__roster-tabs">
				{this.state.tabs.map((tab, index, tabs) => {
					const css = "event__roster-tab" + (this.state.selectedTab === index ? " event__roster-tab--selected" : "")
						+ (index === 0 ? " event__roster-left-tab" : "") + (index === tabs.length - 1 && tabs.length !== 1 ? " event__roster-right-tab" : "");

					return (
						<div key={index} className={css} onClick={() => {
							this.setState({ selectedTab: index });
							this.props.callbackFromParent(index);
						}}>
							{tab.tournament.division.name}
						</div>
					);
				})}
			</div>
		);
	}
}

/**
 * Property types for this component.
 */

RosterTabBar.propTypes = {
	isSidebarOpen: PropTypes.bool,
	tabs: PropTypes.array.isRequired,
	selectedTab: PropTypes.number
};

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	return {
		isSidebarOpen: Session.get("isSidebarOpen")
	};
}, RosterTabBar);
