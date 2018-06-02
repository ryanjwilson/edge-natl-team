import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import WrestlerListFilters from './WrestlerListFilters';

const WrestlerListHeader = (props) => {
  const onAddWrestler = () => {
    props.meteorCall('wrestlers.insert', (err, res) => {
      if (res) {
        props.Session.set('selectedWrestlerId', res);
      }
    });
  };

  return (
    <div className="item-list__header">
      <button className="button--add" onClick={onAddWrestler}>Add Wrestler</button>
      <WrestlerListFilters/>
    </div>
  );
};

WrestlerListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired
};

export { WrestlerListHeader };

export default createContainer(() => {
  return {
    meteorCall: Meteor.call,
    Session
  };
}, WrestlerListHeader);
