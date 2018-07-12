import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';
// import { Tracker } from 'meteor/tracker';

/**
 * A TournamentListFilters component provides filters that allow the user to
 * customize the Tournaments that appear in the TournamentList.
 */

export class TournamentListFilters extends React.Component {

  /**
   * Initializes an EmptyItem component.
   *
   * @param props - the properties with which this component is initialized
   */

  constructor(props) {
    super(props);

    this.state = {
      showPublished: true,
      showUnpublished: true
    };

    // bind field listeners to this context. remaining listeners are bound
    // manually, as they take additional parameters.

    this.togglePublished = this.togglePublished.bind(this);
    this.toggleUnpublished = this.toggleUnpublished.bind(this);
  }

  /**
   * Updates the component state when new properties are received.
   *
   * @param nextProps - the new properties with which to update the state
   */

  componentWillReceiveProps(nextProps) {
    if (this.props.showPublished !== nextProps.showPublished) this.setState({ showPublished: nextProps.showPublished });
    if (this.props.showUnpublished !== nextProps.showUnpublished) this.setState({ showUnpublished: nextProps.showUnpublished });
  }

  /**
   * Toggles the visibility of published Tournaments in the TournamentList.
   *
   * @param e - the change event
   */

  togglePublished(e) {
    const showPublished = e.target.checked;

    Session.set('showPublishedFilter', showPublished);
    this.setState({ showPublished });
  }

  /**
   * Toggles the visibility of unpublished Tournaments in the TournamentList.
   *
   * @param e - the change event
   */

  toggleUnpublished(e) {
    const showUnpublished = e.target.checked;

    Session.set('showUnpublishedFilter', showUnpublished);
    this.setState({ showUnpublished });
  }

  /**
   * Renders this component to the page.
   *
   * @return the JSX for this component
   */

  render() {
    return (
      <div className="checkbox__filter-group">
        <label className="checkbox">
          <input className="checkbox__box" type="checkbox" checked={this.state.showPublished} onChange={this.togglePublished}/>
          Shown
        </label>
        <label className="checkbox">
          <input className="checkbox__box" type="checkbox" checked={this.state.showUnpublished} onChange={this.toggleUnpublished}/>
          Hidden
        </label>
      </div>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

TournamentListFilters.propTypes = {
  showPublished: PropTypes.bool,
  showUnpublished: PropTypes.bool
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  const showPublished = Session.get('showPublishedFilter');
  const showUnpublished = Session.get('showUnpublishedFilter');

  return {
    showPublished,
    showUnpublished
  };
}, TournamentListFilters);
