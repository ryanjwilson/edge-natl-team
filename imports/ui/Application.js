import { Meteor } from "meteor/meteor";
import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import Modal from "react-modal";
import { Session } from "meteor/session";
import validator from "validator";

import { Tournaments } from "../api/tournaments";

/**
 * A component that represents a Tournament application to be filled out for a Wrestler.
 */

export class Application extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			isNameValid: false,
			dob: "",
			isDobValid: false,
			grade: "",
			isGradeValid: false,
			selectedGrade: "",
			parents: [{
				name: "",
				valid: false
			}],
			emails: [{
				text: "",
				valid: false
			}],
			phones: [{
				number: "",
				valid: false
			}],
			tournaments: props.tournaments,
			selectedTournaments: [],
			isConfirmationModalOpen: false,
			isDateSupported: this.isDateSupported()
		};

		this.onAddParent = this.onAddParent.bind(this);
		this.onAddEmail = this.onAddEmail.bind(this);
		this.onAddPhone = this.onAddPhone.bind(this);
		this.onNameChange = this.onNameChange.bind(this);
		this.onDobChange = this.onDobChange.bind(this);
		this.onGradeChange = this.onGradeChange.bind(this);
		this.onTournamentSelection = this.onTournamentSelection.bind(this);
		this.onSubmitApplication = this.onSubmitApplication.bind(this);
		this.onGoBack = this.onGoBack.bind(this);
		this.onShowConfirmationModal = this.onShowConfirmationModal.bind(this);
		this.onCloseConfirmationModal = this.onCloseConfirmationModal.bind(this);
		this.isDateSupported = this.isDateSupported.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.shouldRefreshTournaments(this.props.tournaments, nextProps.tournaments)) {
			this.setState({ tournaments: nextProps.tournaments });
		}
	}

	shouldRefreshTournaments(oldTournaments, newTournaments) {
		if (oldTournaments.length !== newTournaments.length) {
			return true;
		} else {
			oldTournaments.some((tournament, index) => {
				if (tournament._id !== newTournaments[index]._id) {
					return true;
				}
			});
		}
	}

	onAddParent() {
		const parents = this.state.parents;

		parents.push({ text: "", valid: false });
		this.setState({ parents });
	}

	onAddEmail() {
		const emails = this.state.emails;

		emails.push({ text: "", valid: false });
		this.setState({ emails });
	}

	onAddPhone() {
		const phones = this.state.phones;

		phones.push({ number: "", valid: false });
		this.setState({ phones });
	}

	onDeleteParent(index) {
		const parents = this.state.parents;

		parents.splice(index, 1);
		this.setState({ parents });
	}

	onDeleteEmail(index) {
		const emails = this.state.emails;

		emails.splice(index, 1);
		this.setState({ emails });
	}

	onDeletePhone(index) {
		const phones = this.state.phones;

		phones.splice(index, 1);
		this.setState({ phones });
	}

	onNameChange(e) {
		const name = e.target.value;
		const field = document.querySelector("#name-field");

		if (validator.isEmpty(name)) {
			if (!field.classList.contains("validation-error")) {
				field.classList.add("validation-error");
				this.setState({ isValidApplication: false });
			}
		} else {
			if (field.classList.contains("validation-error")) {
				field.classList.remove("validation-error");
				this.setState({ isValidApplication: true });
			}
		}

		this.setState({ name });
	}

	onParentChange(index, e) {
		const parent = e.target.value;
		const parents = this.state.parents;
		const field = document.querySelector("#parent-field-" + index);

		if (validator.isEmpty(parent)) {
			parents[index] = { name: parent, valid: false };

			if (!field.classList.contains("validation-error")) {
				field.classList.add("validation-error");
			}
		} else {
			parents[index] = { name: parent, valid: true };

			if (field.classList.contains("validation-error")) {
				field.classList.remove("validation-error");
			}
		}

		this.setState({ parents });
	}

	onEmailChange(index, e) {
		const email = e.target.value;
		const emails = this.state.emails;
		const field = document.querySelector("#email-field-" + index);

		if (validator.isEmail(email)) {
			emails[index] = { text: email, valid: true };

			if (field.classList.contains("validation-error")) {
				field.classList.remove("validation-error");
			}
		} else {
			emails[index] = { text: email, valid: false };

			if (!field.classList.contains("validation-error") && email.length > 0) {
				field.classList.add("validation-error");
			} else if (email.length === 0) {
				field.classList.remove("validation-error");
			}
		}

		this.setState({ emails });
	}

	onPhoneChange(index, e) {
		const phones = this.state.phones;
		const field = document.querySelector("#phone-field-" + index);

		if (validator.isMobilePhone(e.target.value, "en-US")) {
			phones[index] = { number: e.target.value, valid: true };

			if (field.classList.contains("validation-error")) {
				field.classList.remove("validation-error");
			}
		} else {
			phones[index] = { number: e.target.value, valid: false };

			if (!field.classList.contains("validation-error") && e.target.value.length > 0) {
				field.classList.add("validation-error");
			} else if (e.target.value.length === 0) {
				field.classList.remove("validation-error");
			}
		}

		this.setState({ phones });
	}

	onDobChange(e) {
		const dob = e.target.value;
		const field = document.querySelector("#dob-field");

		if (validator.isISO8601(dob) && dob.length === 10) {
			if (Number(dob.substring(0, 4)) > 999 &&
				Number(dob.substring(5, 7)) > 0 && Number(dob.substring(5, 7)) < 13 &&
				Number(dob.substring(8)) > 0 && Number(dob.substring(8)) < 32) {

				if (field.classList.contains("validation-error")) {
					field.classList.remove("validation-error");
				}
			} else {
				if (!field.classList.contains("validation-error")) {
					field.classList.add("validation-error");
				}
			}
		} else {
			if (!field.classList.contains("validation-error")) {
				field.classList.add("validation-error");
			}
		}

		this.setState({ dob });
	}

	onGradeChange(e) {
		const grade = e.target.value;
		const field = document.querySelector("#grade-field");

		if (validator.isEmpty(grade)) {
			if (!field.classList.contains("validation-error")) {
				field.classList.add("validation-error");
			}
		} else {
			if (grade >= 0 && grade <= 12) {
				if (field.classList.contains("validation-error")) {
					field.classList.remove("validation-error");
				}
			} else {
				if (!field.classList.contains("validation-error")) {
					field.classList.add("validation-error");
				}
			}
		}

		this.setState({ grade, selectedGrade: grade });
	}

	onTournamentSelection(e) {
		document.querySelector("#tournaments-field").classList.remove("validation-error");

		const selectedTournaments = [];
		const prevSelections = this.state.selectedTournaments;
		const options = e.target.options;

		for (let i = 0; i < options.length; i++) {
			if (options[i].selected) {
				selectedTournaments.push({
					tournamentId: options[i].value,
					tournamentName: this.state.tournaments.find((tournament) => tournament._id === options[i].value).name,
					divisions: this.state.tournaments.find((tournament) => tournament._id === options[i].value).divisions,
					weightClasses: this.state.tournaments.find((tournament) => tournament._id === options[i].value).divisions[0].weightClasses,
					selectedDivision: this.state.tournaments.find((tournament) => tournament._id === options[i].value).divisions[0].name,
					selectedWeightClass: this.state.tournaments.find((tournament) => tournament._id === options[i].value).divisions[0].weightClasses[0]
				});
			}
		}

		for (let j = 0; j < selectedTournaments.length; j++) {
			const prevSelection = prevSelections.find((prev) => prev.tournamentId === selectedTournaments[j].tournamentId);

			if (prevSelection) {
				selectedTournaments[j].weightClasses = prevSelection.weightClasses;
				selectedTournaments[j].selectedDivision = prevSelection.selectedDivision;
				selectedTournaments[j].selectedWeightClass = prevSelection.selectedWeightClass;
			}
		}

		this.setState({ selectedTournaments });
	}

	onDivisionSelection(selectedTournament, e) {
		const selectedTournaments = this.state.selectedTournaments;

		for (let i = 0; i < selectedTournaments.length; i++) {
			if (selectedTournaments[i].tournamentId === selectedTournament.tournamentId) {
				selectedTournaments[i].selectedDivision = e.target.value;
				selectedTournaments[i].weightClasses = selectedTournament.divisions.find((division) => division.name === e.target.value).weightClasses;
				selectedTournaments[i].selectedWeightClass = selectedTournament.divisions.find((division) => division.name === e.target.value).weightClasses[0];
			}
		}

		this.setState({ selectedTournaments });
	}

	onWeightClassSelection(selectedTournament, e) {
		const selectedTournaments = this.state.selectedTournaments;

		for (let i = 0; i < selectedTournaments.length; i++) {
			if (selectedTournaments[i].tournamentId === selectedTournament.tournamentId) {
				selectedTournaments[i].selectedWeightClass = Number(e.target.value);
			}
		}

		this.setState({ selectedTournaments });
	}

	onSubmitApplication(e) {
		const wrestler = {
			name: this.state.name,
			dob: this.state.dob,
			grade: this.state.grade,
			weight: String(Math.max.apply(Math, this.state.selectedTournaments.map((selectedTournament) => {
				return selectedTournament.selectedWeightClass
			}))),
			parents: this.state.parents,
			emails: this.state.emails,
			phones: this.state.phones,
			applications: this.state.selectedTournaments.map((selectedTournament) => {
				return {
					tournamentId: selectedTournament.tournamentId,
					name: selectedTournament.tournamentName,
					division: selectedTournament.selectedDivision,
					weightClass: selectedTournament.selectedWeightClass,
					open: true,
					status: ""
				};
			})
		};

		if (this.isValidApplication(wrestler)) {
			Meteor.call("wrestlers.submit", { ...wrestler }, (error, result) => {
				if (result) {
					this.onShowConfirmationModal();
				} else if (error) {
					// show error dialog
				}
			});
		} else {
			this.showValidationErrors(wrestler);
		}
	}

	onGoBack() {
		Session.set("isApplicationOpen", false);
	}

	onShowConfirmationModal() {
		this.setState({ isConfirmationModalOpen: true });
	}

	onCloseConfirmationModal() {
		this.setState({
			name: "",
			dob: "",
			grade: "",
			selectedGrade: "",
			parents: [{
				name: "",
				valid: false
			}],
			emails: [{
				text: "",
				valid: false
			}],
			phones: [{
				number: "",
				valid: false
			}],
			selectedTournaments: [],
			isConfirmationModalOpen: false
		});
	}

	isValidApplication(wrestler) {
		if (validator.isEmpty(wrestler.name)) return false;
		if (!validator.isISO8601(wrestler.dob) || wrestler.dob.length !== 10) return false;
		if (validator.isEmpty(wrestler.grade) || wrestler.grade < 0 || wrestler.grade > 12) return false;
		if (validator.isEmpty(wrestler.weight) || wrestler.weight < 0 || wrestler.weight > 285) return false;
		if (!wrestler.parents.every((parent) => !validator.isEmpty(parent.name))) return false;
		if (!wrestler.emails.every((email) => validator.isEmail(email.text))) return false;
		if (!wrestler.phones.every((phone) => validator.isMobilePhone(phone.number, "en-US"))) return false;
		if (wrestler.applications.length === 0) return false;

		return true;
	}

	showValidationErrors(wrestler) {
		if (validator.isEmpty(wrestler.name)) {
			document.querySelector("#name-field").classList.add("validation-error");
		}
		if (!validator.isISO8601(wrestler.dob) || wrestler.dob.length !== 10) {
			document.querySelector("#dob-field").classList.add("validation-error");
		}
		if (validator.isEmpty(wrestler.grade) || wrestler.grade < 0 || wrestler.grade > 12) {
			document.querySelector("#grade-field").classList.add("validation-error");
		}
		if (validator.isEmpty(wrestler.weight) || wrestler.weight < 0 || wrestler.weight > 285) {
			/** @todo log error? */
		}
		if (!wrestler.parents.every((parent) => !validator.isEmpty(parent.name))) {
			wrestler.parents.forEach((parent, index) => document.querySelector("#parent-field-" + index).classList.add("validation-error"));
		}
		if (!wrestler.emails.every((email) => validator.isEmail(email.text))) {
			wrestler.emails.forEach((email, index) => document.querySelector("#email-field-" + index).classList.add("validation-error"));
		}
		if (!wrestler.phones.every((phone) => validator.isMobilePhone(phone.number, "en-US"))) {
			wrestler.parents.forEach((phone, index) => document.querySelector("#phone-field-" + index).classList.add("validation-error"));
		}
		if (wrestler.applications.length === 0) {
			document.querySelector("#tournaments-field").classList.add("validation-error");
		}

		document.querySelector("#name-field").scrollIntoView(true);
	}

	isDateSupported() {
		const element = document.createElement("input");
		element.type = "date";

		if (element.type === "text") {
			return false;
		}

		return true;
	}

	render() {
		return (
			<div id="wrestler-application" className="container container__application">
				<div className="container__header">
					<h5 className="container__title">Application</h5>
				</div>

				<div className="container__content container__application-form">
					<label>
						<p>Wrestler</p>
						<input id="name-field" name="name" value={this.state.name} placeholder="Name" onChange={this.onNameChange} />
					</label>
					<label>
						{this.state.isDateSupported
							? <p>Date of Birth</p>
							: <p>Date of Birth <span>(formatted as: YYYY-MM-DD)</span></p>
						}
						<input id="dob-field" name="dob" type="date" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" value={this.state.dob} placeholder="Date of Birth" onChange={this.onDobChange} />
					</label>
					<label>
						<p>Grade (for 2020-2021)</p>
						<select id="grade-field" name="grade" value={this.state.grade} onChange={this.onGradeChange}>
							<option value="">--Select Grade--</option>
							<option value="0">Kindergarten</option>
							<option value="1">1st</option>
							<option value="2">2nd</option>
							<option value="3">3rd</option>
							<option value="4">4th</option>
							<option value="5">5th</option>
							<option value="6">6th</option>
							<option value="7">7th</option>
							<option value="8">8th</option>
							<option value="9">9th</option>
							<option value="10">10th</option>
							<option value="11">11th</option>
							<option value="12">12th</option>
						</select>
					</label>
					<label>
						<p>Parent</p>
						{this.state.parents.map((parent, index) => {
							if (index === 0) {
								return (
									<div key={index} className="dynamic-field">
										<input id={"parent-field-" + index} name="parent" value={this.state.parents[index].text} placeholder="Parent" onChange={this.onParentChange.bind(this, index)} />
										<img src="/images/add-button.svg" onClick={this.onAddParent} />
									</div>
								);
							} else {
								return (
									<div key={index} className="dynamic-field">
										<input id={"parent-field-" + index} name="parent" value={this.state.parents[index].text} placeholder="Parent" onChange={this.onParentChange.bind(this, index)} />
										<img src="/images/remove-button.svg" onClick={this.onDeleteParent.bind(this, index)} />
									</div>
								);
							}
						})}
					</label>
					<label>
						<p>Email</p>
						{this.state.emails.map((email, index) => {
							if (index === 0) {
								return (
									<div key={index} className="dynamic-field">
										<input id={"email-field-" + index} name={"email-" + index} type="email" value={this.state.emails[index].text} placeholder="Email" onChange={this.onEmailChange.bind(this, index)} />
										<img src="/images/add-button.svg" onClick={this.onAddEmail} />
									</div>
								);
							} else {
								return (
									<div key={index} className="dynamic-field">
										<input id={"email-field-" + index} name={"email-" + index} type="email" value={this.state.emails[index].text} placeholder="Email" onChange={this.onEmailChange.bind(this, index)} />
										<img src="/images/remove-button.svg" onClick={this.onDeleteEmail.bind(this, index)} />
									</div>
								);
							}
						})}
					</label>
					<label>
						<p>Phone</p>
						{this.state.phones.map((phone, index, phones) => {
							if (index === 0) {
								return (
									<div key={index} className="dynamic-field">
										<input id={"phone-field-" + index} name="phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={this.state.phones[index].number} placeholder="Phone" onChange={this.onPhoneChange.bind(this, index)} />
										<img src="/images/add-button.svg" onClick={this.onAddPhone} />
									</div>
								);
							} else {
								return (
									<div key={index} className="dynamic-field">
										<input id={"phone-field-" + index} name="phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={this.state.phones[index].number} placeholder="Phone" onChange={this.onPhoneChange.bind(this, index)} />
										<img src="/images/remove-button.svg" onClick={this.onDeletePhone.bind(this, index)} />
									</div>
								);
							}
						})}
					</label>
					<label className="bordered">
						<p className="dynamic-label">Tournaments</p>
						<select id="tournaments-field" name="tournament" className="multi" size={this.state.tournaments.length} value={this.state.selectedTournaments.map((selectedTournament) => selectedTournament.tournamentId)} onChange={this.onTournamentSelection} multiple>
							{this.state.tournaments.map((tournament, index) => {
								return (
									<option key={tournament._id} value={tournament._id}>{tournament.name}</option>
								);
							})}
						</select>
					</label>

					{this.state.selectedTournaments.map((selectedTournament) => {
						return (
							<fieldset key={selectedTournament.tournamentId}>
								<legend>{selectedTournament.tournamentName}</legend>
								<label>
									<p>Division</p>
									<select id="selected-tournament-division" name="selected-tournament-division" value={selectedTournament.selectedDivision} onChange={this.onDivisionSelection.bind(this, selectedTournament)}>
										{selectedTournament.divisions.map((division, index) => {
											return (
												<option key={index} value={division.name}>{division.name}</option>
											);
										})}
									</select>
								</label>
								<label>
									<p>Weight Class</p>
									<select id="selected-tournament-weight-class" name="selected-tournament-weight-class" value={selectedTournament.selectedWeightClass} onChange={this.onWeightClassSelection.bind(this, selectedTournament)}>
										{selectedTournament.weightClasses.map((weightClass, index) => {
											return (
												<option key={index} value={weightClass}>{weightClass}</option>
											);
										})}
									</select>
								</label>
							</fieldset>
						);
					})}
					<button className="submit-button" onClick={this.onSubmitApplication}>Submit Application</button>

					<Modal appElement={document.getElementById("app")} isOpen={this.state.isConfirmationModalOpen} contentLabel="Submit Application" className="boxed-view__box unbounded-height" overlayClassName="boxed-view boxed-view--modal">
						<div className="boxed-view__header">
							<h5 className="boxed-view__title">Confirmation</h5>
						</div>

						<div className="boxed-view__box-content">
							<p>Thank you for submitting your application!</p>
							<ul>
								{this.state.selectedTournaments.map((selectedTournament) => {
									return (
										<li key={selectedTournament.tournamentId}>
											{selectedTournament.tournamentName} ({selectedTournament.selectedDivision}, {selectedTournament.selectedWeightClass} lbs.)
										</li>
									);
								})}
							</ul>
							<button className="button boxed-view__button-confirmation" onClick={this.onCloseConfirmationModal}>OK</button>
						</div>
					</Modal>
				</div>
			</div>
		);
	}
}

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	Meteor.subscribe("tournaments");
	Meteor.subscribe("teams");

	const tournaments = Tournaments.find({ published: true }).fetch().map((tournament) => {
		return {
			...tournament,
			selected: false
		};
	});

	return {
		tournaments,
		isSidebarOpen: Session.get("isSidebarOpen")
	};
}, Application);
