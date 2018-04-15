import React from 'react';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

/*****************************************************************************/

const Tournament = (props) => {
  const className = props.tournament.selected ? 'item item--selected' : 'item';

  const onTournamentClick = () => {
    props.Session.set('selectedTournamentId', props.tournament._id);

    if (props.isNavOpen) {
      props.Session.set('isNavOpen', false);
    }
  };

  return (
    <div id="tournament" className={className} onClick={onTournamentClick}>
      <div className="item__text">
        <h5 className="item__title">{props.tournament.name || 'Untitled Tournament'}</h5>
        <p className="item__subtitle">{props.tournament.date || 'Date'} &middot; {props.tournament.location || 'Location'}</p>
      </div>
      {props.tournament.published ? <div className="item__status"><img src="/images/confirm.png"/></div> : undefined}
    </div>
  );
};

Tournament.propTypes = {
  tournament: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

/*****************************************************************************/

export { Tournament };

export default createContainer(() => {
  return {
    Session,
    isNavOpen: Session.get('isNavOpen')
  };
}, Tournament);
