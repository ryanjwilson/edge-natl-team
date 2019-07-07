import { Meteor } from "meteor/meteor";
import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import { Session } from "meteor/session";

import EmptyItem from "./EmptyItem";
import Tournament from "./Tournament";
import TournamentListHeader from "./TournamentListHeader";
import { Tournaments } from "../../api/tournaments";

/**
 * A component that renders a list of Tournaments.
 */

export class TournamentList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tournaments: props.tournaments
		};

		refreshTournamentIds(props.tournaments);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.tournaments.length !== nextProps.tournaments.length) {
			this.setState({ tournaments: nextProps.tournaments });
		} else {
			this.props.tournaments.some((tournament, index) => {
				if (!isEquivalent(tournament, nextProps.tournaments[index])) {
					this.setState({ tournaments: nextProps.tournaments });
					return true;
				}
			});
		}

		refreshTournamentIds(nextProps.tournaments);
	}

	render() {
		return (
			<div className="container container__item-list">
				<div className="container__header container__item-list-header">
					<h5 className="container__title">Tournaments</h5>
				</div>

				<div className="item-list">
					<TournamentListHeader />

					{this.state.tournaments.length === 0 ? <EmptyItem label="Tournaments" /> : undefined}
					{this.state.tournaments.map((tournament) => {
						return <Tournament key={tournament._id} tournament={tournament} />;
					})}
				</div>
			</div>
		);
	}
}

/**
 * Refreshes the Session variables responsible for storing which tournaments are currently selected. This is done to
 * reflect changes in list filtering.
 *
 * @param tournaments the original list of tournaments before filtering
 */

const refreshTournamentIds = (tournaments) => {
	if (tournaments) {
		let freshIds = [];
		const staleIds = Session.get("multiselectedTournamentIds");

		tournaments.forEach((tournament) => {
			if (staleIds.includes(tournament._id)) {
				freshIds.push(tournament._id);
			}
		});

		if (freshIds.length === 1) {
			Session.set("selectedTournamentId", freshIds[0]);
		}
		Session.set("multiselectedTournamentIds", freshIds);

		if (tournaments.length === 0) {
			Session.set("selectedTournamentId", undefined);
		} else if (tournaments.length === 1) {
			Session.set("selectedTournamentId", tournaments[0]._id);
		} else {
			if (tournaments.filter((tournament) => tournament._id === Session.get("selectedTournamentId")).length === 0) {
				Session.set("selectedTournamentId", undefined);
			}
		}
	}
};

/**
 * Determines if two tournaments are logically equivalent.
 *
 * @param prevTournament the previous tournament
 * @param nextTournament the next tournament
 * @returns true if the tournaments are logically equivalent; false otherwise
 */

const isEquivalent = (prevTournament, nextTournament) => {
	const prevProps = Object.getOwnPropertyNames(prevTournament);
	const nextProps = Object.getOwnPropertyNames(nextTournament);

	if (prevProps.length !== nextProps.length) {
		return false;
	}

	for (let i = 0; i < prevProps.length; i++) {
		const propName = prevProps[i];

		if (prevTournament[propName] !== nextTournament[propName]) {
			return false;
		}
	}

	return true;
};

/**
 * Property types for this component.
 */

TournamentList.propTypes = {
	tournaments: PropTypes.array.isRequired
};

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	Meteor.subscribe("tournaments");

	const selectedTournamentId = Session.get("selectedTournamentId");
	const multiselectedTournamentIds = Session.get("multiselectedTournamentIds");
	const showPublished = Session.get("showPublishedFilter");
	const showUnpublished = Session.get("showUnpublishedFilter");

	// conditionally query the tournaments collection based on the filter
	// selections made by the user.

	if (showPublished && showUnpublished) {
		return {
			tournaments: Tournaments.find({}, {
				sort: { order: 1 }
			}).fetch().map((tournament) => {
				return {
					...tournament,
					selected: tournament._id === selectedTournamentId,
					multiselected: multiselectedTournamentIds.includes(tournament._id)
				};
			})
		};
	} else if (showPublished || showUnpublished) {
		return {
			tournaments: Tournaments.find({
				published: showPublished
			}, {
					sort: { order: 1 }
				}).fetch().map((tournament) => {
					return {
						...tournament,
						selected: tournament._id === selectedTournamentId,
						multiselected: multiselectedTournamentIds.includes(tournament._id)
					};
				})
		};
	} else {
		return {
			tournaments: []
		};
	}
}, TournamentList);
