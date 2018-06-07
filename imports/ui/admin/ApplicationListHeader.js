import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import swal from 'sweetalert2';
import { browserHistory } from 'react-router';

import { Tournaments } from '../../api/tournaments';
import ApplicationListFilters from './ApplicationListFilters';

const ApplicationListHeader = (props) => {
  const onAddApplication = () => {
    if (props.tournaments.length > 0) {
      const publishedTournaments = props.tournaments.map((tournament) => {
        return {
          id: tournament._id, value: tournament.name + ' (' + tournament.division + ') - ' + tournament.date
        };
      });

      const options = {};
      $.map(publishedTournaments, function(publishedTournament) {
        options[publishedTournament.id] = publishedTournament.value;
      });

      swal({
        titleText: 'Select a Tournament',
        input: 'select',
        inputPlaceholder: '--Tournament--',
        inputOptions: options,
        type: 'info',
        showCancelButton: true,
        cancelButtonClass: 'modal-button button--cancel',
        confirmButtonText: 'Save',
        confirmButtonClass: 'modal-button button--save',
        confirmButtonColor: '#2e8b57',
        reverseButtons: true,
        customClass: 'swal-modal'
      }).then((response) => {
        if (response.value) {
          const associatedTournament = Tournaments.findOne(response.value);

          props.meteorCall('applications.submit', {
            tournament: {
              name: associatedTournament.name,
              location: associatedTournament.location,
              startDate: associatedTournament.startDate,
              division: associatedTournament.division
            },
            wrestler: {
              name: '',
              dob: '',
              grade: '',
              parentName: '',
              parentEmail: '',
              parentPhone: ''
            },
            weightClass: '',
            crossReferenced: false
          }, (error, result) => {
            if (result) {
              props.Session.set('selectedApplicationId', result);
            }
          });
        }
      });
    } else {
      swal({
        titleText: 'No Tournaments',
        html: '<div class="swal-modal-text">There are no published Tournaments. Create and publish a Tournament before adding an Application.</div>',
        type: 'info',
        confirmButtonColor: '#5a5a5a',
        confirmButtonClass: 'modal-button button--unpublish',
        customClass: 'swal-modal'
      });
    }
  };

  /*
   * Deletes one or more tournaments simultaneously based on multiselection.
   */

  const onDeleteApplications = () => {
    const selectedId = props.Session.get('selectedApplicationId');
    const applicationIds = props.Session.get('multiselectedApplicationIds');

    if (applicationIds.length > 0 || selectedId) {
      swal({
        titleText: 'Are you sure?',
        html: '<div class="swal-modal-text">You\'re about to delete ' + (applicationIds.length > 0 ? applicationIds.length + ' Applications.' : 1 + ' Application.') + '</div>',
        type: 'warning',
        showCancelButton: true,
        cancelButtonClass: 'modal-button button--cancel',
        confirmButtonText: 'Delete',
        confirmButtonClass: 'modal-button button--delete',
        confirmButtonColor: '#e64942',
        reverseButtons: true,
        customClass: 'swal-modal'
      }).then((response) => {
        if (response.value) {
          if (applicationIds.length > 0) {
            applicationIds.forEach((applicationId) => {
              props.meteorCall('applications.remove', applicationId);
            });
          } else if (selectedId) {
            props.meteorCall('applications.remove', selectedId);
          }

          props.browserHistory.push('/applications');
        }
      });
    } else {
      swal({
        titleText: 'No Application Selected',
        html: '<div class="swal-modal-text">You\'ll need to select at least one Application to delete.</div>',
        type: 'info',
        confirmButtonColor: '#e64942',
        confirmButtonClass: 'modal-button button--delete',
        customClass: 'swal-modal'
      });
    }
  };

  return (
    <div className="item-list__header">
      <button className="button--add" onClick={onAddApplication}>Add Application</button>
      <button className="button button--delete" onClick={onDeleteApplications}>Delete</button>
      <ApplicationListFilters/>
    </div>
  );
};

ApplicationListHeader.propTypes = {
  tournaments: PropTypes.array.isRequired,
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired
};

export { ApplicationListHeader };

export default createContainer(() => {
  Meteor.subscribe('tournaments');

  return {
    browserHistory,
    tournaments: Tournaments.find({
      published: true
    }).fetch().map((tournament) => {
      return {
        _id: tournament._id,
        name: tournament.name,
        date: tournament.startDate,
        division: tournament.division
      };
    }),
    meteorCall: Meteor.call,
    Session
  };
}, ApplicationListHeader);
