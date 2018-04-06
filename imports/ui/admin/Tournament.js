import React from 'react';
import { PropTypes } from 'prop-types';

/*****************************************************************************/

const Tournament = (props) => {
  return (
    <div>
      <h5>{props.tournament.name || 'Untitled Tournament'}</h5>
      <p>{props.tournament.date || 'Date'} &middot; {props.tournament.location || 'Location'} &middot; {props.tournament.division || 'Division'}</p>
    </div>
  );
};

Tournament.propTypes = {
  tournament: PropTypes.object.isRequired
};

/*****************************************************************************/

export default Tournament;
