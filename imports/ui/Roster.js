import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';

export class Roster extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
          {this.state.division.weightClasses.map((weightClass, index) => {
            return (
              <tr key={index}>
                <td>{weightClass}</td>
                <td>John Doe</td>
                <td>Pending</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Roster.propTypes = {
  division: PropTypes.object.isRequired,
  isLastRoster: PropTypes.bool.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  return {
    isSidebarOpen: Session.get('isSidebarOpen')
  };
}, Roster);
