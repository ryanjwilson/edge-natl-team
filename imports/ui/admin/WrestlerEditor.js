import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import swal from 'sweetalert';

import { Wrestlers } from '../../api/wrestlers';

export class WrestlerEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      dob: '',
      grade: '',
      weight: '',
      lastWrestled: '',
      parentName: '',
      parentEmail: '',
      parentPhone: ''
    };

    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onDobChange = this.onDobChange.bind(this);
    this.onGradeChange = this.onGradeChange.bind(this);
    this.onWeightChange = this.onWeightChange.bind(this);
    this.onLastWrestledChange = this.onLastWrestledChange.bind(this);
    this.onParentNameChange = this.onParentNameChange.bind(this);
    this.onParentEmailChange = this.onParentEmailChange.bind(this);
    this.onParentPhoneChange = this.onParentPhoneChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onFirstNameChange(e) {
    const firstName = e.target.value;
    this.setState({ firstName });
    this.props.call('wrestlers.update', this.props.wrestler._id, { firstName });
  }

  onLastNameChange(e) {
    const lastName = e.target.value;
    this.setState({ lastName });
    this.props.call('wrestlers.update', this.props.wrestler._id, { lastName });
  }

  onDobChange(e) {
    const dob = e.target.value;
    this.setState({ dob });
    this.props.call('wrestlers.update', this.props.wrestler._id, { dob });
  }

  onGradeChange(e) {
    const grade = e.target.value;
    this.setState({ grade });
    this.props.call('wrestlers.update', this.props.wrestler._id, { grade });
  }

  onWeightChange(e) {
    const weight = e.target.value;
    this.setState({ weight });
    this.props.call('wrestlers.update', this.props.wrestler._id, { weight });
  }

  onLastWrestledChange(e) {
    const lastWrestled = e.target.value;
    this.setState({ lastWrestled });
    this.props.call('wrestlers.update', this.props.wrestler._id, { lastWrestled });
  }

  onParentNameChange(e) {
    const parentName = e.target.value;
    this.setState({ parentName });
    this.props.call('wrestlers.update', this.props.wrestler._id, { parentName });
  }

  onParentEmailChange(e) {
    const parentEmail = e.target.value;
    this.setState({ parentEmail });
    this.props.call('wrestlers.update', this.props.wrestler._id, { parentEmail });
  }

  onParentPhoneChange(e) {
    const parentPhone = e.target.value;
    this.setState({ parentPhone });
    this.props.call('wrestlers.update', this.props.wrestler._id, { parentPhone });
  }

  onDelete() {
    swal({
      title: "Are you sure?",
      text: "After deleting, you cannot undo this action!",
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancel",
          value: null,
          visible: true,
          className: "button--cancel",
          closeModal: true
        },
        confirm: {
          text: "Delete",
          value: true,
          visible: true,
          className: "button--delete",
          closeModal: true
        }
      }
    }).then((response) => {
      if (response) {
        console.log(this.props);
        this.props.call('wrestlers.remove', this.props.wrestler._id);
        this.props.browserHistory.push('/wrestlers');
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const currWrestlerId = this.props.wrestler ? this.props.wrestler._id : undefined;
    const prevWrestlerId = prevProps.wrestler ? prevProps.wrestler._id : undefined;

    if (currWrestlerId && currWrestlerId !== prevWrestlerId) {
      this.setState({
        firstName: this.props.wrestler.firstName,
        lastName: this.props.wrestler.lastName,
        dob: this.props.wrestler.dob,
        grade: this.props.wrestler.grade,
        weight: this.props.wrestler.weight,
        lastWrestled: this.props.wrestler.lastWrestled,
        parentName: this.props.wrestler.parentName,
        parentEmail: this.props.wrestler.parentEmail,
        parentPhone: this.props.wrestler.parentPhone
      });
    }
  }

  render() {
    if (this.props.wrestler) {
      return (
        <div className="editor">
          <input id="first-name" className="editor__title" value={this.state.firstName} placeholder="Unknown Wrestler" onChange={this.onFirstNameChange}/>
          <label className="editor__label">
            <p>Date of Birth</p>
            <input id="dob" name="dob" className="editor__field" value={this.state.dob} placeholder="DOB" onChange={this.onDobChange}/>
          </label>
          <label className="editor__label">
            <p>Grade</p>
            <input id="grade" name="grade" className="editor__field" value={this.state.grade} placeholder="Grade" onChange={this.onGradeChange}/>
          </label>
          <label className="editor__label">
            <p>Weight</p>
            <input id="weight" name="weight" className="editor__field" value={this.state.weight} placeholder="Weight" onChange={this.onWeightChange}/>
          </label>
          <label className="editor__label">
            <p>Last Wrestled</p>
            <input id="last-wrestled" name="last-wrestled" className="editor__field" value={this.state.lastWrestled} placeholder="Last Wrestled" onChange={this.onLastWrestledChange}/>
          </label>
          <label className="editor__label">
            <p>Parent's Name</p>
            <input id="parent-name" name="parent-name" className="editor__field" value={this.state.parentName} placeholder="Parent's Name" onChange={this.onParentNameChange}/>
          </label>
          <label className="editor__label">
            <p>Parent's Email</p>
            <input id="parent-email" name="parent-email" className="editor__field" value={this.state.parentEmail} placeholder="Parent's Email" onChange={this.parentEmail}/>
          </label>
          <label className="editor__label">
            <p>Parent's Phone</p>
            <input id="parent-phone" name="parent-phone" className="editor__field" value={this.state.parentPhone} placeholder="Parent's Phone" onChange={this.onParentPhoneChange}/>
          </label>
          <div className="action-group single-item">
            <button id="delete-button" className="button button--editor button--delete" onClick={this.onDelete}>Delete</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="editor">
          <p className="editor__message">{this.props.selectedWrestlerId ? 'Wrestler not found.' : 'Select or add a Wrestler to get started.'}</p>
        </div>
      );
    }
  }
}

WrestlerEditor.propTypes = {
  wrestler: PropTypes.object,
  selectedWrestlerId: PropTypes.string,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired
};

export default createContainer(() => {
  const selectedWrestlerId = Session.get('selectedWrestlerId');

  return {
    selectedWrestlerId,
    wrestler: Wrestlers.findOne(selectedWrestlerId),
    call: Meteor.call,
    browserHistory
  };
}, WrestlerEditor);
