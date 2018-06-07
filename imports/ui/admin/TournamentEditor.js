import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import swal from 'sweetalert2';

import { Tournaments } from '../../api/tournaments';

export class TournamentEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      location: '',
      startDate: '',
      endDate: '',
      weighins: '',
      alternateWeighins: '',
      division: '',
      weightClasses: '',
      allowance: 0,
      year: '',
      season: '',
      published: false,
      publishClass: 'button--unpublish',
      publishText: 'Unpublish'
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.onWeighinsChange = this.onWeighinsChange.bind(this);
    this.onAlternateWeighinsChange = this.onAlternateWeighinsChange.bind(this);
    this.onDivisionChange = this.onDivisionChange.bind(this);
    this.onAllowanceChange = this.onAllowanceChange.bind(this);
    this.onWeightClassesChange = this.onWeightClassesChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
    this.onSeasonChange = this.onSeasonChange.bind(this);
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

  onStartDateChange(e) {
    const startDate = e.target.value;
    this.setState({ startDate });
    this.props.call('tournaments.update', this.props.tournament._id, { startDate });
  }

  onEndDateChange(e) {
    const endDate = e.target.value;
    this.setState({ endDate });
    this.props.call('tournaments.update', this.props.tournament._id, { endDate });
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

  componentDidUpdate(prevProps, prevState) {
    const currTournamentId = this.props.tournament ? this.props.tournament._id : undefined;
    const prevTournamentId = prevProps.tournament ? prevProps.tournament._id : undefined;

    if (currTournamentId && currTournamentId !== prevTournamentId) {
      this.setState({
        name: this.props.tournament.name || '',
        location: this.props.tournament.location || '',
        startDate: this.props.tournament.startDate || '',
        endDate: this.props.tournament.endDate || '',
        weighins: this.props.tournament.weighins || '',
        alternateWeighins: this.props.tournament.alternateWeighins || '',
        division: this.props.tournament.division || '',
        weightClasses: this.props.tournament.weightClasses || '',
        allowance: this.props.tournament.allowance || '',
        year: this.props.tournament.year || '',
        season: this.props.tournament.season || '',
        published: this.props.tournament.published || '',
        publishClass: this.props.tournament.published ? 'button--unpublish' : 'button--publish',
        publishText: this.props.tournament.published ? 'Unpublish' : 'Publish'
      });
    }
  }

  render() {
    if (this.props.tournament) {
      return (
        <div className="editor">
          <input id="name" className="editor__title" value={this.state.name} placeholder="Untitled Tournament" onChange={this.onNameChange}/>
          <label className="editor__label">
            <p>Location</p>
            <input id="location" name="location" className="editor__field" value={this.state.location} placeholder="Location" onChange={this.onLocationChange}/>
          </label>
          <label className="editor__label">
            <p>Start Date</p>
            <input id="start-date" name="date" className="editor__field" value={this.state.startDate} placeholder="Start Date" onChange={this.onStartDateChange}/>
          </label>
          <label className="editor__label">
            <p>End Date</p>
            <input id="end-date" name="date" className="editor__field" value={this.state.endDate} placeholder="End Date" onChange={this.onEndDateChange}/>
          </label>
          <label className="editor__label">
            <p>Weigh-ins</p>
            <input id="weighins" name="weighins" className="editor__field" value={this.state.weighins} placeholder="Weigh-ins" onChange={this.onWeighinsChange}/>
          </label>
          <label className="editor__label">
            <p>Alternate Weigh-ins</p>
            <input id="alternateWeighins" name="alternateWeighins" className="editor__field" value={this.state.alternateWeighins} placeholder="Alternate Weigh-ins" onChange={this.onAlternateWeighinsChange}/>
          </label>
          <label className="editor__label">
            <p>Age Division</p>
            <input id="division" name="division" className="editor__field" value={this.state.division} placeholder="Age Division" onChange={this.onDivisionChange}/>
          </label>
          <label className="editor__label">
            <p>Weight Classes</p>
            <input id="weightClasses" name="weightClasses" className="editor__field" value={this.state.weightClasses} placeholder="Weight Classes" onChange={this.onWeightClassesChange}/>
          </label>
          <label className="editor__label">
            <p>Weight Allowance</p>
            <input id="allowance" name="allowance" className="editor__field" value={this.state.allowance} placeholder="Allowance" onChange={this.onAllowanceChange}/>
          </label>
          <label className="editor__label">
            <p>Year</p>
            <input id="year" name="year" className="editor__field" value={this.state.year} placeholder="Year" onChange={this.onYearChange}/>
          </label>
          <label className="editor__label">
            <p>Season</p>
            <input id="season" name="season" className="editor__field" value={this.state.season} placeholder="Season" onChange={this.onSeasonChange}/>
          </label>
        </div>
      );
    } else {
      return (
        <div className="editor">
          <p className="editor__message">{this.props.selectedTournamentId ? 'Tournament not found.' : 'Select or add a Tournament to get started.'}</p>
        </div>
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

export default createContainer(() => {
  const selectedTournamentId = Session.get('selectedTournamentId');

  return {
    selectedTournamentId,
    tournament: Tournaments.findOne(selectedTournamentId),
    call: Meteor.call,
    browserHistory
  };
}, TournamentEditor);
