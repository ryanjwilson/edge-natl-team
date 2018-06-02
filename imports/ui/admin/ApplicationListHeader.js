import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import ApplicationListFilters from './ApplicationListFilters';

const ApplicationListHeader = (props) => {
  const onAddApplication = () => {
    props.meteorCall('applications.insert', (err, res) => {
      if (res) {
        props.Session.set('selectedApplicationId', res);
      }
    });
  };

  return (
    <div className="item-list__header">
      <button className="button--add" onClick={onAddApplication}>Add Application</button>
      <ApplicationListFilters/>
    </div>
  );
};

ApplicationListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired
};

export { ApplicationListHeader };

export default createContainer(() => {
  return {
    meteorCall: Meteor.call,
    Session
  };
}, ApplicationListHeader);
