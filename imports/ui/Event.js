import Modal from 'react-modal';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';

import { RosterList } from './RosterList';
import { Teams } from '../api/teams';

export class Event extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			event: props.event,
			teams: props.teams,
			isLastEvent: props.isLastEvent,
			isRosterModalOpen: false,
			isRosterOpen: false
		};

		this.onApplyNow = this.onApplyNow.bind(this);
		this.showRosterModal = this.showRosterModal.bind(this);
		this.closeRosterModal = this.closeRosterModal.bind(this);
		this.showRoster = this.showRoster.bind(this);
		this.hideRoster = this.hideRoster.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.event._id !== nextProps.event._id) this.setState({ event: nextProps.event });
		if (this.props.teams.length !== nextProps.teams.length) {
			this.setState({ teams: nextProps.teams });
		} else {
			this.props.teams.some((team, index) => {
				if (team._id !== nextProps.teams[index]._id) {
					this.setState({ teams: nextProps.teams });

					return true;
				}
			});
		}
	}

	onApplyNow() {
		Session.set('isApplicationOpen', true);
	}

	showRosterModal() {
		this.setState({ isRosterModalOpen: true });
		disableBodyScroll(document.querySelector('.boxed-view--modal'));
		disableBodyScroll(document.querySelector('.event__mobile-roster'));
	}

	closeRosterModal() {
		this.setState({ isRosterModalOpen: false });
		enableBodyScroll(document.querySelector('.boxed-view--modal'));
		enableBodyScroll(document.querySelector('.event__mobile-roster'));
	}

	showRoster() {
		Session.set('isRosterOpen', true);
		this.setState({ isRosterOpen: true });
	}

	hideRoster() {
		Session.set('isRosterOpen', false);
		this.setState({ 'isRosterOpen': false });
	}

	render() {
		return (
			<div className={this.state.isLastEvent ? 'event event__bottom' : 'event'}>
				<div className="event__header">
					<h5 className="event__title">{this.state.event.name}</h5>
					<div className="event__desktop-roster-icon" onClick={this.showRosterModal}>
						<img src="/images/roster-button.svg" />
						<span>ROSTER</span>
					</div>
					<div className="event__mobile-roster-icon" onClick={this.showRoster}>
						<img src="/images/roster-button.svg" />
						<span>ROSTER</span>
					</div>
				</div>

				{/* desktop roster modal */}

				<Modal appElement={document.getElementById('app')} isOpen={this.state.isRosterModalOpen} contentLabel="View Roster" onRequestClose={this.closeRosterModal} className="boxed-view__box event__desktop-roster" overlayClassName="boxed-view boxed-view--modal">
					<div className="boxed-view__header">
						<h5 className="boxed-view__title">{this.state.event.name}</h5>
						<img src="/images/navigation/menu-close-button.svg" onClick={this.closeRosterModal} />
					</div>

					<div className="boxed-view__box-content">
						<RosterList key={this.state.event._id} teams={this.state.teams} />
					</div>
				</Modal>

				{/* mobile roster modal */}

				<Modal appElement={document.getElementById('app')} isOpen={this.state.isRosterOpen} contentLabel="View Roster" onRequestClose={this.hideRoster} className="event__mobile-roster" closeTimeoutMS={700} style={{ overlay: { background: null } }}>
					<div className="event__mobile-roster-header">
						<h5 className="event__mobile-roster-title">{this.state.event.name}</h5>
						<img src="/images/navigation/menu-close-button.svg" onClick={this.hideRoster} />
					</div>

					<div className="event__roster-content">
						<RosterList key={this.state.event._id} teams={this.state.teams} />
					</div>
				</Modal>

				<h6 className="event__detail-header">Date &amp; Location</h6>
				<p className="event__detail">{this.state.event.startDate}, in {this.state.event.location}</p>
				<h6 className="event__detail-header">Weigh-ins</h6>
				<p className="event__detail">{this.state.event.weighins}{this.state.event.alternateWeighins ? <span> or </span> : undefined}</p>
				{this.state.event.alternateWeighins ? <p className="event__detail">{this.state.event.alternateWeighins}</p> : undefined}
				<h6 className="event__detail-header">Divisions & Weight Classes</h6>
				{this.state.event.divisions.map((division, index) => {
					return (
						<ul key={index} className="event__detail-list-header">
							<li className="event__detail-list-item">{division.name} -- {division.weightClasses.map((weightClass, index, weightClasses) => {
								return (
									(index === weightClasses.length - 1 ? weightClass + ' (+' + division.allowance + ')' : weightClass + ', ')
								);
							})}</li>
						</ul>
					);
				})}
			</div>
		);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Event.propTypes = {
	event: PropTypes.object.isRequired,
	isLastEvent: PropTypes.bool.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
	// Meteor.subscribe('teams');
	//
	// const teams = Teams.find().fetch().map((team) => {
	//   return { ...team };
	// });

	return {
		//teams,
		isSidebarOpen: Session.get('isSidebarOpen')
	};
}, Event);
