import React from 'react';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

/*****************************************************************************/

const Tournament = (props) => {
  return (
    <div onClick={() => props.Session.set('selectedTournamentId', props.tournament._id)}>
      <h5>{props.tournament.name || 'Untitled Tournament'}</h5>
      <p>{props.tournament.selected ? 'selected - ' : undefined}{props.tournament.date || 'Date'} &middot; {props.tournament.location || 'Location'} &middot; {props.tournament.division || 'Division'}</p>
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
