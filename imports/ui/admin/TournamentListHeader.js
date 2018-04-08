import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

/*****************************************************************************/

const TournamentListHeader = (props) => {
  const onAddTournament = () => {
    props.meteorCall('tournaments.insert', (err, res) => {
      if (res) {
        props.Session.set('selectedTournamentId', res);
      }
    });
  };

  return (
    <div className="item-list__header">
      <button className="button" onClick={onAddTournament}>Add Tournament</button>
    </div>
  );
};

TournamentListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired
};

/*****************************************************************************/

export { TournamentListHeader };

export default createContainer(() => {
  return {
    meteorCall: Meteor.call,
    Session
  };
}, TournamentListHeader);
