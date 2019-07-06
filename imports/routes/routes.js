import React from "react";
import { browserHistory, Route, Router } from "react-router";
import { Session } from "meteor/session";

import Contact from "../ui/Contact";
import FAQs from "../ui/FAQs";
import Login from "../ui/admin/Login";
import MessageView from "../ui/admin/MessageView";
import NotFound from "../ui/NotFound";
import PastEvents from "../ui/PastEvents";
import Schedule from "../ui/Schedule";
import TeamRules from "../ui/TeamRules";
import TeamView from "../ui/admin/TeamView";
import TournamentView from "../ui/admin/TournamentView";
import WrestlerView from "../ui/admin/WrestlerView";

/**
 * Responds to changes in authentication status.
 * 
 * @param {Boolean} isAuthenticated whether or not the user is authenticated
 * @param {string} currentPagePrivacy whether or not the current page requires authentication
 */

export const onAuthenticationChange = (isAuthenticated, currentPagePrivacy) => {
	const isPrivatePage = (currentPagePrivacy === "authenticated");
	const isPublicPage = (currentPagePrivacy === "unauthenticated");

	if (isPrivatePage && !isAuthenticated) {
		browserHistory.replace("/admin");
	} else if (isPublicPage && isAuthenticated) {
		browserHistory.replace("/");
	}
};

/**
 * Sets sessions variables when a user navigates to a page.
 * 
 * @param {Object} nextState the destination state of the user
 */

const onEnterGlobal = (nextState) => {
	const destination = nextState.routes[nextState.routes.length - 1];

	Session.set("currentPagePrivacy", destination.privacy);
	Session.set("isMenuOpen", false);
};

/**
 * Responds to navigational changes by conditionally configuring routes and session variables.
 *  
 * @param {Object} prevState the origin state of the user
 * @param {Object} nextState the destination state of the user
 */

const onChangeGlobal = (prevState, nextState) => {
	const prev = (Object.keys(prevState.params).length === 0
		? prevState.location.pathname.substring(1)
		: prevState.location.pathname.substring(1, prevState.location.pathname.lastIndexOf("/"))
	);
	const next = (Object.keys(nextState.params).length === 0
		? nextState.location.pathname.substring(1)
		: nextState.location.pathname.substring(1, nextState.location.pathname.lastIndexOf("/"))
	);

	if (prev !== next) {
		switch (prev) {
			case "tournaments": Session.set("multiselectedTournamentIds", []); break;
			case "wrestlers": Session.set("multiselectedWrestlerIds", []); break;
			case "teams": Session.set("multiselectedTeamIds", []); break;
			case "messages": Session.set("multiselectedMessageIds", []); break;
		}
	}

	onEnterGlobal(nextState);
};

/**
 * Sets the selected Tournament when the user navigates to the list of Tournaments.
 * 
 * @param {Object} nextState the destination state of the user
 */

const onEnterTournament = (nextState) => {
	Session.set("selectedTournamentId", nextState.params.tournamentId);
};

/**
 * Sets the selected Wrestler when the user navigates to the list of Wrestlers.
 * 
 * @param {Object} nextState the destination state of the user
 */

const onEnterWrestler = (nextState) => {
	Session.set("selectedWrestlerId", nextState.params.wrestlerId);
};

/**
 * Sets the selected Team when the user navigates to the list of Teams.
 * 
 * @param {Object} nextState the destination state of the user
 */

const onEnterTeam = (nextState) => {
	Session.set("selectedTeamId", nextState.params.teamId);
};

/**
 * Sets the selected Message when the user navigates to the list of Messages.
 * 
 * @param {Object} nextState the destination state of the user
 */

const onEnterMessage = (nextState) => {
	Session.set("selectedMessageId", nextState.params.messageId);
};

/**
 * Clears the session variable upon exit.
 */

const onLeaveTournament = () => {
	Session.set("selectedTournamentId", undefined);
};

/**
 * Clears the session variable upon exit.
 */

const onLeaveWrestler = () => {
	Session.set("selectedWrestlerId", undefined);
};

/**
 * Clears the session variable upon exit.
 */

const onLeaveTeam = () => {
	Session.set("selectedTeamId", undefined);
};

/**
 * Clears the session variable upon exit.
 */

const onLeaveMessage = () => {
	Session.set("selectedMessageId", undefined);
};

/**
 * Configures the available application routes, as well as their behaviors.
 */

export const routes = (
	<Router history={browserHistory}>
		<Route onEnter={onEnterGlobal} onChange={onChangeGlobal}>
			<Route path="/" component={Schedule} />
			<Route path="/rules" component={TeamRules} />
			<Route path="/faq" component={FAQs} />
			<Route path="/media" component={PastEvents} />
			<Route path="/contact" component={Contact} />
			<Route path="/admin" component={Login} privacy="unauthenticated" />
			<Route path="/tournaments" component={TournamentView} privacy="authenticated" />
			<Route path="/tournaments/:tournamentId" component={TournamentView} privacy="authenticated" onEnter={onEnterTournament} onLeave={onLeaveTournament} />
			<Route path="/wrestlers" component={WrestlerView} privacy="authenticated" />
			<Route path="/wrestlers/:wrestlerId" component={WrestlerView} privacy="authenticated" onEnter={onEnterWrestler} onLeave={onLeaveWrestler} />
			<Route path="/teams" component={TeamView} privacy="authenticated" />
			<Route path="/teams/:teamId" component={TeamView} privacy="authenticated" onEnter={onEnterTeam} onLeave={onLeaveTeam} />
			<Route path="/messages" component={MessageView} privacy="authenticated" />
			<Route path="/messages/:messageId" component={MessageView} privacy="authenticated" onEtner={onEnterMessage} onLeave={onLeaveMessage} />
			<Route path="*" component={NotFound} />
		</Route>
	</Router>
);
