import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';

/**
 * A Team component represents a single item in the TeamList.
 */

export class Team extends React.Component {

  /**
   * Initializes a Team component.
   *
   * @param props - the properties with which this component is initialized
   */

  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      _id: props.team._id,
      name: props.team.name,
      tournament: {
        _id: props.team.tournament._id,
        name: props.team.tournament.name,
        division: {
          name: props.team.tournament.division.name
        }
      },
      roster: props.team.roster,
      roles: [ 'Starter', 'Split', 'Alternate' ],
      statuses: [ 'Open', 'Pending', 'Confirmed' ],
      published: props.team.published,
      css: props.team.selected || props.team.multiselected ? 'item item--selected' : 'item'
    };

    // bind field listeners to this context. remaining listeners are bound
    // manually, as they take additional parameters.

    this.onTeamSelect = this.onTeamSelect.bind(this);
  }

  /**
   * Updates the component state when new properties are received.
   *
   * @param nextProps - the new properties with which to update the state
   */

  componentWillReceiveProps(nextProps) {
    this.setState({ css: nextProps.team.selected || nextProps.team.multiselected ? 'item item--selected' : 'item', ...nextProps.team });
    // if (this.props.team._id !== nextProps.team._id) this.setState({ team: nextProps.team });
    //
    // if (this.props.team.selected !== nextProps.team.selected || this.props.team.multiselected !== nextProps.team.multiselected) {
    //   this.setState({ css: nextProps.team.selected || nextProps.team.multiselected ? 'item item--selected' : 'item' });
    // }
    //
    // this.setState({ team: nextProps.team });
  }

  /**
   * Generates the list of selected teams, and pushes these changes to
   * their respective Session variables.
   *
   * @param e - the change event
   */

  onTeamSelect(e) {
    let ids = Session.get('multiselectedTeamIds');
    const selectedTeamId = Session.get('selectedTeamId');

    if (selectedTeamId && !ids.includes(selectedTeamId)) {
      ids.push(selectedTeamId);
    }

    if (e.metaKey) {
      if (!ids.includes(this.state._id)) {
        ids.push(this.state.team._id);
      }

      if (ids.length === 1) {
        Session.set('selectedTeamId', this.state._id);
      } else {
        Session.set('selectedTeamId', undefined);
      }
    } else {
      ids = [];
      ids.push(this.state._id);

      Session.set('selectedTeamId', this.state._id);
    }
    Session.set('multiselectedTeamIds', ids);
  }

  /**
   * Renders this component to the page.
   *
   * @return the JSX for this component
   */

  render() {
    return (
      <div id="team" className={this.state.css} onClick={this.onTeamSelect}>
        <div className="item__text">
          <h5 className="item__title">{this.state.name || 'Untitled Team'}</h5>
          <p className="item__subtitle">{this.state.tournament.name || 'Tournament'} &middot; {this.state.tournament.division.name || 'Division'}</p>
        </div>
        {this.state.published ? <div className="item__status-icon"><img src="/images/confirm.png"/></div> : undefined}
      </div>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Team.propTypes = {
  team: PropTypes.object.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  return {

  };
}, Team);
