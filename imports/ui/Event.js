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
      isRosterModalOpen: false
    };

    this.onApplyNow = this.onApplyNow.bind(this);
    this.showRosterModal = this.showRosterModal.bind(this);
    this.closeRosterModal = this.closeRosterModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {

  }

  onApplyNow() {
    Session.set('isApplicationOpen', true);
  }

  showRosterModal() {
    Session.set('isRosterOpen', true);
    this.setState({ isRosterModalOpen: true });
    disableBodyScroll(document.querySelector('.boxed-view__modal'));
  }

  closeRosterModal() {
    Session.set('isRosterOpen', false);
    this.setState({ isRosterModalOpen: false });
    enableBodyScroll(document.querySelector('.boxed-view__modal'));
  }

  render() {
    return (
      <div className={this.state.isLastEvent ? 'event event__bottom' : 'event'}>
        <div className="event__header">
          <h5 className="event__title">{this.state.event.name}</h5>
          <div className="event__roster-icon" onClick={this.showRosterModal}>
            <img src="/images/roster-button.svg"/>
            <span>ROSTER</span>
          </div>
        </div>

        <Modal appElement={document.getElementById('app')} isOpen={this.state.isRosterModalOpen} contentLabel="View Roster" onRequestClose={this.closeRosterModal} className="boxed-view__box" overlayClassName="boxed-view boxed-view--modal">
          <div className="boxed-view__header">
            <h5 className="boxed-view__title">{this.state.event.name}</h5>
            <img src="/images/navigation/menu-close-button.svg" onClick={this.closeRosterModal}/>
          </div>

          <div className="boxed-view__box-content">
            <RosterList key={this.state.event._id} teams={this.state.teams} divisions={this.state.event.divisions}/>
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
  return {
    isSidebarOpen: Session.get('isSidebarOpen')
  };
}, Event);
