import React from 'react';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const Tournament = (props) => {
  const className = props.tournament.selected || props.tournament.multiselected ? 'item item--selected' : 'item';

  const onTournamentSelect = (e) => {
    let ids = props.Session.get('multiselectedTournamentIds');

    if (e.metaKey) {
      if (!ids.includes(props.tournament._id)) {
        ids.push(props.tournament._id);             // add to multiselect list
      }

      if (ids.length === 1) {
        props.Session.set('selectedTournamentId', props.tournament._id);
      } else {
        props.Session.set('selectedTournamentId', undefined);
      }
    } else {
      ids = [];                           // clear multiselect list
      ids.push(props.tournament._id);     // add newly selected to list

      props.Session.set('selectedTournamentId', props.tournament._id);
    }

    props.Session.set('multiselectedTournamentIds', ids);
  }

  return (
    <div id="tournament" className={className} onClick={onTournamentSelect}>
      <div className="item__text">
        <h5 className="item__title">{props.tournament.name || 'Untitled Tournament'}</h5>
        <p className="item__subtitle">{props.tournament.location || 'Location'} &middot; {props.tournament.startDate || 'Date'}</p>
      </div>
      {props.tournament.published ? <div className="item__status-icon"><img src="/images/confirm.png"/></div> : undefined}
    </div>
  );
};

Tournament.propTypes = {
  tournament: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(() => {
  return {
    Session,
    isSidebarOpen: Session.get('isSidebarOpen')
  };
}, Tournament);
