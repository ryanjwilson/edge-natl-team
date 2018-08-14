import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';

import EmptyItem from './EmptyItem';
import Team from './Team';
import TeamListHeader from './TeamListHeader';
import { Teams } from '../../api/teams';

/**
 * A TournamentList component renders a list of Tournament components.
 */

export class TeamList extends React.Component {

  /**
   * Initializes a TournamentList component.
   *
   * @param props - the properties with which this component is initialized
   */

  constructor(props) {
    super(props);

    this.state = {
      teams: props.teams
    };

    refreshTeamIds(props.teams);
  }

  /**
   * Updates the component state when new properties are received.
   *
   * @param nextProps - the new properties with which to update the state
   */

  componentWillReceiveProps(nextProps) {
    if (this.props.teams.length !== nextProps.teams.length) {
      this.setState({ teams: nextProps.teams });
    } else {
      this.props.teams.some((team, index) => {
        if (!isEquivalent(team, nextProps.teams[index])) {
          this.setState({ teams: nextProps.teams });
          return true;
        }
      });
    }

    refreshTeamIds(nextProps.teams);
  }

  /**
   * Renders this component to the page.
   *
   * @return the JSX for this component
   */

  render() {
    return (
      <div className="container container__item-list">
        <div className="container__header container__item-list-header">
          <h5 className="container__title">Teams</h5>
        </div>

        <div className="item-list">
          <TeamListHeader/>

          {this.state.teams.length === 0 ? <EmptyItem label="Teams"/> : undefined}
          {this.state.teams.map((team) => {
            return <Team key={team._id} team={team}/>;
          })}
        </div>
      </div>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Refreshes the Session variables responsible for storing which tournaments
 * are currently selected. This is done to reflect changes in list filtering.
 *
 * @param teams - the original list of tournaments before filtering
 */

const refreshTeamIds = (teams) => {
  if (teams) {
    let freshIds = [];
    const staleIds = Session.get('multiselectedTeamIds');

    teams.forEach((team) => {
      if (staleIds.includes(team._id)) {
        freshIds.push(team._id);
      }
    });

    if (freshIds.length === 1) {
      Session.set('selectedTeamId', freshIds[0]);
    }
    Session.set('multiselectedTeamIds', freshIds);

    if (teams.length === 0) {
      Session.set('selectedTeamId', undefined);
    } else if (teams.length === 1) {
      Session.set('selectedTeamId', teams[0]._id);
    } else {
      if (teams.filter((team) => team._id === Session.get('selectedTeamId')).length === 0) {
        Session.set('selectedTeamId', undefined);
      }
    }
  }
};

/**
 * Determines if two tournaments are logically equivalent.
 *
 * @param prevTeam - the previous tournament
 * @param nextTeam - the next tournament
 * @return true if the tournaments are logically equivalent; false otherwise
 */

const isEquivalent = (prevTeam, nextTeam) => {
  const prevProps = Object.getOwnPropertyNames(prevTeam);
  const nextProps = Object.getOwnPropertyNames(nextTeam);

  if (prevProps.length !== nextProps.length) {
    return false;
  }

  for (let i = 0; i < prevProps.length; i++) {
    const propName = prevProps[i];

    if (prevTeam[propName] !== nextTeam[propName]) {
      return false;
    }
  }

  return true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

TeamList.propTypes = {
  teams: PropTypes.array.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  Meteor.subscribe('teams');

  const selectedTeamId = Session.get('selectedTeamId');
  const multiselectedTeamIds = Session.get('multiselectedTeamIds');

  // conditionally query the tournaments collection based on the filter
  // selections made by the user.

  return {
    teams: Teams.find({}, {
      sort: { order: 1 }
    }).fetch().map((team) => {   // show all tournaments
      return {
        ...team,
        selected: team._id === selectedTeamId,
        multiselected: multiselectedTeamIds.includes(team._id)
      };
    })
  };
}, TeamList);
