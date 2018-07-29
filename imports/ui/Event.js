import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';

export class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: props.event,
      isLastEvent: props.isLastEvent
    };

    this.onApplyNow = this.onApplyNow.bind(this);
  }

  componentWillReceiveProps(nextProps) {

  }

  onApplyNow() {
    Session.set('isApplicationOpen', true);
  }

  render() {
    return (
      <div className={this.state.isLastEvent ? 'event event__bottom' : 'event'}>
        <div className="event__header">
          <h5 className="event__title">{this.state.event.name}</h5>
          <div className="event__roster-icon">
            <img src="/images/roster-button.svg"/>
            <span>ROSTER</span>
          </div>
        </div>
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
