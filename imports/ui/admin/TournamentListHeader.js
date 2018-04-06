import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

/*****************************************************************************/

const TournamentListHeader = (props) => {
  return (
    <div>
      <button onClick={() => props.meteorCall('tournaments.insert')}>Add Tournament</button>
    </div>
  );
};

TournamentListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired
};

/*****************************************************************************/

export { TournamentListHeader };

export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  };
}, TournamentListHeader);
