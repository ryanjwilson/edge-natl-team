import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import swal from 'sweetalert2';
import { browserHistory } from 'react-router';

import TournamentListFilters from './TournamentListFilters';

const TournamentListHeader = (props) => {
  const onAddTournament = () => {
    props.Session.set('multiselectedTournamentIds', []);      // clear multiselect list

    props.meteorCall('tournaments.insert', (err, res) => {
      if (res) {
        props.Session.set('selectedTournamentId', res);
      }
    });
  };

  /*
   * Publishes one or more tournaments simultaneously based on multiselection.
   */

  const onShowTournaments = () => {
    const tournamentIds = props.Session.get('multiselectedTournamentIds');

    if (tournamentIds.length === 0) {
      swal({
        titleText: 'No Tournament Selected',
        text: 'You\'ll need to select at least one Tournament to publish.',
        type: 'info',
        confirmButtonColor: '#2e8b57'
      });
    } else {
      swal({
        titleText: 'Are you sure?',
        text: 'You\'re about to publish ' + tournamentIds.length + (tournamentIds.length > 1 ? ' tournaments.' : ' tournament.'),
        type: 'warning',
        showCancelButton: true,
        cancelButtonClass: 'modal-button button--cancel',
        confirmButtonText: 'Show',
        confirmButtonClass: 'modal-button button--publish',
        confirmButtonColor: '#2e8b57',
        reverseButtons: true
      }).then((response) => {
        if (response && response.value) {
          tournamentIds.forEach((tournamentId) => {
            props.meteorCall('tournaments.update', tournamentId, { published: true });
          });
        }
      });
    }
  };

  /*
   * Unpublishes one or more tournaments simultaneously based on multiselection.
   */

  const onHideTournaments = () => {
    const tournamentIds = props.Session.get('multiselectedTournamentIds');

    if (tournamentIds.length === 0) {
      swal({
        titleText: 'No Tournament Selected',
        text: 'You\'ll need to select at least one Tournament to unpublish.',
        type: 'info',
        confirmButtonColor: '#5a5a5a'
      });
    } else {
      swal({
        titleText: 'Are you sure?',
        text: 'You\'re about to unpublish ' + tournamentIds.length + (tournamentIds.length > 1 ? ' tournaments.' : ' tournament.'),
        type: 'warning',
        showCancelButton: true,
        cancelButtonClass: 'modal-button button--cancel',
        confirmButtonText: 'Hide',
        confirmButtonClass: 'modal-button button--unpublish',
        confirmButtonColor: '#5a5a5a',
        reverseButtons: true
      }).then((response) => {
        if (response && response.value) {
          tournamentIds.forEach((tournamentId) => {
            props.meteorCall('tournaments.update', tournamentId, { published: false });
          });
        }
      });
    }
  };

  /*
   * Deletes one or more tournaments simultaneously based on multiselection.
   */

  const onDeleteTournaments = () => {
    const tournamentIds = props.Session.get('multiselectedTournamentIds');

    if (tournamentIds.length === 0) {
      swal({
        titleText: 'No Tournament Selected',
        text: 'You\'ll need to select at least one Tournament to delete.',
        type: 'info',
        confirmButtonColor: '#e64942'
      });
    } else {
      swal({
        titleText: 'Are you sure?',
        text: 'You\'re about to delete ' + tournamentIds.length + (tournamentIds.length > 1 ? ' tournaments.' : ' tournament.'),
        type: 'warning',
        showCancelButton: true,
        cancelButtonClass: 'modal-button button--cancel',
        confirmButtonText: 'Delete',
        confirmButtonClass: 'modal-button button--delete',
        confirmButtonColor: '#e64942',
        reverseButtons: true
      }).then((response) => {
        if (response && response.value) {
          tournamentIds.forEach((tournamentId) => {
            props.meteorCall('tournaments.remove', tournamentId);
          });

          props.browserHistory.push('/tournaments');
        }
      });
    }
  };

  return (
    <div className="item-list__header">
      <button className="button--add" onClick={onAddTournament}>Add Tournament</button>
      <div className="multiselect-group three">
        <button className="button button--publish" onClick={onShowTournaments}>Show</button>
        <button className="button button--unpublish" onClick={onHideTournaments}>Hide</button>
        <button className="button button--delete" onClick={onDeleteTournaments}>Delete</button>
      </div>
      <TournamentListFilters/>
    </div>
  );
};

TournamentListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired
};

export { TournamentListHeader };

export default createContainer(() => {
  return {
    browserHistory,
    meteorCall: Meteor.call,
    Session
  };
}, TournamentListHeader);
