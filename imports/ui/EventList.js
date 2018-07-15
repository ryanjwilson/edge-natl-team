import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';

import { Event } from './Event';
import { Tournaments } from '../api/tournaments';

export class EventList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tournaments: props.tournaments
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tournaments.length !== nextProps.tournaments.length) {
      this.setState({ tournaments: nextProps.tournaments });
    } else {
      this.props.tournaments.some((tournament, index) => {
        if (tournament._id !== nextProps.tournaments[index]._id) {
          this.setState({ tournaments: nextProps.tournaments });

          return true;
        }
      });
    }
  }

  render() {
    return (
      <div className="schedule__event-list">
        {this.state.tournaments.map((tournament) => {
          return (
            <Event key={tournament._id} tournament={tournament}/>
          );
        })}
      </div>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

EventList.propTypes = {
  tournaments: PropTypes.array.isRequired
  // selectedTournamentId: PropTypes.string,
  // call: PropTypes.func.isRequired,
  // browserHistory: PropTypes.object.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  Meteor.subscribe('tournaments');

  const selectedTournamentId = Session.get('selectedTournamentId');

  return {
    tournaments: Tournaments.find({ published: true }).fetch().map((tournament) => {
      return { ...tournament };
    })
    // selectedTournamentId,
    // tournament: Tournaments.findOne(selectedTournamentId),
    // call: Meteor.call,
    // browserHistory
  };
}, EventList);
