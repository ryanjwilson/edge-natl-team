import React from 'react';
import { PropTypes } from 'prop-types';

/*****************************************************************************/

const EmptyItem = (props) => {
  return (
    <div>
      <h5>There are no {props.label}s to display.</h5>
      <p>Add a {props.label} to get started!</p>
    </div>
  );
};

EmptyItem.propTypes = {
  label: PropTypes.string.isRequired
};

/*****************************************************************************/

export default EmptyItem;
