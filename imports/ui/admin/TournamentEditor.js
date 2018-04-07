import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';

import { Tournaments } from '../../api/tournaments';

/*****************************************************************************/

class TournamentEditor extends React.Component {
  constructor(props) {
    super(props);

    this.onNameChange = this.onNameChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onWeighinsChange = this.onWeighinsChange.bind(this);
    this.onAlternateWeighinsChange = this.onAlternateWeighinsChange.bind(this);
    this.onDivisionChange = this.onDivisionChange.bind(this);
    this.onWeightClassesChange = this.onWeightClassesChange.bind(this);
    this.onAllowanceChange = this.onAllowanceChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
    this.onSeasonChange = this.onSeasonChange.bind(this);
  }

  onNameChange(e) {
    this.props.call('tournaments.update', this.props.tournament._id, {
      name: e.target.value
    });
  }

  onLocationChange(e) {
    this.props.call('tournaments.update', this.props.tournament._id, {
      location: e.target.value
    });
  }

  onDateChange(e) {
    this.props.call('tournaments.update', this.props.tournament._id, {
      date: e.target.value
    });
  }

  onWeighinsChange(e) {
    this.props.call('tournaments.update', this.props.tournament._id, {
      weighins: e.target.value
    });
  }

  onAlternateWeighinsChange(e) {
    this.props.call('tournaments.update', this.props.tournament._id, {
      alternateWeighins: e.target.value
    });
  }

  onDivisionChange(e) {
    this.props.call('tournaments.update', this.props.tournament._id, {
      division: e.target.value
    });
  }

  onWeightClassesChange(e) {
    this.props.call('tournaments.update', this.props.tournament._id, {
      weightClasses: e.target.value
    });
  }

  onAllowanceChange(e) {
    this.props.call('tournaments.update', this.props.tournament._id, {
      allowance: e.target.value
    });
  }

  onYearChange(e) {
    this.props.call('tournaments.update', this.props.tournament._id, {
      year: e.target.value
    });
  }

  onSeasonChange(e) {
    this.props.call('tournaments.update', this.props.tournament._id, {
      season: e.target.value
    });
  }

  render() {
    if (this.props.tournament) {
      return (
        <div>
          <input value={this.props.tournament.name} placeholder="Untitled Tournament" onChange={this.onNameChange}/>
          <input value={this.props.tournament.location} placeholder="Location" onChange={this.onLocationChange}/>
          <input value={this.props.tournament.date} placeholder="Date" onChange={this.onDateChange}/>
          <input value={this.props.tournament.weighins} placeholder="Weigh-ins" onChange={this.onWeighinsChange}/>
          <input value={this.props.tournament.alternateWeighins} placeholder="Alternate Weigh-ins" onChange={this.onAlternateWeighinsChange}/>
          <input value={this.props.tournament.division} placeholder="Age Division" onChange={this.onDivisionChange}/>
          <input value={this.props.tournament.weightClasses} placeholder="Weight Classes" onChange={this.onWeightClassesChange}/>
          <input value={this.props.tournament.allowance} placeholder="Allowance" onChange={this.onAllowanceChange}/>
          <input value={this.props.tournament.year} placeholder="Year" onChange={this.onYearChange}/>
          <input value={this.props.tournament.season} placeholder="Season" onChange={this.onSeasonChange}/>
          <button>Publish</button>
          <button>Delete</button>
        </div>
      );
    } else {
      return (
        <p>{this.props.selectedTournamentId ? 'Tournament not found.' : 'Select or add a Tournament to get started.'}</p>
      );
    }
  }
}

TournamentEditor.propTypes = {
  tournament: PropTypes.object,
  selectedTournamentId: PropTypes.string
};

/*****************************************************************************/

export { TournamentEditor };

export default createContainer(() => {
  const selectedTournamentId = Session.get('selectedTournamentId');

  return {
    selectedTournamentId,
    tournament: Tournaments.findOne(selectedTournamentId),
    call: Meteor.call
  };
}, TournamentEditor);
