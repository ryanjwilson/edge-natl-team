import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';

/**
 * An EmptyItem component represents a placeholder for an empty list item
 * (i.e., TournamentList, WrestlerList, TeamList).
 */

export class EmptyItem extends React.Component {

  /**
   * Initializes an EmptyItem component.
   *
   * @param props - the properties with which this component is initialized
   */

  constructor(props) {
    super(props);

    this.state = {
      label: props.label,
      message: props.message    // currently unused
    };
  }

  /**
   * Updates the component state when new properties are received.
   *
   * @param nextProps - the new properties with which to update the state
   */

  componentWillReceiveProps(nextProps) {
    if (this.props.label !== nextProps.label) this.setState({ label: nextProps.label });
    if (this.props.message !== nextProps.message) this.setState({ message: nextProps.message });
  }

  /**
   * Renders this component to the page.
   *
   * @return the JSX for this component
   */

  render() {
    return (
      <p className="empty-item">No {this.state.label} to display.</p>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

EmptyItem.propTypes = {
  label: PropTypes.string.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  return {};
}, EmptyItem);
