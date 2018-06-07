import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import swal from 'sweetalert2';

import { Applications } from '../../api/applications';

export class ApplicationEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tournament: {
        name: '',
        location: '',
        date: '',
        division: ''
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
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onDobChange = this.onDobChange.bind(this);
    this.onGradeChange = this.onGradeChange.bind(this);
    this.onParentNameChange = this.onParentNameChange.bind(this);
    this.onParentEmailChange = this.onParentEmailChange.bind(this);
    this.onParentPhoneChange = this.onParentPhoneChange.bind(this);
    this.onWeightChange = this.onWeightChange.bind(this);
    this.onDelete = this.onDelete.bind(this);

    // TODO - status changes: updateStatus (starter, split, alternate), clearStatus
    // TODO - email/text capability from directly within the app?
  }

  onNameChange(e) {
    const name = e.target.value;
    const wrestler = {
      name,
      dob: this.state.wrestler.dob,
      grade: this.state.wrestler.grade,
      parentName: this.state.wrestler.parentName,
      parentEmail: this.state.wrestler.parentEmail,
      parentPhone: this.state.wrestler.parentPhone
    };

    this.setState({ wrestler });
    this.props.call('applications.update', this.props.application._id, {
      wrestler,
      crossReferenced: this.props.application.crossReferenced
    });

    // TODO - update associated wrestler?
  }

  onDobChange(e) {
    const dob = e.target.value;
    const wrestler = {
      name: this.state.wrestler.name,
      dob,
      grade: this.state.wrestler.grade,
      parentName: this.state.wrestler.parentName,
      parentEmail: this.state.wrestler.parentEmail,
      parentPhone: this.state.wrestler.parentPhone
    };

    this.setState({ wrestler });
    this.props.call('applications.update', this.props.application._id, {
      wrestler,
      crossReferenced: this.props.application.crossReferenced
    });

    // TODO - update associated wrestler?
  }

  onGradeChange(e) {
    const grade = e.target.value;
    const wrestler = {
      name: this.state.wrestler.name,
      dob: this.state.wrestler.dob,
      grade,
      parentName: this.state.wrestler.parentName,
      parentEmail: this.state.wrestler.parentEmail,
      parentPhone: this.state.wrestler.parentPhone
    };

    this.setState({ wrestler });
    this.props.call('applications.update', this.props.application._id, {
      wrestler,
      crossReferenced: this.props.application.crossReferenced
    });

    // TODO - update associated wrestler?
  }

  onParentNameChange(e) {
    const parentName = e.target.value;
    const wrestler = {
      name: this.state.wrestler.name,
      dob: this.state.wrestler.dob,
      grade: this.state.wrestler.grade,
      parentName,
      parentEmail: this.state.wrestler.parentEmail,
      parentPhone: this.state.wrestler.parentPhone
    };

    this.setState({ wrestler });
    this.props.call('applications.update', this.props.application._id, {
      wrestler,
      crossReferenced: this.props.application.crossReferenced
    });

    // TODO - update associated wrestler?
  }

  onParentEmailChange(e) {
    const parentEmail = e.target.value;
    const wrestler = {
      name: this.state.wrestler.name,
      dob: this.state.wrestler.dob,
      grade: this.state.wrestler.grade,
      parentName: this.state.wrestler.parentName,
      parentEmail,
      parentPhone: this.state.wrestler.parentPhone
    };

    this.setState({ wrestler });
    this.props.call('applications.update', this.props.application._id, {
      wrestler,
      crossReferenced: this.props.application.crossReferenced
    });

    // TODO - update associated wrestler?
  }

  onParentPhoneChange(e) {
    const parentPhone = e.target.value;
    const wrestler = {
      name: this.state.wrestler.name,
      dob: this.state.wrestler.dob,
      grade: this.state.wrestler.grade,
      parentName: this.state.wrestler.parentName,
      parentEmail: this.state.wrestler.parentEmail,
      parentPhone
    };

    this.setState({ wrestler });
    this.props.call('applications.update', this.props.application._id, {
      wrestler,
      crossReferenced: this.props.application.crossReferenced
    });

    // TODO - update associated wrestler?
  }

  onWeightChange(e) {
    const weightClass = e.target.value;
    this.setState({ weightClass });
    this.props.call('applications.update', this.props.application._id, {
      weightClass,
      crossReferenced: this.props.application.crossReferenced
    });

    // TODO - update associated wrestler?
  }

  onDelete() {
    swal({
      titleText: 'Are you sure?',
      text: 'You cannot undo this action!',
      type: 'warning',
      showCancelButton: true,
      cancelButtonClass: 'modal-button button--cancel',
      confirmButtonText: 'Delete',
      confirmButtonClass: 'modal-button button--delete',
      confirmButtonColor: '#e64942',
      reverseButtons: true
    }).then((response) => {
      if (response && response.value) {
        this.props.call('applications.remove', this.props.application._id);
        this.props.browserHistory.push('/applications');
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const currApplicationId = this.props.application ? this.props.application._id : undefined;
    const prevApplicationId = prevProps.application ? prevProps.application._id : undefined;

    if (currApplicationId && currApplicationId !== prevApplicationId) {
      this.setState({
        tournament: {
          name: this.props.application.tournament.name || '',
          location: this.props.application.tournament.location || '',
          date: this.props.application.tournament.startDate || '',
          division: this.props.application.tournament.division || ''
        },
        wrestler: {
          name: this.props.application.wrestler.name || '',
          dob: this.props.application.wrestler.dob || '',
          grade: this.props.application.wrestler.grade || '',
          parentName: this.props.application.wrestler.parentName || '',
          parentEmail: this.props.application.wrestler.parentEmail || '',
          parentPhone: this.props.application.wrestler.parentPhone || ''
        },
        weightClass: this.props.application.weightClass || '',
        crossReferenced: this.props.application.crossReferenced || false
      });
    }
  }

  render() {
    if (this.props.application) {
      return (
        <div className="editor">
          <input id="tournament-name" className="editor__title" value={this.state.tournament.name} placeholder="Untitled Tournament" readOnly/>
          <label className="editor__label">
            <p>Location</p>
            <input id="location" name="location" className="editor__field" value={this.state.tournament.location} placeholder="Location" readOnly/>
          </label>
          <label className="editor__label">
            <p>Date</p>
            <input id="start-date" name="date" className="editor__field" value={this.state.tournament.date} placeholder="Start Date" readOnly/>
          </label>
          <label className="editor__label">
            <p>Age Division</p>
            <input id="division" name="division" className="editor__field" value={this.state.tournament.division} placeholder="Age Division" readOnly/>
          </label>
          <input id="wrestler-name" className="editor__title" value={this.state.wrestler.name} placeholder="Unknown Wrestler" onChange={this.onNameChange}/>
          <label className="editor__label">
            <p>Weight Class</p>
            <input id="weight" name="weight" className="editor__field" value={this.state.weightClass} placeholder="Weight Class" onChange={this.onWeightChange}/>
          </label>
          <label className="editor__label">
            <p>Date of Birth</p>
            <input id="dob" name="dob" className="editor__field" value={this.state.wrestler.dob} placeholder="DOB" onChange={this.onDobChange}/>
          </label>
          <label className="editor__label">
            <p>Grade</p>
            <input id="grade" name="grade" className="editor__field" value={this.state.wrestler.grade} placeholder="Grade" onChange={this.onGradeChange}/>
          </label>
          <label className="editor__label">
            <p>Parent's Name</p>
            <input id="parent-name" name="parent-name" className="editor__field" value={this.state.wrestler.parentName} placeholder="Parent's Name" onChange={this.onParentNameChange}/>
          </label>
          <label className="editor__label">
            <p>Parent's Email</p>
            <input id="parent-email" name="parent-email" className="editor__field" value={this.state.wrestler.parentEmail} placeholder="Parent's Email" onChange={this.onParentEmailChange}/>
          </label>
          <label className="editor__label">
            <p>Parent's Phone</p>
            <input id="parent-phone" name="parent-phone" className="editor__field" value={this.state.wrestler.parentPhone} placeholder="Parent's Phone" onChange={this.onParentPhoneChange}/>
          </label>
        </div>
      );
    } else {
      return (
        <div className="editor">
          <p className="editor__message">{this.props.selectedApplicationId ? 'Application not found.' : 'Select or add an Application to get started.'}</p>
        </div>
      );
    }
  }
}

ApplicationEditor.propTypes = {
  application: PropTypes.object,
  selectedApplicationId: PropTypes.string,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired
};

export default createContainer(() => {
  const selectedApplicationId = Session.get('selectedApplicationId');

  return {
    selectedApplicationId,
    application: Applications.findOne(selectedApplicationId),
    call: Meteor.call,
    browserHistory
  };
}, ApplicationEditor);
