import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';

import { Roster } from './Roster';
import { RosterTabBar } from './RosterTabBar';

export class RosterList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      divisions: props.divisions,
      selectedTab: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.divisions.length !== nextProps.divisions.length) {
      this.setState({ divisions: nextProps.event.divisions });
    } else {
      this.props.divisions.some((division, index) => {
        if (division.name !== nextProps.divisions[index].name) {
          this.setState({ divisions: nextProps.divisions });

          return true;
        }
      });
    }
  }

  showRoster(selectedTab) {
    this.setState({ selectedTab });
  }

  render() {
    return (
      <div>
        {this.state.divisions.length === 0 ? <p className="empty-item">There are no Rosters to display.</p> : undefined}
        {this.state.divisions.length > 1 ? <RosterTabBar tabs={this.state.divisions} callbackFromParent={this.showRoster.bind(this)}/> : undefined}

        {this.state.divisions.map((division, index, divisions) => {
          return (
            this.state.selectedTab === index ? <Roster key={index} division={division} isLastRoster={index === divisions.length - 1}/> : undefined
          );
        })}
      </div>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

RosterList.propTypes = {
  divisions: PropTypes.array.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  return {

  };
}, RosterList);
