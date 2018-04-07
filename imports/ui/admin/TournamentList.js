import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import EmptyItem from './EmptyItem';
import Tournament from './Tournament';
import TournamentListHeader from './TournamentListHeader';

import { Tournaments } from '../../api/tournaments';

/*****************************************************************************/

const TournamentList = (props) => {
  return (
    <div>
      <TournamentListHeader/>

      {props.tournaments.length === 0 ? <EmptyItem label="Tournament"/> : undefined}

      {props.tournaments.map((tournament) => {
        return <Tournament key={tournament._id} tournament={tournament}/>;
      })}

      TournamentList {props.tournaments.length}
    </div>
  );
};

TournamentList.propTypes = {
  tournaments: PropTypes.array.isRequired
};

/*****************************************************************************/

export { TournamentList };

export default createContainer(() => {
  const selectedTournamentId = Session.get('selectedTournamentId');

  Meteor.subscribe('tournaments');

  return {
    tournaments: Tournaments.find().fetch().map((tournament) => {
      return {
        ...tournament,
        selected: tournament._id === selectedTournamentId
      };
    })
  };
}, TournamentList);
