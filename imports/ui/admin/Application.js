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

  const className = props.application.selected ? 'item item--selected' : 'item';
  const subtitlePrimary = props.application.weightClass ? props.application.weightClass + ' lbs.' : 'Weight';
  const subtitleSecondary = convertGrade(props.application.wrestler.grade);

  return (
    <div id="application" className={className} onClick={() => props.Session.set('selectedApplicationId', props.application._id)}>
      <div className="item__text">
        <h5 className="item__title">{props.application.wrestler.name || 'Unknown Wrestler'}</h5>
        <p className="item__subtitle">{subtitlePrimary} &middot; {subtitleSecondary || 'Grade'}</p>
      </div>
      {/* {props.wrestler.published ? <div className="item__status-icon"><img src="/images/confirm.png"/></div> : undefined} */}
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
