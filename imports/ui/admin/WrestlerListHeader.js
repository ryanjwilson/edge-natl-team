import { Meteor } from "meteor/meteor";
import React from "react";
import { browserHistory } from "react-router";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";
import swal from "sweetalert2";

import WrestlerListFilters from "./WrestlerListFilters";

/**
 * A component that represents a fixture above the WrestlerList. It contains buttons for adding, merging, or deleting
 * one or more Wrestlers, as well as the WrestlerListFilters.
 */

export class WrestlerListHeader extends React.Component {
	constructor(props) {
		super(props);

		this.onAddWrestler = this.onAddWrestler.bind(this);
		this.onDeleteWrestlers = this.onDeleteWrestlers.bind(this);
	}

	onAddWrestler() {
		Session.set("multiselectedWrestlerIds", []);      // clear multiselect list

		Meteor.call("wrestlers.insert", (err, res) => {
			if (res) {
				Session.set("selectedWrestlerId", res);
			}
		});
	}

	onDeleteWrestlers() {
		const wrestlerIds = Session.get("multiselectedWrestlerIds");

		if (wrestlerIds.length === 0) {
			swal.fire({
				titleText: "No Wrestler Selected",
				html: "<div class=\"swal-modal-text\">You'll need to select at least one Wrestler to delete.</div>",
				type: "info",
				confirmButtonColor: "#e64942",
				confirmButtonClass: "modal-button button--delete",
				customClass: "swal-modal"
			});
		} else {
			swal.fire({
				titleText: "Are you sure?",
				html: "<div class=\"swal-modal-text\">You're about to delete " + wrestlerIds.length + (wrestlerIds.length > 1 ? " Wrestlers." : " Wrestler.") + "</div>",
				type: "warning",
				showCancelButton: true,
				cancelButtonClass: "modal-button button--cancel",
				confirmButtonText: "Delete",
				confirmButtonClass: "modal-button button--delete",
				confirmButtonColor: "#e64942",
				reverseButtons: true,
				customClass: "swal-modal"
			}).then((response) => {
				if (response && response.value) {
					wrestlerIds.forEach((wrestlerId) => {
						Meteor.call("wrestlers.remove", wrestlerId);
					});

					browserHistory.push("/wrestlers");
				}
			});
		}
	}

	render() {
		return (
			<div className="item-list__header">
				<button className="button--add" onClick={this.onAddWrestler}>Add Wrestler</button>
				<div className="multiselect-group two">
					<button className="button button--unpublish" onClick={() => { }}>Merge</button>
					<button className="button button--delete" onClick={this.onDeleteWrestlers}>Delete</button>
				</div>
				<WrestlerListFilters />
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
}, WrestlerListHeader);
