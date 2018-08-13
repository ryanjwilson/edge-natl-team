import Modal from 'react-modal';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import swal from 'sweetalert2';
import { browserHistory } from 'react-router';

import TeamListFilters from './TeamListFilters';
import TeamListHeaderFilters from './TeamListHeaderFilters';

export class TeamListHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddModalOpen: false
    };

    this.onAddTeam = this.onAddTeam.bind(this);
    this.onShowTeams = this.onShowTeams.bind(this);
    this.onHideTeams = this.onHideTeams.bind(this);
    this.onDeleteTeams = this.onDeleteTeams.bind(this);
    this.onShowAddModal = this.onShowAddModal.bind(this);
    this.onCloseAddModal = this.onCloseAddModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {

  }

  onAddTeam() {
    if (Session.get('selectedTeamTournamentModalFilter') && Session.get('selectedTeamDivisionModalFilter')) {
      Session.set('multiselectedTeamIds', []);    // clear any previously multiselected teams

      Meteor.call('teams.insert', Session.get('selectedTeamTournamentModalFilter'), Session.get('selectedTeamDivisionModalFilter'), (err, res) => {
        if (res) Session.set('selectedTeamId', res);
      });

      this.onCloseAddModal();
    } else {

    }
  }

  onShowTeams() {

  }

  onHideTeams() {

  }

  onDeleteTeams() {

  }

  onShowAddModal() {
    this.setState({ isAddModalOpen: true });
  }

  onCloseAddModal() {
    this.setState({ isAddModalOpen: false });
  }

  render() {
    return (
      <div className="item-list__header">
        <button className="button--add" onClick={this.onShowAddModal}>Add Team</button>

        <Modal appElement={document.getElementById('app')} isOpen={this.state.isAddModalOpen} contentLabel="Add Team" onRequestClose={this.onCloseAddModal} className="boxed-view__box unbounded-height" overlayClassName="boxed-view boxed-view--modal">
          <div className="boxed-view__header">
            <h5 className="boxed-view__title">Add Team</h5>
            <img src="/images/navigation/menu-close-button.svg" onClick={this.onCloseAddModal}/>
          </div>

          <div className="boxed-view__box-content">
            <TeamListHeaderFilters/>
            <button className="button--add" onClick={this.onAddTeam}>Add Team</button>
          </div>
        </Modal>

        <div className="multiselect-group three">
          <button className="button button--publish" onClick={this.onShowTeams}>Show</button>
          <button className="button button--unpublish" onClick={this.onHideTeams}>Hide</button>
          <button className="button button--delete" onClick={this.onDeleteTeams}>Delete</button>
        </div>
        <TeamListFilters/>
      </div>
    );
  }
}

TeamListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(() => {
  return {
    browserHistory,
    meteorCall: Meteor.call,
    Session
  };
}, TeamListHeader);
