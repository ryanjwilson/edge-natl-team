import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import swal from 'sweetalert';

import { Tournaments } from '../../api/tournaments';

///////////////////////////////////////////////////////////////////////////////

export class TournamentEditor extends React.Component {
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
      published: false,
      publishClass: 'button--unpublish',
      publishText: 'Unpublish'
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onWeighinsChange = this.onWeighinsChange.bind(this);
    this.onAlternateWeighinsChange = this.onAlternateWeighinsChange.bind(this);
    this.onDivisionChange = this.onDivisionChange.bind(this);
    this.onAllowanceChange = this.onAllowanceChange.bind(this);
    this.onWeightClassesChange = this.onWeightClassesChange.bind(this);
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

  onAllowanceChange(e) {
    const allowance = e.target.value;
    this.setState({ allowance });
    this.props.call('tournaments.update', this.props.tournament._id, { allowance });
  }

  onWeightClassesChange(e) {
    const weightClasses = e.target.value;
    this.setState({ weightClasses });
    this.props.call('tournaments.update', this.props.tournament._id, { weightClasses });
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
    const published = !this.props.tournament.published;
    const buttonText = published ? "Publish" : "Unpublish";
    const cssClass = published ? "button--publish" : "button--unpublish";
    const message = published ? "This tournament will become visible to the public!" : "This tournament will no longer be visible to the public!";

    swal({
      title: "Are you sure?",
      text: message,
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancel",
          value: null,
          visible: true,
          className: "button--cancel",
          closeModal: true
        },
        confirm: {
          text: buttonText,
          value: true,
          visible: true,
          className: cssClass,
          closeModal: true
        }
      }
    }).then((response) => {
      if (response) {
        const publishClass = !published ? 'button--publish' : 'button--unpublish';
        const publishText = !published ? 'Publish' : 'Unpublish';

        this.setState({ published, publishClass, publishText });
        this.props.call('tournaments.update', this.props.tournament._id, { published });
      }
    });
  }

  onDelete() {
    swal({
      title: "Are you sure?",
      text: "After deleting, you cannot undo this action!",
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancel",
          value: null,
          visible: true,
          className: "button--cancel",
          closeModal: true
        },
        confirm: {
          text: "Delete",
          value: true,
          visible: true,
          className: "button--delete",
          closeModal: true
        }
      }
    }).then((response) => {
      if (response) {
        this.props.call('tournaments.remove', this.props.tournament._id);
        this.props.browserHistory.push('/dashboard');
      }
    });
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
        published: this.props.tournament.published,
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
            <p>Date</p>
            <input id="date" name="date" className="editor__field" value={this.state.date} placeholder="Date" onChange={this.onDateChange}/>
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
            <p>Weight Allowance</p>
            <input id="allowance" name="allowance" className="editor__field" value={this.state.allowance} placeholder="Allowance" onChange={this.onAllowanceChange}/>
          </label>
          <label className="editor__label">
            <p>Weight Classes</p>
            <input id="weightClasses" name="weightClasses" className="editor__field" value={this.state.weightClasses} placeholder="Weight Classes" onChange={this.onWeightClassesChange}/>
          </label>
          <label className="editor__label">
            <p>Year</p>
            <input id="year" name="year" className="editor__field" value={this.state.year} placeholder="Year" onChange={this.onYearChange}/>
          </label>
          <label className="editor__label">
            <p>Season</p>
            <input id="season" name="season" className="editor__field" value={this.state.season} placeholder="Season" onChange={this.onSeasonChange}/>
          </label>
          <div className="action-group">
            <button id="publish-button" className={"button button--editor " + this.state.publishClass} onClick={this.onToggleStatus}>{this.state.publishText}</button>
            <button id="delete-button" className="button button--editor button--delete" onClick={this.onDelete}>Delete</button>
          </div>
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

///////////////////////////////////////////////////////////////////////////////

TournamentEditor.propTypes = {
  tournament: PropTypes.object,
  selectedTournamentId: PropTypes.string,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired
};

///////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  const selectedTournamentId = Session.get('selectedTournamentId');

  return {
    selectedTournamentId,
    tournament: Tournaments.findOne(selectedTournamentId),
    call: Meteor.call,
    browserHistory
  };
}, TournamentEditor);
