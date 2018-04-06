import React from 'react';
import { Accounts } from 'meteor/accounts-base';

import PrivateHeader from './PrivateHeader';

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
          Dashboard content here.
        </div>
      </div>
    );
  }
}

/*****************************************************************************/

export default Dashboard;
