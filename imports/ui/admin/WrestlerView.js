import React from 'react';
import { Accounts } from 'meteor/accounts-base';

import PrivateHeader from './PrivateHeader';
import WrestlerEditor from './WrestlerEditor';
import WrestlerList from './WrestlerList';

export default WrestlerView = () => {
  return (
    <div>
      <PrivateHeader title="Wrestlers"/>

      <div className="page-content">
        <div className="page-content__sidebar">
          <WrestlerList/>
        </div>
        <div className="page-content__main">
          <WrestlerEditor/>
        </div>
      </div>
    </div>
  );
};
