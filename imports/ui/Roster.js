import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';

export class Roster extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      team: props.team
    };
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    console.log('roster', this.state.team);
    
    return (
      <table className="event__roster-table" border="1">
        <thead>
          <tr>
            <th>Weight</th>
            <th>Wrestler</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.state.team.roster ?
            this.state.team.roster.map((position, index) => {
              return (
                <tr key={index}>
                  <td>{position.weightClass}</td>
                  <td>
                    {this.state.team.published
                      ? position.split._id ? position.wrestler.name + ' / ' + position.split.name : position.wrestler.name
                      : position.status === 'Pending' || position.status === 'Confirmed' ? 'Filled' : ''
                    }
                  </td>
                  <td>
                    {this.state.team.published
                      ? position.status
                      : position.status === 'Pending' || position.status === 'Confirmed' ? 'Filled' : 'Open'
                    }
                  </td>
                </tr>
              );
            })
            :
            this.state.team.division.weightClasses.map((weightClass, index) => {
              return (
                <tr key={index}>
                  <td>{weightClass}</td>
                  <td></td>
                  <td>Open</td>
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
  isLastRoster: PropTypes.bool.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  return {
    isSidebarOpen: Session.get('isSidebarOpen')
  };
}, Roster);
