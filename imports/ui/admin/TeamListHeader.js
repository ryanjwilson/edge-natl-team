import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import swal from 'sweetalert2';
import { browserHistory } from 'react-router';

import TeamListFilters from './TeamListFilters';

const TeamListHeader = (props) => {
  return (
    <div className="item-list__header">
      <div className="multiselect-group two">
        <button className="button button--unpublish">Show</button>
        <button className="button button--delete">Hide</button>
      </div>
      <TeamListFilters/>
    </div>
  );
};

TeamListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired
};

export { TeamListHeader };

export default createContainer(() => {
  return {
    browserHistory,
    meteorCall: Meteor.call,
    Session
  };
}, TeamListHeader);
