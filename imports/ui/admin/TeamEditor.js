import moment from 'moment';
import React from 'react';
import swal from 'sweetalert2';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';

import { Teams } from '../../api/teams';
import { Wrestlers } from '../../api/wrestlers';

/**
 * A TournamentEditor component provides fields to enter tournament details to
 * be later displayed on the public Schedule.
 */

export class TeamEditor extends React.Component {

  /**
   * Constructs a reactive TournamentEditor component.
   *
   * @param props - the initializing properties passed to this component
   */

  constructor(props) {
    super(props);

    this.state = {
      name: props.team ? props.team.name : '',
      tournament: {
        _id: props.team ? props.team.tournament._id : '',
        name: props.team ? props.team.tournament.name : '',
        division: {
          name: props.team ? props.team.tournament.division.name : ''
        }
      },
      roster: props.team ? props.team.roster : [],
      roles: [ 'Starter', 'Split' ],
      statuses: [ 'Open', 'Pending', 'Confirmed' ],
      published: props.team ? props.team.published : false
    };

    // bind field listeners to this context. remaining listeners are bound
    // manually, as they take additional parameters.

    this.onNameChange = this.onNameChange.bind(this);
  }

  componentDidMount() {
    if (this.props.team) {
      this.setState({ ...this.props.team });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedTeamId: nextProps.selectedTeamId, ...nextProps.team });
    // if (this.props.team) {
    //   if (this.props.selectedTeamId !== nextProps.selectedTeamId) this.setState({ selectedTeamId: nextProps.selectedTeamId });
    //   if (this.props.team.name !== nextProps.team.name) this.setState({ team: nextProps.team });
    //   if (this.props.team.tournament !== nextProps.team.tournament) this.setState({ team: nextProps.team });
    //   if (this.props.team.division !== nextProps.team.division) this.setState({ team: nextProps.team });
    //   if (this.props.team.roster.length !== nextProps.team.roster.length) {
    //     this.setState({ team: nextProps.team });
    //   } else {
    //     this.props.team.roster.some((position, index) => {
    //       if (position.weightClass !== nextProps.team.roster[index].weightClass ||
    //           position.selectedWrestler !== nextProps.team.roster[index].selectedWrestler ||
    //           position.selectedType !== nextProps.team.roster[index].selectedType ||
    //           position.selectedStatus !== nextProps.team.roster[index].selectedStatus) {
    //
    //         this.setState({ team: nextProps.team });
    //
    //         return true;
    //       }
    //     });
    //   }
    // } else {
    //   this.setState({ team: nextProps.team });
    // }
  }

  /**
   * Updates the name of this team.
   *
   * @param e - the change event
   */

  onNameChange(e) {
    const name = e.target.value;

    this.setState({ name });
    this.props.call('teams.update', this.props.team._id, { name });
  }

  onWrestlerSelection(weight, split, e) {
    const options = e.target.options;
    const roster = this.state.roster;
    const index = roster.findIndex((position) => position.weightClass === weight);

    if (split) {
      roster[index].split = { _id: e.target.value, name: options[options.selectedIndex].text };
    } else {
      roster[index].wrestler = { _id: e.target.value, name: options[options.selectedIndex].text };
    }

    this.setState({ roster });
    this.props.call('teams.update', this.props.team._id, { roster });
  }

  onRoleSelection(weight, e) {
    const options = e.target.options;
    const roster = this.state.roster;

    const index = roster.findIndex((position) => position.weightClass === weight);
    roster[index].role = e.target.value;

    this.setState({ roster });
    this.props.call('teams.update', this.props.team._id, { roster });
  }

  onStatusSelection(weight, e) {
    const options = e.target.options;
    const roster = this.state.roster;

    const index = roster.findIndex((position) => position.weightClass === weight);
    roster[index].status = e.target.value;

    this.setState({ roster });
    this.props.call('teams.update', this.props.team._id, { roster });
  }

  /**
   * Renders this component to the browser.
   *
   * @return the JSX markup
   */

   // TODO - modify to not show the trailing zero in weight classes?

  render() {
    if (this.props.team) {
      return (
        <div className="container">
          <div className="editor">
            <input id="name" className="editor__title" value={this.state.name} placeholder="Untitled Team" onChange={this.onNameChange}/>
            <table border="1" className="editor__table">
              <thead>
                <tr>
                  <th>Weight</th>
                  <th>Wrestler</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.roster.map((position, index, roster) => {
                  return (
                    <tr key={index}>
                      <td>{position.weightClass}</td>
                      <td className={position.role === 'Split' ? 'editor__split-weight' : ''}>
                        <select value={position.wrestler._id} onChange={this.onWrestlerSelection.bind(this, position.weightClass, false)}>
                          <option key="-1" value=""></option>
                          {position.availableWrestlers.map((availableWrestler) => {
                            return (
                              <option key={availableWrestler._id} value={availableWrestler._id}>{availableWrestler.name}</option>
                            );
                          })}
                        </select>
                        {position.role === 'Split' ?
                          <select value={position.split._id} onChange={this.onWrestlerSelection.bind(this, position.weightClass, true)}>
                            <option key="-1" value=""></option>
                            {position.availableWrestlers.map((availableWrestler) => {
                              return (
                                <option key={availableWrestler._id} value={availableWrestler._id}>{availableWrestler.name}</option>
                              );
                            })}
                          </select>
                          :
                          undefined
                        }
                      </td>
                      <td>
                        <select value={position.role} onChange={this.onRoleSelection.bind(this, position.weightClass)}>
                          <option key="-1" value="">--Role--</option>
                          {this.state.roles.map((role, index) => {
                            return (
                              <option key={index} value={role}>{role}</option>
                            );
                          })}
                        </select>
                      </td>
                      <td>
                        <select value={position.status} onChange={this.onStatusSelection.bind(this, position.weightClass)}>
                          <option key="-1" value="">--Status--</option>
                          {this.state.statuses.map((status, index) => {
                            return (
                              <option key={index} value={status}>{status}</option>
                            );
                          })}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="editor">
            <p className="editor__message">{this.props.selectedTeamId ? 'Team not found.' : 'Select or add a Team to get started.'}</p>
          </div>
        </div>
      );
    }
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

TeamEditor.propTypes = {
  team: PropTypes.object,
  selectedTeamId: PropTypes.string,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  const selectedTeamId = Session.get('selectedTeamId');

  return {
    selectedTeamId,
    team: Teams.findOne(selectedTeamId),
    call: Meteor.call,
    browserHistory
  };
}, TeamEditor);
