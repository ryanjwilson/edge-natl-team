import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import swal from 'sweetalert2';
import { browserHistory } from 'react-router';

import WrestlerListFilters from './WrestlerListFilters';

const WrestlerListHeader = (props) => {
  const onAddWrestler = () => {
    props.Session.set('multiselectedWrestlerIds', []);      // clear multiselect list

    props.meteorCall('wrestlers.insert', (err, res) => {
      if (res) {
        props.Session.set('selectedWrestlerId', res);
      }
    });
  };

  /*
   * Deletes one or more wrestlers simultaneously based on multiselection.
   */

  const onDeleteWrestlers = () => {
    const wrestlerIds = props.Session.get('multiselectedWrestlerIds');

    if (wrestlerIds.length === 0) {
      swal({
        titleText: 'No Wrestler Selected',
        html: '<div class="swal-modal-text">You\'ll need to select at least one Wrestler to delete.</div>',
        type: 'info',
        confirmButtonColor: '#e64942',
        confirmButtonClass: 'modal-button button--delete',
        customClass: 'swal-modal'
      });
    } else {
      swal({
        titleText: 'Are you sure?',
        html: '<div class="swal-modal-text">You\'re about to delete ' + wrestlerIds.length + (wrestlerIds.length > 1 ? ' Wrestlers.' : ' Wrestler.') + '</div>',
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
          wrestlerIds.forEach((wrestlerId) => {
            props.meteorCall('wrestlers.remove', wrestlerId);
          });

          props.browserHistory.push('/wrestlers');
        }
      });
    }
  };

  // TODO - add onMergeWrestlers function

  return (
    <div className="item-list__header">
      <button className="button--add" onClick={onAddWrestler}>Add Wrestler</button>
      <div className="multiselect-group two">
        <button className="button button--unpublish" onClick={() => { }}>Merge</button>
        <button className="button button--delete" onClick={onDeleteWrestlers}>Delete</button>
      </div>
      <WrestlerListFilters/>
    </div>
  );
};

WrestlerListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired
};

export { WrestlerListHeader };

export default createContainer(() => {
  return {
    browserHistory,
    meteorCall: Meteor.call,
    Session
  };
}, WrestlerListHeader);
