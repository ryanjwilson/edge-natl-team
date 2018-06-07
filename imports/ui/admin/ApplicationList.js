import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import EmptyItem from './EmptyItem';
import Application from './Application';
import ApplicationListHeader from './ApplicationListHeader';
import { Applications } from '../../api/applications';

export const ApplicationList = (props) => {
  if (props.applications) {
    const staleIds = Session.get('multiselectedApplicationIds');   // current ids in multiselect list

    /*
     * After filtering applications, we need to refresh the list of multiselected applications.
     * This prevents users from accidentally deleting an application that was previously selected,
     * but is no longer visible (i.e., filtered out).
     */

    let freshIds = [];
    props.applications.forEach((application) => {
      if (staleIds.includes(application._id)) {
        freshIds.push(application._id);
      }
    });

    /*
     * Reset the selected wrestler(s).
     */

    if (freshIds.length === 1) {
      Session.set('selectedApplicationId', freshIds[0]);
    }
    Session.set('multiselectedApplicationIds', freshIds);

    /*
     * Auto-update the selected wrestler.
     *    - undefined if the wrestler list is empty
     *    - the first and only wrestler in the list
     *    - whichever wrestler is marked as selected
     */

    if (props.applications.length === 0) {
      Session.set('selectedApplicationId', undefined);
    } else if (props.applications.length === 1) {
      Session.set('selectedApplicationId', props.applications[0]._id);
    } else {
      if (props.applications.filter((application) => application._id === Session.get('selectedApplicationId')).length === 0) {
        Session.set('selectedApplicationId', undefined);
      }
    }
  }

  return (
    <div className="item-list">
      <ApplicationListHeader/>

      {props.applications.length === 0 ? <EmptyItem label="Applications"/> : undefined}
      {props.applications.map((application) => {
        return <Application key={application._id} application={application}/>;
      })}
    </div>
  );
};

ApplicationList.propTypes = {
  applications: PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedApplicationId = Session.get('selectedApplicationId');
  const showPublished = Session.get('showPublished');
  const showUnpublished = Session.get('showUnpublished');

  Meteor.subscribe('applications');

  if (showPublished && showUnpublished) {
    return {
      applications: Applications.find().fetch().map((application) => {
        return {
          ...application,
          selected: application._id === selectedApplicationId,
          multiselected: Session.get('multiselectedApplicationIds').includes(application._id)
        };
      })
    };
  } else if (showPublished || showUnpublished) {
    return {
      applications: Applications.find({
        published: showPublished
      }).fetch().map((application) => {
        return {
          ...application,
          selected: application._id === selectedApplicationId,
          multiselected: Session.get('multiselectedApplicationIds').includes(application._id)
        }
      })
    };
  } else {
    return {
      applications: []
    };
  }
}, ApplicationList);
