import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';

export const Event = (props) => {
  const onApplyNow = () => {
    Session.set('isApplicationOpen', true);
  };

  return (
    <div className={props.bottom ? 'event event__bottom' : 'event'}>
      <div className="event__header">
        <h5 className="event__title">{props.tournament.name}</h5>
        <img src="/images/roster.svg"/>
      </div>
      <h6 className="event__detail-header">Date &amp; Location</h6>
      <p className="event__detail">{props.tournament.startDate}, in {props.tournament.location}</p>
      <h6 className="event__detail-header">Weigh-ins</h6>
      <p className="event__detail">{props.tournament.weighins}{props.tournament.alternateWeighins ? <span> or </span> : undefined}</p>
      {props.tournament.alternateWeighins ? <p className="event__detail">{props.tournament.alternateWeighins}</p> : undefined}
      <h6 className="event__detail-header">Divisions & Weight Classes</h6>
      {props.tournament.divisions.map((division, index) => {
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Event.propTypes = {
  tournament: PropTypes.object.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  return {
    isSidebarOpen: Session.get('isSidebarOpen')
  };
}, Event);
