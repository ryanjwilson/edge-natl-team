import React from 'react';
import { Accounts } from 'meteor/accounts-base';

import Footer from '../Footer';
import PrivateHeader from './PrivateHeader';
import TournamentEditor from './TournamentEditor';
import TournamentList from './TournamentList';

/**
 * A TournamentView component encompasses the entirety of the Tournament
 * section, including both functionality and user interface.
 */

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

      <Footer/>
    </div>
  );
};
