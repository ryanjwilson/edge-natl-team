import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';

import EmptyItem from './EmptyItem';
import Tournament from './Tournament';
import TournamentListHeader from './TournamentListHeader';
import { Tournaments } from '../../api/tournaments';

/**
 * A TournamentList component holds a list of Tournaments. Through the
 * TournamentListFilters component, this component is filterable and sortable.
 *
 * @param props - the initializing properties passed to this component
 */

export const TournamentList = (props) => {
  if (props.tournaments) {
    const staleIds = Session.get('multiselectedTournamentIds');

    // refresh multiselected tournaments after filtering to prevent accidentally
    // showing/hiding/deleting a tournament that was previously selected, but is
    // no longer visible in the list (i.e., filtered out).

    let freshIds = [];
    props.tournaments.forEach((tournament) => {
      if (staleIds.includes(tournament._id)) {
        freshIds.push(tournament._id);
      }
    });

    if (freshIds.length === 1) {
      Session.set('selectedTournamentId', freshIds[0]);
    }
    Session.set('multiselectedTournamentIds', freshIds);

    // update the selected tournament Session variable as needed.

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

  // return a TournamentList, which is comprised of a TournamentListHeader and
  // a list of Tournaments.

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

TournamentList.propTypes = {
  tournaments: PropTypes.array.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  Meteor.subscribe('tournaments');

  const selectedTournamentId = Session.get('selectedTournamentId');
  const showPublished = Session.get('showPublishedFilter');
  const showUnpublished = Session.get('showUnpublishedFilter');

  // conditionally query the tournaments collection based on the filter
  // selections made by the user.

  if (showPublished && showUnpublished) {   // both shown and hidden checkboxes are selected
    return {
      tournaments: Tournaments.find().fetch().map((tournament) => {
        return {
          ...tournament,
          selected: tournament._id === selectedTournamentId,
          multiselected: Session.get('multiselectedTournamentIds').includes(tournament._id)
        };
      })
    };
  } else if (showPublished || showUnpublished) {    // either the shown or hidden checkbox (not both) is selected
    return {
      tournaments: Tournaments.find({ published: showPublished }).fetch().map((tournament) => {
        return {
          ...tournament,
          selected: tournament._id === selectedTournamentId,
          multiselected: Session.get('multiselectedTournamentIds').includes(tournament._id)
        };
      })
    };
  } else {    // neither the shown or the hidden checkbox is selected
    return {
      tournaments: []
    };
  }
}, TournamentList);
