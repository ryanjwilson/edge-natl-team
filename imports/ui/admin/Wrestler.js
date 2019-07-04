import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";

/**
 * A component that represents a Wreslter.
 * 
 * @param {Object} props the properties passed into this component
 */

export const Wrestler = (props) => {
	const convertGrade = (grade) => {
		if (grade) {
			switch (grade.toUpperCase()) {
				case "K": return "Kindergarten";
				case "1": return "1st grade";
				case "2": return "2nd grade";
				case "3": return "3rd grade";
				case "4": case "5": case "6": case "7": case "8": case "9": case "10": case "11": case "12": return grade + "th grade";
				default: return null;
			}
		}

		return null;
	};

	const onWrestlerSelect = (e) => {
		let ids = props.Session.get("multiselectedWrestlerIds");

		if (e.metaKey) {
			if (!ids.includes(props.wrestler._id)) {
				ids.push(props.wrestler._id);             // add to multiselect list
			}

			if (ids.length === 1) {
				props.Session.set("selectedWrestlerId", props.wrestler._id)
			} else {
				props.Session.set("selectedWrestlerId", undefined);
			}
		} else {
			ids = [];                           // clear multiselect list
			ids.push(props.wrestler._id);       // add newly selected to list

			props.Session.set("selectedWrestlerId", props.wrestler._id)
		}

		props.Session.set("multiselectedWrestlerIds", ids);
	};

	const className = props.wrestler.selected || props.wrestler.multiselected ? "item item--selected" : "item";
	const subtitlePrimary = props.wrestler.weight ? props.wrestler.weight + " lbs." : "Weight";
	const subtitleSecondary = convertGrade(props.wrestler.grade);

	return (
		<div id="wrestler" className={className} onClick={onWrestlerSelect}>
			<div className="item__text">
				<h5 className="item__title">{props.wrestler.name || "Unknown Wrestler"}</h5>
				<p className="item__subtitle">{subtitlePrimary} &middot; {subtitleSecondary || "Grade"}</p>
			</div>
		</div>
	);
};

/**
 * Property types for this component.
 */

Wrestler.propTypes = {
	wrestler: PropTypes.object.isRequired,
	Session: PropTypes.object.isRequired
};

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	return {
		Session,
		isSidebarOpen: Session.get("isSidebarOpen")
	};
}, Wrestler);
