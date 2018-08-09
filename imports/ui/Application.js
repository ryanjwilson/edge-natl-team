import Modal from 'react-modal';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';

import { Tournaments } from '../api/tournaments';
import { Teams } from '../api/teams';

export class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      dob: '',
      grade: '',
      selectedGrade: '',
      parents: [ '' ],
      emails: [ '' ],
      phones: [ '' ],
      tournaments: props.tournaments,
      selectedTournaments: [],
      isConfirmationModalOpen: false
    };

    // bind field listeners to this context. remaining listeners are bound
    // manually, as they take additional parameters.

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

    parents.push('');
    this.setState({ parents });
  }

  onAddEmail() {
    const emails = this.state.emails;

    emails.push('');
    this.setState({ emails });
  }

  onAddPhone() {
    const phones = this.state.phones;

    phones.push('');
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

    this.setState({ name });
  }

  onParentChange(index, e) {
    const parents = this.state.parents;

    parents[index] = e.target.value;
    this.setState({ parents });
  }

  onEmailChange(index, e) {
    const emails = this.state.emails;

    emails[index] = e.target.value;
    this.setState({ emails });
  }

  onPhoneChange(index, e) {
    const phones = this.state.phones;

    phones[index] = e.target.value;
    this.setState({ phones });
  }

  onDobChange(e) {
    const dob = e.target.value;

    this.setState({ dob });
  }

  onGradeChange(e) {
    const grade = e.target.value;

    this.setState({ grade, selectedGrade: grade });
  }

  onTournamentSelection(e) {
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
          selectedWeightClass: this.state.tournaments.find((tournament) => tournament._id === options[i].value).divisions[0].weightClasses[0],
          teamId: this.state.tournaments.find((tournament) => tournament._id === options[i].value).teamId
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
    // TODO - data validation on client and server

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
          status: '',
          teamId: selectedTournament.teamId
        };
      })
    };

    Meteor.call('wrestlers.submit', { ...wrestler }, (error, result) => {
      if (result) {
        wrestler.applications.forEach((application) => {
          const team = Teams.findOne({ _id: application.teamId });

          if (team) {
            const roster = team.roster;
            const index = team.roster.findIndex((position) => position.weightClass === application.weightClass);

            roster[index].availableWrestlers.push({ _id: result, name: wrestler.name });

            Meteor.call('teams.update', team._id, { roster });
          }
        });

        this.onShowConfirmationModal();
      } else if (error) {
        console.log('the error', error);
      }
    });
  }

  onGoBack() {
    Session.set('isApplicationOpen', false);
  }

  onShowConfirmationModal() {
    this.setState({ isConfirmationModalOpen: true });
  }

  onCloseConfirmationModal() {
    this.setState({
      name: '',
      dob: '',
      grade: '',
      selectedGrade: '',
      parents: [ '' ],
      emails: [ '' ],
      phones: [ '' ],
      selectedTournaments: [],
      isConfirmationModalOpen: false
    });
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
            <input id="name" name="name" value={this.state.name} placeholder="Name" onChange={this.onNameChange}/>
          </label>
          <label>
            <p>Date of Birth</p>
            <input id="dob" name="dob" type="date" value={this.state.dob} placeholder="Date of Birth" onChange={this.onDobChange}/>
          </label>
          <label>
            <p>Grade (for 2018-2019)</p>
            <select id="grade" name="grade" value={this.state.grade} onChange={this.onGradeChange}>
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
                    <input id="parent" name="parent" value={this.state.parents[index]} placeholder="Parent" onChange={this.onParentChange.bind(this, index)}/>
                    <img src="/images/add-button.svg" onClick={this.onAddParent}/>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="dynamic-field">
                    <input id="parent" name="parent" value={this.state.parents[index]} placeholder="Parent" onChange={this.onParentChange.bind(this, index)}/>
                    <img src="/images/remove-button.svg" onClick={this.onDeleteParent.bind(this, index)}/>
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
                    <input id="email" name="email" type="email" value={this.state.emails[index]} placeholder="Email" onChange={this.onEmailChange.bind(this, index)}/>
                    <img src="/images/add-button.svg" onClick={this.onAddEmail}/>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="dynamic-field">
                    <input id="email" name="email" type="email" value={this.state.emails[index]} placeholder="Email" onChange={this.onEmailChange.bind(this, index)}/>
                    <img src="/images/remove-button.svg" onClick={this.onDeleteEmail.bind(this, index)}/>
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
                    <input id="phone" name="phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={this.state.phones[index]} placeholder="Phone" onChange={this.onPhoneChange.bind(this, index)}/>
                    <img src="/images/add-button.svg" onClick={this.onAddPhone}/>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="dynamic-field">
                    <input id="phone" name="phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={this.state.phones[index]} placeholder="Phone" onChange={this.onPhoneChange.bind(this, index)}/>
                    <img src="/images/remove-button.svg" onClick={this.onDeletePhone.bind(this, index)}/>
                  </div>
                );
              }
            })}
          </label>
          <label className="bordered">
            <p className="dynamic-label">Tournaments</p>
            <select id="tournament" name="tournament" className="multi" size={this.state.tournaments.length} value={this.state.selectedTournaments.map((selectedTournament) => selectedTournament.tournamentId)} onChange={this.onTournamentSelection} multiple>
              {this.state.tournaments.map((tournament) => {
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
          <button onClick={this.onSubmitApplication}>Submit Application</button>

          <Modal appElement={document.getElementById('app')} isOpen={this.state.isConfirmationModalOpen} contentLabel="Submit Application" className="boxed-view__box unbounded-height" overlayClassName="boxed-view boxed-view--modal">
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Application.propTypes = {

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  Meteor.subscribe('tournaments');
  Meteor.subscribe('teams');

  const tournaments = Tournaments.find({ published: true }).fetch().map((tournament) => {
    const team = Teams.findOne({ 'tournament._id': tournament._id }, { fields: { _id: 1 }});

    return {
      ...tournament,
      teamId: (team ? team._id : undefined),
      selected: false
    };
  });

  return {
    tournaments,
    isSidebarOpen: Session.get('isSidebarOpen')
  };
}, Application);
