import { Meteor } from "meteor/meteor";
import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import Modal from "react-modal";
import validator from "validator";

/**
 * A component that renders a contact form.
 */

export class ContactForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sender: "",
			email: "",
			phone: "",
			body: "",
			isConfirmationModalOpen: false
		};

		this.onSenderChange = this.onSenderChange.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
		this.onPhoneChange = this.onPhoneChange.bind(this);
		this.onBodyChange = this.onBodyChange.bind(this);
		this.onSubmitForm = this.onSubmitForm.bind(this);
		this.onShowConfirmationModal = this.onShowConfirmationModal.bind(this);
		this.onCloseConfirmationModal = this.onCloseConfirmationModal.bind(this);
	}

	onSenderChange(e) {
		const sender = e.target.value;

		this.setState({ sender });
	}

	onEmailChange(e) {
		const email = e.target.value;

		this.setState({ email });
	}

	onPhoneChange(e) {
		const phone = e.target.value;

		this.setState({ phone });
	}

	onBodyChange(e) {
		const body = e.target.value;

		this.setState({ body });
	}

	onSubmitForm() {
		document.querySelector("#sender-field").classList.remove("validation-error");
		document.querySelector("#email-field").classList.remove("validation-error");
		document.querySelector("#phone-field").classList.remove("validation-error");
		document.querySelector("#body-field").classList.remove("validation-error");

		const message = {
			sender: this.state.sender,
			email: this.state.email,
			phone: this.state.phone,
			body: this.state.body,
			answered: false
		};

		if (this.isValidMessage(message)) {
			Meteor.call("messages.submit", { ...message }, (error, result) => {
				if (result) {
					this.onShowConfirmationModal();
				} else if (error) {
					// show error dialog
				}
			});
		} else {
			this.showValidationErrors(message);
		}
	}

	isValidMessage(message) {
		if (validator.isEmpty(message.sender)) return false;
		if (validator.isEmpty(message.email)) return false;
		if (validator.isEmpty(message.phone)) return false;
		if (validator.isEmpty(message.body)) return false;
		if (!validator.isEmail(message.email)) return false;
		if (!validator.isMobilePhone(message.phone, "en-US")) return false;

		return true;
	}

	showValidationErrors(message) {
		if (validator.isEmpty(message.sender)) {
			document.querySelector("#sender-field").classList.add("validation-error");
		}
		if (validator.isEmpty(message.email)) {
			document.querySelector("#email-field").classList.add("validation-error");
		}
		if (validator.isEmpty(message.phone)) {
			document.querySelector("#phone-field").classList.add("validation-error");
		}
		if (validator.isEmpty(message.body)) {
			document.querySelector("#body-field").classList.add("validation-error");
		}
		if (!validator.isEmail(message.email)) {
			document.querySelector("#email-field").classList.add("validation-error");
		}
		if (!validator.isMobilePhone(message.phone, "en-US")) {
			document.querySelector("#phone-field").classList.add("validation-error");
		}

		document.querySelector("#sender-field").scrollIntoView(true);
	}

	onShowConfirmationModal() {
		this.setState({ isConfirmationModalOpen: true });
	}

	onCloseConfirmationModal() {
		this.setState({
			sender: "",
			email: "",
			phone: "",
			body: "",
			isConfirmationModalOpen: false
		});
	}

	render() {
		return (
			<div className="container">
				<h5 className="container__title">Contact Us</h5>

				<div className="container__content container__contact-form">
					<p className="container__subtitle">Please do not hesitate to reach out to us with any questions, comments, or concerns.</p>
					<hr />

					<label>
						<p>Name</p>
						<input id="sender-field" name="sender" value={this.state.sender} placeholder="Name" onChange={this.onSenderChange} />
					</label>
					<label>
						<p>Email</p>
						<input id="email-field" name="email" type="email" value={this.state.email} placeholder="Email" onChange={this.onEmailChange} />
					</label>
					<label>
						<p>Phone</p>
						<input id="phone-field" name="phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={this.state.phone} placeholder="Phone" onChange={this.onPhoneChange} />
					</label>
					<label>
						<p>Message</p>
					</label>
					<textarea id="body-field" name="body" value={this.state.body} placeholder="Type your message here." onChange={this.onBodyChange}></textarea>
					<button className="container__submit-button" onClick={this.onSubmitForm}>Submit</button>

					<Modal appElement={document.getElementById("app")} isOpen={this.state.isConfirmationModalOpen} contentLabel="Submit Message" className="boxed-view__box unbounded-height" overlayClassName="boxed-view boxed-view--modal">
						<div className="boxed-view__header">
							<h5 className="boxed-view__title">Confirmation</h5>
						</div>

						<div className="boxed-view__box-content">
							<p>Thank you for submitting your message! We'll be in touch shortly.</p>

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
	return {

	};
}, ContactForm);
