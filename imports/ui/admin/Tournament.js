import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';

/**
 * A Tournament component is displayed as a selectable item in the sidebar.
 *
 * @param props - the initializing properties passed to this component
 */

export const Tournament = (props) => {
  const className = props.tournament.selected || props.tournament.multiselected ? 'item item--selected' : 'item';

  /**
   * Generates the list of selected tournaments, and pushes these changes to
   * the respective Session variables.
   *
   * @param e - the change event
   */

  const onTournamentSelect = (e) => {
    let ids = props.Session.get('multiselectedTournamentIds');
    const currTournamentId = props.Session.get('selectedTournamentId');

    // add the currently selected tournament to the list

    if (currTournamentId && !ids.includes(currTournamentId)) {
      ids.push(currTournamentId);
    }

    // set the selectedTournamentId and multiselectedTournamentIds Session
    // variables based on user multiselection (via command/control key).

    if (e.metaKey) {
      if (!ids.includes(props.tournament._id)) {
        ids.push(props.tournament._id);
      }

      if (ids.length === 1) {
        props.Session.set('selectedTournamentId', props.tournament._id);
      } else {
        props.Session.set('selectedTournamentId', undefined);
      }
    } else {
      ids = [];
      ids.push(props.tournament._id);

      props.Session.set('selectedTournamentId', props.tournament._id);
    }

    props.Session.set('multiselectedTournamentIds', ids);
  };

  // return a Tournament, which is comprised of a title (the tournament name)
  // and a subtitle (the tournament location and start date). optionally, a
  // status icon indicates its visibility on the public schedule.

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


Tournament.propTypes = {
  tournament: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export default createContainer(() => {
  return {
    Session,
    isSidebarOpen: Session.get('isSidebarOpen')
  };
}, Tournament);
