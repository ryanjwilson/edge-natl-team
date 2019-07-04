import React from "react";
import { createContainer } from "meteor/react-meteor-data";

/**
 * A component that renders a contact form.
 */

export class ContactForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			email: "",
			phone: "",
			message: ""
		};

		this.onNameChange = this.onNameChange.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
		this.onPhoneChange = this.onPhoneChange.bind(this);
		this.onMessageChange = this.onMessageChange.bind(this);
		this.onSubmitForm = this.onSubmitForm.bind(this);
	}

	onNameChange(e) {
		const name = e.target.value;

		this.setState({ name });
	}

	onEmailChange(e) {
		const email = e.target.value;

		this.setState({ email });
	}

	onPhoneChange(e) {
		const phone = e.target.value;

		this.setState({ phone });
	}

	onMessageChange(e) {
		const message = e.target.value;

		this.setState({ message });
	}

	onSubmitForm() {
		/** @todo */
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
						<input id="name" name="name" value={this.state.name} placeholder="Name" onChange={this.onNameChange} />
					</label>
					<label>
						<p>Email</p>
						<input id="email" name="email" type="email" value={this.state.email} placeholder="Email" onChange={this.onEmailChange} />
					</label>
					<label>
						<p>Phone</p>
						<input id="phone" name="phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={this.state.phone} placeholder="Phone" onChange={this.onPhoneChange} />
					</label>
					<label>
						<p>Message</p>
					</label>
					<textarea id="message" name="message" value={this.state.message} placeholder="Type your message here." onChange={this.onMessageChange}></textarea>
					<button className="container__submit-button" onClick={this.onSubmitForm}>Submit</button>
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
