import React from 'react';
import { Accounts } from 'meteor/accounts-base';

import PrivateHeader from './PrivateHeader';
import TournamentEditor from './TournamentEditor';
import TournamentList from './TournamentList';

export default TournamentView = () => {
  return (
    <div>
      <PrivateHeader title="Tournaments"/>

      <div className="page-content">
        <div className="page-content__sidebar">
          <TournamentList/>
        </div>
        <div className="page-content__main">
          <TournamentEditor/>
        </div>
      </div>
    </div>
  );
};
