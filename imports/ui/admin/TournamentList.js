import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import EmptyItem from './EmptyItem';
import Tournament from './Tournament';
import TournamentListHeader from './TournamentListHeader';
import { Tournaments } from '../../api/tournaments';

export const TournamentList = (props) => {
  if (props.tournaments) {
    if (props.tournaments.length === 0) {
      Session.set('selectedTournamentId', undefined);
    } else if (props.tournaments.length === 1) {
      Session.set('selectedTournamentId', props.tournaments[0]._id);
    } else {
      if (props.tournaments.filter((tournament) => tournament._id === Session.get('selectedTournamentId')).length === 0) {
        Session.set('selectedTournamentId', undefined);
      }
    }
  }

  return (
    <div className="item-list">
      <TournamentListHeader/>

      {props.tournaments.length === 0 ? <EmptyItem label="Tournaments"/> : undefined}
      {props.tournaments.map((tournament) => {
        return <Tournament key={tournament._id} tournament={tournament}/>;
      })}
    </div>
  );
};

TournamentList.propTypes = {
  tournaments: PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedTournamentId = Session.get('selectedTournamentId');
  const showPublished = Session.get('showPublished');
  const showUnpublished = Session.get('showUnpublished');

  Meteor.subscribe('tournaments');

  if (showPublished && showUnpublished) {
    return {
      tournaments: Tournaments.find().fetch().map((tournament) => {
        return {
          ...tournament,
          selected: tournament._id === selectedTournamentId
        };
      })
    };
  } else if (showPublished || showUnpublished) {
    return {
      tournaments: Tournaments.find({
        published: showPublished
      }).fetch().map((tournament) => {
        return {
          ...tournament,
          selected: tournament._id === selectedTournamentId
        }
      })
    };
  } else {
    return {
      tournaments: []
    };
  }
}, TournamentList);
