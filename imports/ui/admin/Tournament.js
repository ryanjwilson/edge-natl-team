import React from 'react';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

/*****************************************************************************/

const Tournament = (props) => {
  const className = props.tournament.selected ? 'item item--selected' : 'item';

  return (
    <div className={className} onClick={() => props.Session.set('selectedTournamentId', props.tournament._id)}>
      <h5 className="item__title">{props.tournament.name || 'Untitled Tournament'}</h5>
      <p className="item__subtitle">{props.tournament.date || 'Date'} &middot; {props.tournament.location || 'Location'} &middot; {props.tournament.division || 'Division'}</p>
    </div>
  );
};

Tournament.propTypes = {
  tournament: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

/*****************************************************************************/

export { Tournament };

export default createContainer(() => {
  return {
    Session
  };
}, Tournament);
