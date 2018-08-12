import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';

import { Event } from './Event';
import { Teams } from '../api/teams';
import { Tournaments } from '../api/tournaments';

export class EventList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tournaments: props.tournaments,
      teams: props.teams
    }

    this.onAppyNow = this.onApplyNow.bind(this);
    this.scrollToApplication = this.scrollToApplication.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.teams.length !== nextProps.teams.length) {
      this.setState({ teams: nextProps.teams });
    } else {
      this.props.teams.some((team, index) => {
        if (team._id !== nextProps.teams[index]._id) {
          this.setState({ teams: nextProps.teams });

          return true;
        }
      });
    }

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

  onApplyNow() {
    Session.set('isApplicationOpen', true);
  }

  scrollToApplication() {
    document.querySelector('#wrestler-application').scrollIntoView({
      //alignTop: true,
      behavior: 'smooth'
    });
  }

  render() {
    return (
      <div className="container container__schedule">
        <div className="container__header">
          <h5 className="container__title">Upcoming Duals</h5>
          <button className="container__title" onClick={this.scrollToApplication}>APPLY NOW</button>
        </div>

        <div className="container__content">
          {this.state.tournaments.length === 0 ? <p className="empty-item">There are no Upcoming Duals to display.</p> : undefined}
          {this.state.tournaments.map((tournament, index, tournaments) => {
            return (
              <Event key={tournament._id} event={tournament} teams={this.state.teams.filter((team) => team.tournament._id === tournament._id)} isLastEvent={index === tournaments.length - 1}/>
            );
          })}
        </div>
      </div>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

EventList.propTypes = {
  tournaments: PropTypes.array.isRequired,
  teams: PropTypes.array.isRequired
  // selectedTournamentId: PropTypes.string,
  // call: PropTypes.func.isRequired,
  // browserHistory: PropTypes.object.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  Meteor.subscribe('tournaments');
  Meteor.subscribe('teams');

  // const selectedTournamentId = Session.get('selectedTournamentId');

  return {
    tournaments: Tournaments.find({ published: true }).fetch().map((tournament) => {
      return { ...tournament };
    }),
    teams: Teams.find().fetch().map((team) => {
      return { ...team };
    })
  };
}, EventList);
