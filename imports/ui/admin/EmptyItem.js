import React from 'react';
import { PropTypes } from 'prop-types';

/*****************************************************************************/

const EmptyItem = (props) => {
  return (
    <p className="empty-item">Add a {props.label} to get started.</p>
  );
};

EmptyItem.propTypes = {
  label: PropTypes.string.isRequired
};

/*****************************************************************************/

export default EmptyItem;
