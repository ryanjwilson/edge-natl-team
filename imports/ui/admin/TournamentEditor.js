import moment from 'moment';
import React from 'react';
import swal from 'sweetalert2';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';

import { Tournaments } from '../../api/tournaments';

/**
 * A TournamentEditor component provides fields to enter tournament details to
 * be later displayed on the public Schedule.
 */

export class TournamentEditor extends React.Component {

  /**
   * Constructs a reactive TournamentEditor component.
   *
   * @param props - the initializing properties passed to this component
   */

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      location: '',
      startDate: '',
      endDate: '',
      weighins: '',
      alternateWeighins: '',
      divisions: [{
        name: '',
        weightClasses: [],
        allowance: '',
        teams: ''
      }],
      published: false,
      publishClass: 'button--unpublish',
      publishText: 'Unpublish',
      year: '',
      season: ''
    };

    // bind field listeners to this context. remaining listeners are bound
    // manually, as they take additional parameters.

    this.onNameChange = this.onNameChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.onWeighinsChange = this.onWeighinsChange.bind(this);
    this.onAlternateWeighinsChange = this.onAlternateWeighinsChange.bind(this);
  }

  /**
   * Refresh the component state when it is mounted.
   */

  componentWillMount() {
    if (this.props.tournament) {
      this.setState({ ...this.props.tournament });
    }
  }

  /**
   * Refresh the component state when it is updated.
   *
   * @param prevProps - the previous set of properties passed to this component
   * @param prevState - the previous state of this component
   */

  componentDidUpdate(prevProps, prevState) {
    const currTournamentId = this.props.tournament ? this.props.tournament._id : undefined;
    const prevTournamentId = prevProps.tournament ? prevProps.tournament._id : undefined;

    // update state unless the current and previous tournaments are the same

    if (currTournamentId && currTournamentId !== prevTournamentId) {
      this.setState({ ...this.props.tournament });
    }
  }

  /**
   * Adds a division to this event, which entails adding a division name,
   * weight classes for that division, and a weight allowance for those weight
   * classes.
   *
   * @param index - the index at which the division should be added
   */

  onAddDivision(index) {
    const divisions = this.state.divisions;

    divisions.splice(index + 1, 0, {
      name: '',
      weightClasses: [],
      allowance: '',
      teams: 1
    });
    this.setState({ divisions });
    this.props.call('tournaments.update', this.props.tournament._id, { divisions });
  }

  /**
   * Deletes a division from this event, which entails removing a division name,
   * weight classes for that division, and a weight allowance for those weight
   * classes.
   *
   * @param index - the index at which the division should be added
   */

  onDeleteDivision(index) {
    const divisions = this.state.divisions;

    divisions.splice(index, 1);
    this.setState({ divisions });
    this.props.call('tournaments.update', this.props.tournament._id, { divisions });
  }

  /**
   * Updates the name of this tournament.
   *
   * @param e - the change event
   */

  onNameChange(e) {
    const name = e.target.value;

    this.setState({ name });
    this.props.call('tournaments.update', this.props.tournament._id, { name });
  }

  /**
   * Updates the location of this tournament.
   *
   * @param e - the change event
   */

  onLocationChange(e) {
    const location = e.target.value;

    this.setState({ location });
    this.props.call('tournaments.update', this.props.tournament._id, { location });
  }

  /**
   * Updates the start date of this tournament.
   *
   * @param e - the change event
   */

  onStartDateChange(e) {
    const startDate = e.target.value;

    this.setState({ startDate });
    this.props.call('tournaments.update', this.props.tournament._id, { startDate });
  }

  /**
   * Updates the end date of this tournament.
   *
   * @param e - the change event
   */

  onEndDateChange(e) {
    const endDate = e.target.value;

    this.setState({ endDate });
    this.props.call('tournaments.update', this.props.tournament._id, { endDate });
  }

  /**
   * Updates the weigh-ins for this tournament.
   *
   * @param e - the change event
   */

  onWeighinsChange(e) {
    const weighins = e.target.value;

    this.setState({ weighins });
    this.props.call('tournaments.update', this.props.tournament._id, { weighins });
  }

  /**
   * Updates the alternate weigh-ins for this tournament.
   *
   * @param e - the change event
   */

  onAlternateWeighinsChange(e) {
    const alternateWeighins = e.target.value;

    this.setState({ alternateWeighins });
    this.props.call('tournaments.update', this.props.tournament._id, { alternateWeighins });
  }

  /**
   * Updates a division name for this tournament.
   *
   * @param index - the index of the division
   * @param e - the change event
   */

  onDivisionChange(index, e) {
    const divisions = this.state.divisions;

    divisions[index].name = e.target.value;
    this.setState({ divisions });
    this.props.call('tournaments.update', this.props.tournament._id, { divisions });
  }

  /**
   * Updates the weight classes of a division for this tournament.
   *
   * @param index - the index of the division
   * @param e - the change event
   */

  onWeightClassesChange(index, e) {
    const divisions = this.state.divisions;
    const weightClasses = e.target.value;

    divisions[index].weightClasses = weightClasses.replace(/\s/g,'').split(',');
    this.setState({ divisions });
    this.props.call('tournaments.update', this.props.tournament._id, { divisions });
  }

  /**
   * Updates the weight allowance of a division for this tournament.
   *
   * @param index - the index of the division
   * @param e - the change event
   */

  onAllowanceChange(index, e) {
    const divisions = this.state.divisions;
    const allowance = Number(e.target.value) >= 0 ? Number(e.target.value) : 0;

    divisions[index].allowance = allowance;
    this.setState({ divisions });
    this.props.call('tournaments.update', this.props.tournament._id, { divisions });
  }

  /**
   * Updates the number of teams being entered per division for this tournament.
   *
   * @param index - the index of the division
   * @param e - the change event
   */

  onTeamsChange(index, e) {
    const divisions = this.state.divisions;
    const teams = parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 1;

    divisions[index].teams = teams;
    this.setState({ divisions });
    this.props.call('tournaments.update', this.props.tournament._id, { divisions });
  }

  /**
   * Renders this component to the browser.
   *
   * @return the JSX markup
   */

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

          {this.state.divisions.map((division, index, divisions) => {
            return (
              <div id="division-group" key={index}>
                <label className="editor__label">
                  {index === 0 ?
                    <p className="editor__dynamic-label top-label">Age Division <img className="editor__add" src="/images/add.svg" onClick={this.onAddDivision.bind(this, index)}/></p> :
                    <p className="editor__dynamic-label top-label">Age Division <img className="editor__add" src="/images/add.svg" onClick={this.onAddDivision.bind(this, index)}/> <img className="editor__delete" src="/images/delete.svg" onClick={this.onDeleteDivision.bind(this, index)}/></p>
                  }
                  <input id="division" name="division" className="editor__field" value={this.state.divisions[index].name} placeholder="Age Division" onChange={this.onDivisionChange.bind(this, index)}/>
                </label>
                <label className="editor__label">
                  <p>Weight Classes</p>
                  <input id="weightClasses" name="weightClasses" className="editor__field" value={this.state.divisions[index].weightClasses} placeholder="Weight Classes" onChange={this.onWeightClassesChange.bind(this, index)}/>
                </label>
                <label className="editor__label">
                  <p>Weight Allowance</p>
                  <input id="allowance" name="allowance" type="number" min="0" step="0.1" className="editor__field" value={this.state.divisions[index].allowance} placeholder="Allowance" onChange={this.onAllowanceChange.bind(this, index)}/>
                </label>
                <label className="editor__label">
                  <p>Teams Entered</p>
                  <input id="teams" name="teams" type="number" min="1" className={index === divisions.length - 1 ? 'editor__field editor__bottom-field' : 'editor__field'} value={this.state.divisions[index].teams} placeholder="Teams Entered" onChange={this.onTeamsChange.bind(this, index)}/>
                </label>
              </div>
            );
          })}
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

TournamentEditor.propTypes = {
  tournament: PropTypes.object,
  selectedTournamentId: PropTypes.string,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  const selectedTournamentId = Session.get('selectedTournamentId');

  return {
    selectedTournamentId,
    tournament: Tournaments.findOne(selectedTournamentId),
    call: Meteor.call,
    browserHistory
  };
}, TournamentEditor);
