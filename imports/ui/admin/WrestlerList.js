import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import EmptyItem from './EmptyItem';
import Wrestler from './Wrestler';
import WrestlerListHeader from './WrestlerListHeader';
import { Wrestlers } from '../../api/wrestlers';

export const WrestlerList = (props) => {
  if (props.wrestlers) {
    if (props.wrestlers.length === 0) {
      Session.set('selectedWrestlerId', undefined);
    } else if (props.wrestlers.length === 1) {
      Session.set('selectedWrestlerId', props.wrestlers[0]._id);
    } else {
      if (props.wrestlers.filter((wrestler) => wrestler._id === Session.get('selectedWrestlerId')).length === 0) {
        Session.set('selectedWrestlerId', undefined);
      }
    }
  }

  return (
    <div className="item-list">
      <WrestlerListHeader/>

      {props.wrestlers.length === 0 ? <EmptyItem label="Wrestlers"/> : undefined}
      {props.wrestlers.map((wrestler) => {
        return <Wrestler key={wrestler._id} wrestler={wrestler}/>;
      })}
    </div>
  );
};

WrestlerList.propTypes = {
  wrestlers: PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedWrestlerId = Session.get('selectedWrestlerId');
  const showPublished = Session.get('showPublished');
  const showUnpublished = Session.get('showUnpublished');

  Meteor.call('wrestlers.sync');
  Meteor.subscribe('wrestlers');

  if (showPublished && showUnpublished) {
    return {
      wrestlers: Wrestlers.find().fetch().map((wrestler) => {
        return {
          ...wrestler,
          selected: wrestler._id === selectedWrestlerId
        };
      })
    };
  } else if (showPublished || showUnpublished) {
    return {
      wrestlers: Wrestlers.find({
        published: showPublished
      }).fetch().map((wrestler) => {
        return {
          ...wrestler,
          selected: wrestler._id === selectedWrestlerId
        }
      })
    };
  } else {
    return {
      wrestlers: []
    };
  }
}, WrestlerList);
