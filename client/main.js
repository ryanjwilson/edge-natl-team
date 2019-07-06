import { Meteor } from "meteor/meteor";
import { browserHistory } from "react-router";
import ReactDOM from "react-dom";
import { Session } from "meteor/session";
import { Tracker } from "meteor/tracker";

import { onAuthenticationChange, routes } from "../imports/routes/routes";
import "../imports/startup/simple-schema-config.js";

/**
 * Tracks changes in authentication status, and responds accordingly.
 */

Tracker.autorun(() => {
	const isAuthenticated = !!Meteor.userId();
	const currentPagePrivacy = Session.get("currentPagePrivacy");

	onAuthenticationChange(isAuthenticated, currentPagePrivacy);
});

/**
 * Tracks changes in tournament, wrestler, or team selection status, and responds accordingly.
 */

Tracker.autorun(() => {
	const selectedTournamentId = Session.get("selectedTournamentId");
	const selectedWrestlerId = Session.get("selectedWrestlerId");
	const selectedTeamId = Session.get("selectedTeamId");

	Session.set("isNavigationOpen", false);       // prevents admin sidebar panel animation on browser refresh
	Session.set("isMenuOpen", false);             // prevents admin menu animation on browser refresh
	Session.set("isApplicationOpen", false);      // prevents application animation on browser refresh
	Session.set("isRosterOpen", false);           // prevents roster animation on browser refresh

	// conditionally re-direct the application based on selected tournament, wrestler, team, or current pathname.

	if (selectedTournamentId) {
		browserHistory.replace(`/tournaments/${selectedTournamentId}`);
	} else if (selectedWrestlerId) {
		browserHistory.replace(`/wrestlers/${selectedWrestlerId}`);
	} else if (selectedTeamId) {
		browserHistory.replace(`/teams/${selectedTeamId}`);
	} else {
		if (this.location.pathname.includes("/tournaments")) {
			browserHistory.replace("/tournaments");
		} else if (this.location.pathname.includes("/wrestlers")) {
			browserHistory.replace("/wrestlers");
		} else if (this.location.pathname.includes("/teams")) {
			browserHistory.replace("/teams");
		}
	}
});

/*
 * Toggles the visibility (i.e., open or closed) of the mobile public navigation menu.
 */

Tracker.autorun(() => {
	document.body.classList.toggle("is-navigation-open", Session.get("isNavigationOpen"));
	document.body.classList.toggle("no-scroll", Session.get("isNavigationOpen"));
});

/**
 * Toggles the visibility (i.e., open or closed) of the desktop slide-out menu.
 */

Tracker.autorun(() => {
	document.body.classList.toggle("is-menu-open", Session.get("isMenuOpen"));
	document.body.classList.toggle("no-scroll", Session.get("isMenuOpen"));
});

/**
 * Toggles the visibility of the roster modal.
 */

Tracker.autorun(() => {
	document.body.classList.toggle("is-roster-open", Session.get("isRosterOpen"));
	document.body.classList.toggle("no-scroll", Session.get("isRosterOpen"));
});

/**
 * Executes when the application initially loads.
 */

Meteor.startup(() => {
	Session.set("isNavigationOpen", false);       						// when the applicaiton first loads,
	Session.set("isMenuOpen", false);             						// menus and modals (navigation, admin,
	Session.set("isApplicationOpen", false);      						// wrestler application, and scheduled
	Session.set("isRosterOpen", false);           						// tournament list) should be closed.

	/*
	 * Clear selections (and multiselections) for tournament, wrestler, team, and message views.
	 */

	Session.set("selectedTournamentId", undefined);
	Session.set("selectedWrestlerId", undefined);
	Session.set("selectedTeamId", undefined);
	Session.set("selectedMessageId", undefined);
	Session.set("multiselectedTournamentIds", []);
	Session.set("multiselectedWrestlerIds", []);
	Session.set("multiselectedTeamIds", []);
	Session.set("multiselectedMessageIds", []);

	/*
	 * Clear (or provide default values for) session variables that govern list filtering.
	 */

	Session.set("showPublishedFilter", true);                           // tournament view: events shown on public calendar
	Session.set("showUnpublishedFilter", true);                         // tournament view: events hidden on public calendar
	Session.set("selectedTournamentFilter", undefined);                 // wrestler view: tournament selected from dropdown menu
	Session.set("selectedDivisionFilter", undefined);                   // wrestler view: division selected from dropdown menu
	Session.set("selectedWeightClassFilter", undefined);                // wrestler view: weight class selected from dropdown menu
	Session.set("selectedTeamTournamentFilter", undefined);             // team view, tournament selected from dropdown menu
	Session.set("selectedTeamDivisionFilter", undefined);               // team view, division selected from dropdown menu
	Session.set("selectedTeamTournamentModalFilter", undefined);        // team view, tournament selected from the modal dropdown menu
	Session.set("selectedTeamDivisionNidakFilter", undefined);          // team view, division selected from the modal dropdown menu
	Session.set("showAnsweredFilter", true);							// message view: messages that have been answered
	Session.set("showUnansweredFilter", true);							// message view: messages that haven't yet been answered

	/**
	 * @todo add this to wrestler view, before team view?
	 * Session.set("selectedWrestlerTournamentModalFilter", undefined);    // wrestler view, tournament selected from modal dropdown menu
	 * Session.set("selectedWrestlerDivisionModalFilter", undefined);      // wrestler view, division selected from the modal dropdown menu
	 * Session.set("selectedWrestlerWeightClassModalFilter", undefined);   // wrestler view, weight class selected from the modal dropdown menu
	 */

	ReactDOM.render(routes, document.getElementById("app"));
});
