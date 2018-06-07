import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import swal from 'sweetalert2';

import { Wrestlers } from '../../api/wrestlers';

export class WrestlerEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      dob: '',
      grade: '',
      weight: '',
      parentName: '',
      parentEmail: '',
      parentPhone: ''
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onDobChange = this.onDobChange.bind(this);
    this.onGradeChange = this.onGradeChange.bind(this);
    this.onWeightChange = this.onWeightChange.bind(this);
    this.onParentNameChange = this.onParentNameChange.bind(this);
    this.onParentEmailChange = this.onParentEmailChange.bind(this);
    this.onParentPhoneChange = this.onParentPhoneChange.bind(this);
  }

  onNameChange(e) {
    const name = e.target.value;
    this.setState({ name });
    this.props.call('wrestlers.update', this.props.wrestler._id, { name });
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

  componentDidMount() {
    if (this.props.wrestler) {
      this.setState({
        name: this.props.wrestler.name || '',
        dob: this.props.wrestler.dob || '',
        grade: this.props.wrestler.grade || '',
        weight: this.props.wrestler.weight || '',
        parentName: this.props.wrestler.parentName || '',
        parentEmail: this.props.wrestler.parentEmail || '',
        parentPhone: this.props.wrestler.parentPhone || ''
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const currWrestlerId = this.props.wrestler ? this.props.wrestler._id : undefined;
    const prevWrestlerId = prevProps.wrestler ? prevProps.wrestler._id : undefined;

    if (currWrestlerId && currWrestlerId !== prevWrestlerId) {
      this.setState({
        name: this.props.wrestler.name || '',
        dob: this.props.wrestler.dob || '',
        grade: this.props.wrestler.grade || '',
        weight: this.props.wrestler.weight || '',
        parentName: this.props.wrestler.parentName || '',
        parentEmail: this.props.wrestler.parentEmail || '',
        parentPhone: this.props.wrestler.parentPhone || ''
      });
    }
  }

  render() {
    if (this.props.wrestler) {
      return (
        <div className="editor">
          <input id="name" className="editor__title" value={this.state.name} placeholder="Unknown Wrestler" onChange={this.onNameChange}/>
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
