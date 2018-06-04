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
    const staleIds = Session.get('multiselectedTournamentIds');   // current ids in multiselect list

    /*
     * After filtering tournaments, we need to refresh the list of multiselected tournaments.
     * This prevents users from accidentally showing, hiding, or deleting a tournament that
     * was previously selected, but is no longer visible (i.e., filtered out).
     */

    let freshIds = [];
    props.tournaments.forEach((tournament) => {
      if (staleIds.includes(tournament._id)) {
        freshIds.push(tournament._id);
      }
    });

    /*
     * Reset the selected tournament(s).
     */

    if (freshIds.length === 1) {
      Session.set('selectedTournamentId', freshIds[0]);
    }
    Session.set('multiselectedTournamentIds', freshIds);

    /*
     * Auto-update the selected tournament.
     *    - undefined if the tournament list is empty
     *    - the first and only tournament in the list
     *    - whichever tournament is marked as selected
     */

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
          selected: tournament._id === selectedTournamentId,
          multiselected: Session.get('multiselectedTournamentIds').includes(tournament._id)
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
          selected: tournament._id === selectedTournamentId,
          multiselected: Session.get('multiselectedTournamentIds').includes(tournament._id)
        }
      })
    };
  } else {
    return {
      tournaments: []
    };
  }
}, TournamentList);
