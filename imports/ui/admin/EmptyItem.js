import React from 'react';
import { PropTypes } from 'prop-types';

export default EmptyItem = (props) => {
  return (
    <p className="empty-item">No {props.label} to display.</p>
  );
};

EmptyItem.propTypes = {
  label: PropTypes.string.isRequired
};
