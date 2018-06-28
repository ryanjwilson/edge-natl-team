import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

/**
 * A TournamentListFilters component provides filters that allow the user to
 * customize the Tournaments that appear in the TournamentList.
 */

export class TournamentListFilters extends React.Component {

  /**
   * Constructs a reactive TournamentListFilters component.
   *
   * @param props - the initializing properties passed to this component
   */

  constructor(props) {
    super(props);

    this.state = {
      showPublished: true,
      showUnpublished: true
    };

    // bind field listeners to this context.

    this.onTogglePublished = this.onTogglePublished.bind(this);
    this.onToggleUnpublished = this.onToggleUnpublished.bind(this);
  }

  /**
   * Refresh the component state when it is mounted.
   */

  componentDidMount() {
    this.setState({
      showPublished: this.props.showPublished,
      showUnpublished: this.props.showUnpublished
    });
  }

  /**
   * Toggle the visibility of Tournaments in the TournamentList. When checked,
   * Tournaments that are published to the public Schedule will be visible in
   * the TournamentList.
   *
   * @param e - the change event
   */

  onTogglePublished(e) {
    const showPublished = e.target.checked;
    this.props.Session.set('showPublished', showPublished);
    this.setState({ showPublished });
  }

  /**
   * Toggle the visibility of Tournaments in the TournamentList. When checked,
   * Tournaments that are not published to the public Schedule will be visible
   * in the TournamentList.
   *
   * @param e - the change event
   */

  onToggleUnpublished(e) {
    const showUnpublished = e.target.checked;
    this.props.Session.set('showUnpublished', showUnpublished);
    this.setState({ showUnpublished });
  }

  /**
   * Renders this component to the browser.
   *
   * @return the JSX markup
   */

  render() {
    return (
      <div className="checkbox__filter-group">
        <label className="checkbox">
          <input className="checkbox__box" type="checkbox" checked={this.state.showPublished} onChange={this.onTogglePublished}/>
          Shown
        </label>
        <label className="checkbox">
          <input className="checkbox__box" type="checkbox" checked={this.state.showUnpublished} onChange={this.onToggleUnpublished}/>
          Hidden
        </label>
      </div>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

TournamentListFilters.propTypes = {
  showPublished: PropTypes.bool,
  showUnpublished: PropTypes.bool,
  Session: PropTypes.object.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  const showPublished = Session.get('showPublished');
  const showUnpublished = Session.get('showUnpublished');

  return {
    showPublished,
    showUnpublished,
    Session
  };
}, TournamentListFilters);
