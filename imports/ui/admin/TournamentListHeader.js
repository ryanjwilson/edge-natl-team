import React from 'react';
import swal from 'sweetalert2';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';

import TournamentListFilters from './TournamentListFilters';

/**
 * A TournamentListHeader component holds the action buttons pertaining to the
 * TournamentList component, as well as the TournamentListFilters component.
 *
 * @param props - the initializing properties passed to this component
 */

export const TournamentListHeader = (props) => {

  /**
   * Adds a new Tournament to the TournamentList.
   */

  const onAddTournament = () => {
    props.Session.set('multiselectedTournamentIds', []);    // clear any previously multiselected tournaments

    props.meteorCall('tournaments.insert', (err, res) => {
      if (res) {
        props.Session.set('selectedTournamentId', res);
      }
    });
  };

  /**
   * Publishes one or more Tournaments simultaneously based on user selection.
   */

  const onShowTournaments = () => {
    let tournamentIds = props.Session.get('multiselectedTournamentIds');

    if (tournamentIds.length === 0 && props.Session.get('selectedTournamentId')) {
      tournamentIds.push(props.Session.get('selectedTournamentId'));
    }
    
    if (tournamentIds.length === 0) {
      swal({
        titleText: 'No Tournament Selected',
        html: '<div class="swal-modal-text">You\'ll need to select at least one Tournament to publish.</div>',
        type: 'info',
        confirmButtonColor: '#2e8b57',
        confirmButtonClass: 'modal-button button--publish',
        customClass: 'swal-modal'
      });
    } else {
      swal({
        titleText: 'Are you sure?',
        html: '<div class="swal-modal-text">You\'re about to publish ' + tournamentIds.length + (tournamentIds.length > 1 ? ' Tournaments.' : ' Tournament.') + '</div>',
        type: 'warning',
        showCancelButton: true,
        cancelButtonClass: 'modal-button button--cancel',
        confirmButtonText: 'Show',
        confirmButtonClass: 'modal-button button--publish',
        confirmButtonColor: '#2e8b57',
        reverseButtons: true,
        customClass: 'swal-modal'
      }).then((response) => {
        if (response && response.value) {
          tournamentIds.forEach((tournamentId) => {
            props.meteorCall('tournaments.update', tournamentId, { published: true });
          });
        }
      });
    }
  };

  /**
   * Unpublishes one or more tournaments simultaneously based on user selection.
   */

  const onHideTournaments = () => {
    let tournamentIds = props.Session.get('multiselectedTournamentIds');

    if (tournamentIds.length === 0 && props.Session.get('selectedTournamentId')) {
      tournamentIds.push(props.Session.get('selectedTournamentId'));
    }

    if (tournamentIds.length === 0) {
      swal({
        titleText: 'No Tournament Selected',
        html: '<div class="swal-modal-text">You\'ll need to select at least one Tournament to unpublish.</div>',
        type: 'info',
        confirmButtonColor: '#5a5a5a',
        confirmButtonClass: 'modal-button button--unpublish',
        customClass: 'swal-modal'
      });
    } else {
      swal({
        titleText: 'Are you sure?',
        html: '<div class="swal-modal-text">You\'re about to unpublish ' + tournamentIds.length + (tournamentIds.length > 1 ? ' tournaments.' : ' tournament.') + '</div>',
        type: 'warning',
        showCancelButton: true,
        cancelButtonClass: 'modal-button button--cancel',
        confirmButtonText: 'Hide',
        confirmButtonClass: 'modal-button button--unpublish',
        confirmButtonColor: '#5a5a5a',
        reverseButtons: true,
        customClass: 'swal-modal'
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
   * Deletes one or more tournaments simultaneously based on user selection.
   */

  const onDeleteTournaments = () => {
    let tournamentIds = props.Session.get('multiselectedTournamentIds');

    if (tournamentIds.length === 0 && props.Session.get('selectedTournamentId')) {
      tournamentIds.push(props.Session.get('selectedTournamentId'));
    }

    if (tournamentIds.length === 0) {
      swal({
        titleText: 'No Tournament Selected',
        html: '<div class="swal-modal-text">You\'ll need to select at least one Tournament to delete.</div>',
        type: 'info',
        confirmButtonColor: '#e64942',
        confirmButtonClass: 'modal-button button--unpublish',
        customClass: 'swal-modal'
      });
    } else {
      swal({
        titleText: 'Are you sure?',
        html: '<div class="swal-modal-text">You\'re about to delete ' + tournamentIds.length + (tournamentIds.length > 1 ? ' tournaments.' : ' tournament.') + '</div>',
        type: 'warning',
        showCancelButton: true,
        cancelButtonClass: 'modal-button button--cancel',
        confirmButtonText: 'Delete',
        confirmButtonClass: 'modal-button button--delete',
        confirmButtonColor: '#e64942',
        reverseButtons: true,
        customClass: 'swal-modal'
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

  // return a TournamentListHeader component, which is comprised of Add, Show,
  // Hide, and Delete buttons, as well as a TournamentListFilters component.

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

TournamentListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  return {
    browserHistory,
    meteorCall: Meteor.call,
    Session
  };
}, TournamentListHeader);
