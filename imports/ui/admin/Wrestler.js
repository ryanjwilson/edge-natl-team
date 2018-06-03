import React from 'react';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const Wrestler = (props) => {
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

  const className = props.wrestler.selected ? 'item item--selected' : 'item';
  const subtitlePrimary = props.wrestler.weight ? props.wrestler.weight + ' lbs.' : 'Weight';
  const subtitleSecondary = convertGrade(props.wrestler.grade);

  return (
    <div id="wrestler" className={className} onClick={() => props.Session.set('selectedWrestlerId', props.wrestler._id)}>
      <div className="item__text">
        <h5 className="item__title">{props.wrestler.name || 'Unknown Wrestler'}</h5>
        <p className="item__subtitle">{subtitlePrimary} &middot; {subtitleSecondary || 'Grade'}</p>
      </div>
      {/* {props.wrestler.published ? <div className="item__status-icon"><img src="/images/confirm.png"/></div> : undefined} */}
    </div>
  );
};

Wrestler.propTypes = {
  wrestler: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(() => {
  return {
    Session,
    isSidebarOpen: Session.get('isSidebarOpen')
  };
}, Wrestler);
