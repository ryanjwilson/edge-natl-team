import React from 'react';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const Application = (props) => {
  const convertGrade = (grade) => {
    if (grade) {
      switch (grade.toUpperCase()) {
        case 'K': return 'Kindergarten';
        case '1': return '1st grade';
        case '2': return '2nd grade';
        case '3': return '3rd grade';
        case '4': case '5': case '6': case '7': case '8': case '9': case '10': case '11': case '12': return grade + 'th grade';
        default: return null;
      }
    }

    return null;
  };

  const onApplicationSelect = (e) => {
    let ids = props.Session.get('multiselectedApplicationIds');

    if (e.metaKey) {
      if (!ids.includes(props.application._id)) {
        ids.push(props.application._id);             // add to multiselect list
      }

      if (ids.length === 1) {
        props.Session.set('selectedApplicationId', props.application._id)
      } else {
        props.Session.set('selectedApplicationId', undefined);
      }
    } else {
      ids = [];                              // clear multiselect list
      ids.push(props.application._id);       // add newly selected to list

      props.Session.set('selectedApplicationId', props.application._id)
    }

    props.Session.set('multiselectedApplicationIds', ids);
  };

  const className = props.application.selected || props.application.multiselected ? 'item item--selected' : 'item';
  const subtitlePrimary = props.application.weightClass ? props.application.weightClass + ' lbs.' : 'Weight';
  const subtitleSecondary = convertGrade(props.application.wrestler.grade);

  return (
    <div id="application" className={className} onClick={onApplicationSelect}>
      <div className="item__text">
        <h5 className="item__title">{props.application.wrestler.name || 'Unknown Wrestler'}</h5>
        <p className="item__subtitle">{subtitlePrimary} &middot; {subtitleSecondary || 'Grade'}</p>
      </div>
    </div>
  );
};

Application.propTypes = {
  application: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(() => {
  return {
    Session,
    isSidebarOpen: Session.get('isSidebarOpen')
  };
}, Application);
