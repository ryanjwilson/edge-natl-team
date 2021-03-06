import { Meteor } from "meteor/meteor";
import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";

import Header from "../Header";
import Footer from "../Footer";

/**
 * A component for users to login to the application.
 */

export class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: ""
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();

		const username = this.refs.username.value.trim();
		const password = this.refs.password.value.trim();

		Meteor.loginWithPassword({ username }, password, (error) => {
			if (error) {
				this.setState({ error: "Oops! We didn't recognize your username and/or password." });
			} else {
				this.setState({ error: "" });
			}
		});
	}

	render() {
		return (
			<div>
				<Header />

				<div className="boxed-view">
					<div className="boxed-view__box unbounded-height login-modal">
						<div className="boxed-view__header">
							<h5 className="boxed-view__title">Admin</h5>
						</div>

						{this.state.error ? <p className="login-error">{this.state.error}</p> : undefined}

						<form onSubmit={this.onSubmit} className="boxed-view__form" noValidate>
							<img src="/images/brand/edge-team-logo.png" />
							<input className="username" type="text" ref="username" name="username" placeholder="Username" />
							<input className="password" type="password" ref="password" name="password" placeholder="Password" />
							<button className="button">Login</button>
						</form>
					</div>
				</div>

				<Footer />
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
}, Login);
