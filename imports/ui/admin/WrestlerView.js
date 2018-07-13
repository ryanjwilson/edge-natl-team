import React from 'react';
import { Accounts } from 'meteor/accounts-base';

import PrivateHeader from './PrivateHeader';
import Footer from '../Footer';
import WrestlerEditor from './WrestlerEditor';
import WrestlerList from './WrestlerList';

export default WrestlerView = () => {
  return (
    <div>
      <PrivateHeader title="Wrestlers"/>

      <div className="private-page-content">
        <div className="private-page-content__sidebar">
          <WrestlerList/>
        </div>
        <div className="private-page-content__main">
          <WrestlerEditor/>
        </div>
      </div>

      <Footer/>
    </div>
  );
};
