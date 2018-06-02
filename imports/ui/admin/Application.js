import React from 'react';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const Application = (props) => {
  const className = props.application.selected ? 'item item--selected' : 'item';

  return (
    <div id="application" className={className} onClick={() => props.Session.set('selectedApplicationId', props.application._id)}>
      <div className="item__text">
        <h5 className="item__title">{props.application.wrestler.name || 'Unknown Wrestler'}</h5>
        <p className="item__subtitle">{props.application.tournament.name || 'Tournament'} &middot; {props.application.tournament.division || 'Division'}</p>
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
