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
 * A TournamentList component renders a list of Tournament components.
 */

export class TournamentList extends React.Component {

  /**
   * Initializes a TournamentList component.
   *
   * @param props - the properties with which this component is initialized
   */

  constructor(props) {
    super(props);

    this.state = {
      tournaments: props.tournaments
    };
  }

  /**
   * Updates the component state when new properties are received.
   *
   * @param nextProps - the new properties with which to update the state
   */

  componentWillReceiveProps(nextProps) {
    if (this.props.tournaments.length !== nextProps.tournaments.length) {
      this.setState({ tournaments: nextProps.tournaments });
    } else {
      this.props.tournaments.some((tournament, index) => {
        if (!isEquivalent(tournament, nextProps.tournaments[index])) {
          this.setState({ tournaments: nextProps.tournaments });
          return true;
        }
      });
    }

    refreshTournamentIds(nextProps.tournaments);
  }

  /**
   * Renders this component to the page.
   *
   * @return the JSX for this component
   */

  render() {
    return (
      <div className="item-list">
        <TournamentListHeader/>

        {this.state.tournaments.length === 0 ? <EmptyItem label="Tournaments"/> : undefined}
        {this.state.tournaments.map((tournament) => {
          return <Tournament key={tournament._id} tournament={tournament}/>;
        })}
      </div>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Refreshes the Session variables responsible for storing which tournaments
 * are currently selected. This is done to reflect changes in list filtering.
 *
 * @param tournaments - the original list of tournaments before filtering
 */

const refreshTournamentIds = (tournaments) => {
  if (tournaments) {
    let freshIds = [];
    const staleIds = Session.get('multiselectedTournamentIds');

    tournaments.forEach((tournament) => {
      if (staleIds.includes(tournament._id)) {
        freshIds.push(tournament._id);
      }
    });

    if (freshIds.length === 1) {
      Session.set('selectedTournamentId', freshIds[0]);
    }
    Session.set('multiselectedTournamentIds', freshIds);

    if (tournaments.length === 0) {
      Session.set('selectedTournamentId', undefined);
    } else if (tournaments.length === 1) {
      Session.set('selectedTournamentId', tournaments[0]._id);
    } else {
      if (tournaments.filter((tournament) => tournament._id === Session.get('selectedTournamentId')).length === 0) {
        Session.set('selectedTournamentId', undefined);
      }
    }
  }
};

/**
 * Determines if two tournaments are logically equivalent.
 *
 * @param prevTournament - the previous tournament
 * @param nextTournament - the next tournament
 * @return true if the tournaments are logically equivalent; false otherwise
 */

const isEquivalent = (prevTournament, nextTournament) => {
  const prevProps = Object.getOwnPropertyNames(prevTournament);
  const nextProps = Object.getOwnPropertyNames(nextTournament);

  if (prevProps.length !== nextProps.length) {
    return false;
  }

  for (let i = 0; i < prevProps.length; i++) {
    const propName = prevProps[i];

    if (prevTournament[propName] !== nextTournament[propName]) {
      return false;
    }
  }

  return true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

TournamentList.propTypes = {
  tournaments: PropTypes.array.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  Meteor.subscribe('tournaments');

  const selectedTournamentId = Session.get('selectedTournamentId');
  const multiselectedTournamentIds = Session.get('multiselectedTournamentIds');
  const showPublished = Session.get('showPublishedFilter');
  const showUnpublished = Session.get('showUnpublishedFilter');

  // conditionally query the tournaments collection based on the filter
  // selections made by the user.

  if (showPublished && showUnpublished) {
    return {
      tournaments: Tournaments.find().fetch().map((tournament) => {   // show all tournaments
        return {
          ...tournament,
          selected: tournament._id === selectedTournamentId,
          multiselected: multiselectedTournamentIds.includes(tournament._id)
        };
      })
    };
  } else if (showPublished || showUnpublished) {
    return {
      tournaments: Tournaments.find({
        published: showPublished
      }).fetch().map((tournament) => {    // show only published or unpublished tournaments
        return {
          ...tournament,
          selected: tournament._id === selectedTournamentId,
          multiselected: multiselectedTournamentIds.includes(tournament._id)
        };
      })
    };
  } else {
    return {
      tournaments: []
    };
  }
}, TournamentList);
