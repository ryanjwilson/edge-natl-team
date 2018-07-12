import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';

/**
 * A Tournament component represents a single item in the TournamentList.
 */

export class Tournament extends React.Component {

  /**
   * Initializes a Tournament component.
   *
   * @param props - the properties with which this component is initialized
   */

  constructor(props) {
    super(props);

    this.state = {
      tournament: props.tournament,
      css: props.tournament.selected || props.tournament.multiselected ? 'item item--selected' : 'item'
    };

    // bind field listeners to this context. remaining listeners are bound
    // manually, as they take additional parameters.

    this.onTournamentSelect = this.onTournamentSelect.bind(this);
  }

  /**
   * Updates the component state when new properties are received.
   *
   * @param nextProps - the new properties with which to update the state
   */

  componentWillReceiveProps(nextProps) {
    if (this.props.tournament._id !== nextProps.tournament._id) this.setState({ tournament: nextProps.tournament });

    if (this.props.tournament.selected !== nextProps.tournament.selected || this.props.tournament.multiselected !== nextProps.tournament.multiselected) {
      this.setState({ css: nextProps.tournament.selected || nextProps.tournament.multiselected ? 'item item--selected' : 'item' });
    }

    this.setState({ tournament: nextProps.tournament });
  }

  /**
   * Generates the list of selected tournaments, and pushes these changes to
   * their respective Session variables.
   *
   * @param e - the change event
   */

  onTournamentSelect(e) {
    let ids = Session.get('multiselectedTournamentIds');
    const selectedTournamentId = Session.get('selectedTournamentId');

    if (selectedTournamentId && !ids.includes(selectedTournamentId)) {
      ids.push(selectedTournamentId);
    }

    if (e.metaKey) {
      if (!ids.includes(this.state.tournament._id)) {
        ids.push(this.state.tournament._id);
      }

      if (ids.length === 1) {
        Session.set('selectedTournamentId', this.state.tournament._id);
      } else {
        Session.set('selectedTournamentId', undefined);
      }
    } else {
      ids = [];
      ids.push(this.state.tournament._id);

      Session.set('selectedTournamentId', this.state.tournament._id);
    }
    Session.set('multiselectedTournamentIds', ids);
  }

  /**
   * Renders this component to the page.
   *
   * @return the JSX for this component
   */

  render() {
    return (
      <div id="tournament" className={this.state.css} onClick={this.onTournamentSelect}>
        <div className="item__text">
          <h5 className="item__title">{this.state.tournament.name || 'Untitled Tournament'}</h5>
          <p className="item__subtitle">{this.state.tournament.location || 'Location'} &middot; {this.state.tournament.startDate || 'Date'}</p>
        </div>
        {this.state.tournament.published ? <div className="item__status-icon"><img src="/images/confirm.png"/></div> : undefined}
      </div>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Tournament.propTypes = {
  tournament: PropTypes.object.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  return {};
}, Tournament);
