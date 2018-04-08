import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import { Tournaments } from '../../api/tournaments';

/*****************************************************************************/

class TournamentEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      location: '',
      date: '',
      weighins: '',
      alternateWeighins: '',
      division: '',
      weightClasses: '',
      allowance: 0,
      year: '',
      season: '',
      readyToPublish: false
    };

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
    this.onDelete = this.onDelete.bind(this);
    this.onToggleStatus = this.onToggleStatus.bind(this);
  }

  onNameChange(e) {
    const name = e.target.value;
    this.setState({ name });
    this.props.call('tournaments.update', this.props.tournament._id, { name });
  }

  onLocationChange(e) {
    const location = e.target.value;
    this.setState({ location });
    this.props.call('tournaments.update', this.props.tournament._id, { location });
  }

  onDateChange(e) {
    const date = e.target.value;
    this.setState({ date });
    this.props.call('tournaments.update', this.props.tournament._id, { date });
  }

  onWeighinsChange(e) {
    const weighins = e.target.value;
    this.setState({ weighins });
    this.props.call('tournaments.update', this.props.tournament._id, { weighins });
  }

  onAlternateWeighinsChange(e) {
    const alternateWeighins = e.target.value;
    this.setState({ alternateWeighins });
    this.props.call('tournaments.update', this.props.tournament._id, { alternateWeighins });
  }

  onDivisionChange(e) {
    const division = e.target.value;
    this.setState({ division });
    this.props.call('tournaments.update', this.props.tournament._id, { division });
  }

  onWeightClassesChange(e) {
    const weightClasses = e.target.value;
    this.setState({ weightClasses });
    this.props.call('tournaments.update', this.props.tournament._id, { weightClasses });
  }

  onAllowanceChange(e) {
    const allowance = e.target.value;
    this.setState({ allowance });
    this.props.call('tournaments.update', this.props.tournament._id, { allowance });
  }

  onYearChange(e) {
    const year = e.target.value;
    this.setState({ year });
    this.props.call('tournaments.update', this.props.tournament._id, { year });
  }

  onSeasonChange(e) {
    const season = e.target.value;
    this.setState({ season });
    this.props.call('tournaments.update', this.props.tournament._id, { season });
  }

  onToggleStatus() {
    const readyToPublish = !this.props.tournament.readyToPublish;
    this.setState({ readyToPublish });
    this.props.call('tournaments.update', this.props.tournament._id, { readyToPublish });
  }

  onDelete() {
    this.props.call('tournaments.remove', this.props.tournament._id);
    this.props.browserHistory.push('/dashboard');
  }

  componentDidUpdate(prevProps, prevState) {
    const currTournamentId = this.props.tournament ? this.props.tournament._id : undefined;
    const prevTournamentId = prevProps.tournament ? prevProps.tournament._id : undefined;

    if (currTournamentId && currTournamentId !== prevTournamentId) {
      this.setState({
        name: this.props.tournament.name,
        location: this.props.tournament.location,
        date: this.props.tournament.date,
        weighins: this.props.tournament.weighins,
        alternateWeighins: this.props.tournament.alternateWeighins,
        division: this.props.tournament.division,
        weightClasses: this.props.tournament.weightClasses,
        allowance: this.props.tournament.allowance,
        year: this.props.tournament.year,
        season: this.props.tournament.season,
        publish: this.props.tournament.publish
      });
    }
  }

  render() {
    if (this.props.tournament) {
      return (
        <div>
          <input id="name" value={this.state.name} placeholder="Untitled Tournament" onChange={this.onNameChange}/>
          <input id="location" value={this.state.location} placeholder="Location" onChange={this.onLocationChange}/>
          <input id="date" value={this.state.date} placeholder="Date" onChange={this.onDateChange}/>
          <input id="weighins" value={this.state.weighins} placeholder="Weigh-ins" onChange={this.onWeighinsChange}/>
          <input id="alternateWeighins" value={this.state.alternateWeighins} placeholder="Alternate Weigh-ins" onChange={this.onAlternateWeighinsChange}/>
          <input id="division" value={this.state.division} placeholder="Age Division" onChange={this.onDivisionChange}/>
          <input id="weightClasses" value={this.state.weightClasses} placeholder="Weight Classes" onChange={this.onWeightClassesChange}/>
          <input id="allowance" value={this.state.allowance} placeholder="Allowance" onChange={this.onAllowanceChange}/>
          <input id="year" value={this.state.year} placeholder="Year" onChange={this.onYearChange}/>
          <input id="season" value={this.state.season} placeholder="Season" onChange={this.onSeasonChange}/>
          <button id="staging-button" onClick={this.onToggleStatus}>{this.state.readyToPublish ? 'Unstage' : 'Stage'}</button>
          <button id="delete-button" onClick={this.onDelete}>Delete</button>
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
  selectedTournamentId: PropTypes.string,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired
};

/*****************************************************************************/

export { TournamentEditor };

export default createContainer(() => {
  const selectedTournamentId = Session.get('selectedTournamentId');

  return {
    selectedTournamentId,
    tournament: Tournaments.findOne(selectedTournamentId),
    call: Meteor.call,
    browserHistory
  };
}, TournamentEditor);
