import React from 'react';
import { Accounts } from 'meteor/accounts-base';

import PrivateHeader from './PrivateHeader';
import TournamentList from './TournamentList';

/*****************************************************************************/

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <PrivateHeader title="Dashboard"/>

        <div className="page-content">
          <TournamentList/>
        </div>
      </div>
    );
  }
}

/*****************************************************************************/

export default Dashboard;
