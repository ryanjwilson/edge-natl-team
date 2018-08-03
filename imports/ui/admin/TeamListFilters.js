import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { createContainer } from 'meteor/react-meteor-data';
import { Tournaments } from '../../api/tournaments';

export class TeamListFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tournaments: props.tournaments,
      divisions: props.divisions,
      selectedTournament: '',
      selectedDivision: ''
    };

    // bind field listeners to this context. remaining listeners are bound
    // manually, as they take additional parameters.

    this.onTournamentSelect = this.onTournamentSelect.bind(this);
    this.onDivisionSelect = this.onDivisionSelect.bind(this);
  }

  // TODO - can this be better used in other components, rather than hacking together did/will mount/update?
  // TODO - will be depreciated. refactor?

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedTournament !== nextProps.selectedTournament) this.setState({ selectedTournament: nextProps.selectedTournament });
    if (this.props.selectedDivision !== nextProps.selectedDivision) this.setState({ selectedDivision: nextProps.selectedDivision });

    this.refreshTournaments(this.props.tournaments, nextProps.tournaments);
    this.refreshDivisions(this.props.divisions, nextProps.divisions);
  }

  refreshTournaments(oldTournaments, newTournaments) {
    if (oldTournaments.length !== newTournaments.length) {
      this.setState({ tournaments: newTournaments });
    } else {
      oldTournaments.some((tournament, index) => {
        if (tournament._id !== newTournaments[index]._id) {
          this.setState({ tournaments: newTournaments });

          return true;
        }
      });
    }
  }

  refreshDivisions(oldDivisions, newDivisions) {
    if (oldDivisions.length !== newDivisions.length) {
      this.setState({ divisions: newDivisions });
    } else {
      oldDivisions.some((division, index) => {
        if (division !== newDivisions[index]) {
          this.setState({ divisions: newDivisions });

          return true;
        }
      });
    }
  }

  onTournamentSelect(e) {
    const selectedTournament = (e.target.value.length > 0 ? e.target.value : undefined);
    const divisions = getDivisions(this.state.tournaments, selectedTournament);

    this.setState({ divisions, selectedTournament, selectedDivision: '', selectedWeightClass: '' });
    this.props.Session.set('selectedTournamentFilter', selectedTournament);
  }

  onDivisionSelect(e) {
    const selectedDivision = (e.target.value.length > 0 ? e.target.value : undefined);

    this.setState({ selectedDivision });
    this.props.Session.set('selectedDivisionFilter', selectedDivision);
  }

  render() {
    return (
      <div className="editor__dropdown-filter-group">
        <select className="editor__dropdown-menu" value={this.state.selectedTournament} onChange={this.onTournamentSelect}>
          <option key="-1" value="">--Tournament--</option>

          {/* TODO - allow for upcoming v. past tournament optgroups */}
          {/* TODO - allow for multi-select (would need to make selectedTournament(s) -- here and Session variable in main.js -- into an array) */}

          {this.state.tournaments.map((tournament, index) => {
            return (
              <option key={index} value={tournament._id}>{tournament.name}</option>
            );
          })}
        </select>
        <select className="editor__dropdown-menu" value={this.state.selectedDivision} onChange={this.onDivisionSelect}>
          <option key="-1" value="">--Division--</option>

          {/* TODO - allow for multi-select (would need to make selectedDivision(s) -- here and Session variable in main.js -- into an array) */}

          {this.state.divisions.map((division, index) => {
            return (
              <option key={index} value={division}>{division}</option>
            );
          })}
        </select>
      </div>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getTournaments = () => {
  return Tournaments.find({ published: true }).fetch().map((tournament) => {
    return { ...tournament };
  });
};

const getDivisions = (tournaments, selectedTournament) => {
  const divisions = [];

  if (selectedTournament) {
    tournaments.forEach((tournament) => {
      if (tournament._id === selectedTournament) {
        tournament.divisions.forEach((division) => {
          if (!divisions.includes(division.name)) divisions.push(division.name);
        });
      }
    });
  } else {
    tournaments.forEach((tournament) => {
      tournament.divisions.forEach((division) => {
        if (!divisions.includes(division.name)) divisions.push(division.name);
      });
    });
  }

  return divisions;
};

const isUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

const sortAscending = (a, b) => {
  return a - b;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

TeamListFilters.propTypes = {
  tournaments: PropTypes.array.isRequired,
  divisions: PropTypes.array.isRequired,
  selectedTournament: PropTypes.string,
  selectedDivision: PropTypes.string,
  Session: PropTypes.object.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  Meteor.subscribe('tournaments');

  const tournaments = getTournaments();
  const divisions = getDivisions(tournaments, undefined);
  const selectedTournament = Session.get('selectedTournamentFilter');
  const selectedDivision = Session.get('selectedDivisionFilter');

  return {
    tournaments,
    divisions,
    selectedTournament,
    selectedDivision,
    Session
  };
}, TeamListFilters);
