import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';

export class Roster extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      team: props.team,
      division: props.division
    };
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {    
    return (
      <table className="boxed-view__table" border="1">
        <thead>
          <tr>
            <th>Weight</th>
            <th>Wrestler</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.state.team ?
            this.state.team.roster.map((position, index) => {
              return (
                <tr key={index}>
                  <td>{position.weightClass}</td>
                  <td>{position.split._id ? position.wrestler.name + ' / ' + position.split.name : position.wrestler.name}</td>
                  <td>{position.status}</td>
                </tr>
              );
            })
            :
            this.state.division.weightClasses.map((weightClass, index) => {
              return (
                <tr key={index}>
                  <td>{weightClass}</td>
                  <td></td>
                  <td>OPEN</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Roster.propTypes = {
  team: PropTypes.object,
  division: PropTypes.object,
  isLastRoster: PropTypes.bool.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  return {
    isSidebarOpen: Session.get('isSidebarOpen')
  };
}, Roster);
