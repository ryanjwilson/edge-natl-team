import React from 'react';
import { Accounts } from 'meteor/accounts-base';

import PrivateHeader from './PrivateHeader';
import Footer from '../Footer';
import ApplicationEditor from './ApplicationEditor';
import ApplicationList from './ApplicationList';

export default ApplicationView = () => {
  return (
    <div>
      <PrivateHeader title="Applications"/>

      <div className="page-content">
        <div className="page-content__sidebar">
          <ApplicationList/>
        </div>
        <div className="page-content__main">
          <ApplicationEditor/>
        </div>
      </div>

      <Footer/>
    </div>
  );
};
