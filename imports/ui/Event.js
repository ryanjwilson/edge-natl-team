import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';

export const Event = (props) => {
  return (
    <div id="scheduled-tournament" className="schedule__event">
      <h5 className="schedule__event-title">{props.tournament.name}</h5>
      <h6 className="schedule__detail-header">Date &amp; Location</h6>
      <p className="schedule__detail">{props.tournament.startDate}, in {props.tournament.location}</p>
      <h6 className="schedule__detail-header">Weigh-ins</h6>
      <p className="schedule__detail">{props.tournament.weighins}{props.tournament.alternateWeighins ? <span className="schedule__bold schedule__italic"> or </span> : undefined}</p>
      {props.tournament.alternateWeighins ? <p className="schedule__detail">{props.tournament.alternateWeighins}</p> : undefined}
      <h6 className="schedule__detail-header">Divisions & Weight Classes</h6>
      {props.tournament.divisions.map((division, index) => {
        return (
          <ul key={index} className="schedule__detail-list-header">
            <li className="schedule__detail-list-item">{division.name} -- {division.weightClasses.map((weightClass, index, weightClasses) => {
              return (
                (index === weightClasses.length - 1 ? weightClass + (division.allowance > 0 ? ' (with a ' + division.allowance + ' lb. allowance)' : ' (no allowance)') : weightClass + ', ')
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
