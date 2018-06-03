import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import swal from 'sweetalert2';

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
        confirmButtonText: 'Save',
        confirmButtonClass: 'modal-button button--save',
        confirmButtonColor: '#2e8b57',
        reverseButtons: true
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
          }, (err, res) => {
            if (res) {
              props.Session.set('selectedApplicationId', res);
            }
          });
        }
      });
    } else {
      // TODO - prevent adding application
    }
  };

  return (
    <div className="item-list__header">
      <button className="button--add" onClick={onAddApplication}>Add Application</button>
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
