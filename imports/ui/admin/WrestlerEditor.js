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
			parents: [],
			emails: [],
			phones: [],
			applications: [],
			selectedApplication: undefined,
			isEditable: false
		};

		// bind field listeners to this context. remaining listeners are bound
		// manually, as they take additional parameters.

		this.onNameChange = this.onNameChange.bind(this);
		this.onDobChange = this.onDobChange.bind(this);
		this.onGradeChange = this.onGradeChange.bind(this);
		this.onWeightChange = this.onWeightChange.bind(this);
		this.onAddParent = this.onAddParent.bind(this);
		this.onAddEmail = this.onAddEmail.bind(this);
		this.onAddPhone = this.onAddPhone.bind(this);
		this.onApplicationSelect = this.onApplicationSelect.bind(this);
		this.onToggleEditApplication = this.onToggleEditApplication.bind(this);
	}

	// TODO - why did mount versus will mount (which is what the tournament editor has)?

	componentDidMount() {
		if (this.props.wrestler) {
			this.setState({
				...this.props.wrestler,
				selectedApplication: this.props.wrestler.applications.length > 0 ? this.props.wrestler.applications[0].tournamentId : undefined
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const currWrestlerId = this.props.wrestler ? this.props.wrestler._id : undefined;
		const prevWrestlerId = prevProps.wrestler ? prevProps.wrestler._id : undefined;

		if (currWrestlerId && currWrestlerId !== prevWrestlerId) {
			this.setState({
				...this.props.wrestler,
				selectedApplication: this.props.wrestler.applications.length > 0 ? this.props.wrestler.applications[0].tournamentId : undefined
			});
		}
	}

	/**
	 * Associates a parent with this Wrestler.
	 */

	onAddParent() {
		const parents = this.state.parents;

		parents.push({ name: '', valid: false });
		this.setState({ parents });
		this.props.call('wrestlers.update', this.props.wrestler._id, { parents });
	}

	/**
	 * Removes the association between a parent and this Wrestler.
	 *
	 * @param index - the index of the parents array at which the association
	 *                should be broken
	 */

	onDeleteParent(index) {
		const parents = this.state.parents;

		parents.splice(index, 1);
		this.setState({ parents });
		this.props.call('wrestlers.update', this.props.wrestler._id, { parents });
	}

	/**
	 * Associates an email address with this Wrestler.
	 */

	onAddEmail() {
		const emails = this.state.emails;

		emails.push({ text: '', valid: false });
		this.setState({ emails });
		this.props.call('wrestlers.update', this.props.wrestler._id, { emails });
	}

	/**
	 * Removes the association between an email address and this Wrestler.
	 *
	 * @param index - the index of the emails array at which the association
	 *                should be broken
	 */

	onDeleteEmail(index) {
		const emails = this.state.emails;

		emails.splice(index, 1);
		this.setState({ emails });
		this.props.call('wrestlers.update', this.props.wrestler._id, { emails });
	}

	/**
	 * Associates a phone number with this Wrestler.
	 */

	onAddPhone() {
		const phones = this.state.phones;

		phones.push({ number: '', valid: false });
		this.setState({ phones });
		this.props.call('wrestlers.update', this.props.wrestler._id, { phones });
	}

	/**
	 * Removes the association between a phone number and this Wrestler.
	 *
	 * @param index - the index in the phone numbers array at which the
	 *                association should be broken
	 */

	onDeletePhone(index) {
		const phones = this.state.phones;

		phones.splice(index, 1);
		this.setState({ phones });
		this.props.call('wrestlers.update', this.props.wrestler._id, { phones });
	}

	/**
	 * Updates the selected application state field.
	 *
	 * @param e - the change event
	 */

	onApplicationSelect(e) {
		const selectedApplication = e.target.value;

		if (selectedApplication) {
			this.setState({ selectedApplication });
		} else {
			this.setState({ selectedApplication: undefined });
		}
	}

	/**
	 * Updates the name of this Wrestler.
	 *
	 * @param e - the change event
	 */

	onNameChange(e) {
		const name = e.target.value;

		this.setState({ name });
		this.props.call('wrestlers.update', this.props.wrestler._id, { name });
	}

	/**
	 * Updates the birthday of this Wrestler.
	 *
	 * @param e - the change event
	 */

	onDobChange(e) {
		const dob = e.target.value;

		this.setState({ dob });
		this.props.call('wrestlers.update', this.props.wrestler._id, { dob });
	}

	/**
	 * Updates the grade of this Wrestler.
	 *
	 * @param e - the change event
	 */

	onGradeChange(e) {
		const grade = e.target.value;

		this.setState({ grade });
		this.props.call('wrestlers.update', this.props.wrestler._id, { grade });
	}

	/**
	 * Updates the weight of this Wrestler.
	 *
	 * @param e - the change event
	 */

	onWeightChange(e) {
		const weight = e.target.value;

		this.setState({ weight });
		this.props.call('wrestlers.update', this.props.wrestler._id, { weight });
	}

	/**
	 * Updates the name of an associated parent of this Wrestler.
	 *
	 * @param index - the index of the associated parents array to update
	 * @param e - the change event
	 */

	onParentChange(index, e) {
		const parents = this.state.parents;

		parents[index] = { name: e.target.value, valid: true };
		this.setState({ parents });
		this.props.call('wrestlers.update', this.props.wrestler._id, { parents });
	}

	/**
	 * Updates an email associated with this Wrestler.
	 *
	 * @param index - the index of the associated emails array to update
	 * @param e - the change event
	 */

	onEmailChange(index, e) {
		const emails = this.state.parents;

		emails[index] = { text: e.target.value, valid: true };
		this.setState({ emails });
		this.props.call('wrestlers.update', this.props.wrestler._id, { emails });
	}

	/**
	 * Updates a phone number associated with this Wrestler.
	 *
	 * @param index - the index of the associated phone numbers array to update
	 * @param e - the change event
	 */

	onPhoneChange(index, e) {
		const phones = this.state.parents;

		phones[index] = { number: e.target.value, valid: true };
		this.setState({ phones });
		this.props.call('wrestlers.update', this.props.wrestler._id, { phones });
	}

	onToggleEditApplication() {
		document.getElementById('application-age-division').disabled = this.state.isEditable;
		document.getElementById('application-weight-class').disabled = this.state.isEditable;
		document.getElementById('application-edit-button').innerHTML = (!this.state.isEditable ? 'Save' : 'Edit');

		this.setState({ isEditable: !this.state.isEditable });
	}

	/**
	 * Renders this component to the browser.
	 *
	 * @return the JSX markup
	 */

	render() {
		if (this.props.wrestler) {
			return (
				<div className="container">
					<div className="editor">
						<input id="name" className="editor__title" value={this.state.name} placeholder="Unknown Wrestler" onChange={this.onNameChange} />
						<label className="editor__label">
							<p>Date of Birth</p>
							<input id="dob" name="dob" type="text" className="editor__field" value={this.state.dob} placeholder="DOB" onChange={this.onDobChange} />
						</label>
						<label className="editor__label">
							<p>Grade</p>
							<input id="grade" name="grade" type="text" className="editor__field" value={this.state.grade} placeholder="Grade" onChange={this.onGradeChange} />
						</label>
						<label className="editor__label">
							<p>Weight</p>
							<input id="weight" name="weight" type="text" className="editor__field" value={this.state.weight} placeholder="Weight" onChange={this.onWeightChange} />
						</label>
						<label className="editor__label">
							<p className="editor__dynamic-label">Parent <img className="editor__add" src="/images/add-button.svg" onClick={this.onAddParent} /></p>
							{this.state.parents.map((parent, index, parents) => {
								if (index === 0) {
									return (
										<div key={index} className="editor__dynamic-field">
											<input id="parent" name="parent" type="text" className="editor__field" value={this.state.parents[index].name} placeholder="Parent" onChange={this.onParentChange.bind(this, index)} />
										</div>
									);
								} else {
									return (
										<div key={index} className="editor__dynamic-field">
											<input id="parent" name="parent" type="text" className="editor__field" value={this.state.parents[index].name} placeholder="Parent" onChange={this.onParentChange.bind(this, index)} />
											<img className="editor__delete" src="/images/remove-button.svg" onClick={this.onDeleteParent.bind(this, index)} />
										</div>
									);
								}
							})}
						</label>
						<label className="editor__label">
							<p className="editor__dynamic-label">Email <img className="editor__add" src="/images/add-button.svg" onClick={this.onAddEmail} /></p>
							{this.state.emails.map((email, index, emails) => {
								if (index === 0) {
									return (
										<div key={index} className="editor__dynamic-field">
											<input id="email" name="email" type="email" className="editor__field" value={this.state.emails[index].text} placeholder="Email" onChange={this.onEmailChange.bind(this, index)} />
										</div>
									);
								} else {
									return (
										<div key={index} className="editor__dynamic-field">
											<input id="email" name="email" type="email" className="editor__field" value={this.state.emails[index].text} placeholder="Email" onChange={this.onEmailChange.bind(this, index)} />
											<img className="editor__delete" src="/images/remove-button.svg" onClick={this.onDeleteEmail.bind(this, index)} />
										</div>
									);
								}
							})}
						</label>
						<label className="editor__label">
							<p className="editor__dynamic-label">Phone <img className="editor__add" src="/images/add-button.svg" onClick={this.onAddPhone} /></p>
							{this.state.phones.map((phone, index, phones) => {
								if (index === 0) {
									return (
										<div key={index} className="editor__dynamic-field">
											<input id="phone" name="phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" className="editor__field" value={this.state.phones[index].number} placeholder="Phone" onChange={this.onPhoneChange.bind(this, index)} />
										</div>
									);
								} else {
									return (
										<div key={index} className="editor__dynamic-field">
											<input id="phone" name="phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" className="editor__field" value={this.state.phones[index].number} placeholder="Phone" onChange={this.onPhoneChange.bind(this, index)} />
											<img className="editor__delete" src="/images/remove-button.svg" onClick={this.onDeletePhone.bind(this, index)} />
										</div>
									);
								}
							})}
						</label>
						<label className="editor__label editor__top-label">
							<p className="editor__dynamic-label">Applications</p>
							{this.state.applications.length > 0 ?
								<div className="editor__application-header">
									<select className={this.state.selectedApplication ? 'editor__dropdown-menu selected' : 'editor__dropdown-menu'} value={this.state.selectedApplication} onChange={this.onApplicationSelect}>
										<optgroup label="Open Applications">
											{this.state.applications.map((application, index, applications) => {
												if (application.open) {
													return (
														<option key={index} value={application.tournamentId}>{application.name}</option>
													);
												}
											})}
										</optgroup>
										<optgroup label="Past Applications">
											{this.state.applications.map((application, index, applications) => {
												if (!application.open) {
													return (
														<option key={index} value={application.tournamentId}>{application.name}</option>
													);
												}
											})}
										</optgroup>
									</select>
									<button id="application-edit-button" onClick={this.onToggleEditApplication}>Edit</button>
								</div> : <div className="editor__message editor__no-applications">No Applications to Display</div>
							}
						</label>
						{this.state.applications.map((application) => {
							if (application.tournamentId === this.state.selectedApplication) {
								return (
									<div key={application.tournamentId} className={'editor__dropdown-content ' + (application.open ? 'editor__open-application' : 'editor__past-application')}>
										<label className="editor__label">
											<p>Tournament</p>
											<input id="application-tournament" name="tournament" className="editor__field" value={application.name} placeholder="Tournament" disabled />
										</label>
										<label className="editor__label">
											<p>Age Division</p>
											<input id="application-age-division" name="age-division" className="editor__field" value={application.division} placeholder="Age Division" disabled />
										</label>
										<label className="editor__label">
											<p>Weight Class</p>
											<input id="application-weight-class" name="weight-class" className={'editor__field' + (application.open ? ' editor__bottom-field' : '')} value={application.weightClass} placeholder="Weight Class" disabled />
										</label>
										{!application.open ?
											<label className="editor__label">
												<p>Status</p>
												<input id="status" name="status" className="editor__field editor__bottom-field" value={application.status} placeholder="Status" disabled />
											</label> : undefined
										}
									</div>
								);
							}
						})}
					</div>
				</div>
			);
		} else {
			return (
				<div className="container">
					<div className="editor">
						<p className="editor__message">{this.props.selectedWrestlerId ? 'Wrestler not found.' : 'Select or add a Wrestler to get started.'}</p>
					</div>
				</div>
			);
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

WrestlerEditor.propTypes = {
	wrestler: PropTypes.object,
	selectedWrestlerId: PropTypes.string,
	call: PropTypes.func.isRequired,
	browserHistory: PropTypes.object.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
	const selectedWrestlerId = Session.get('selectedWrestlerId');

	return {
		selectedWrestlerId,
		wrestler: Wrestlers.findOne(selectedWrestlerId),
		call: Meteor.call,
		browserHistory
	};
}, WrestlerEditor);
