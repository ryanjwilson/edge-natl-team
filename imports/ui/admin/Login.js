import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import Header from '../Header';
import Footer from '../Footer';

export class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: ''
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();

		let username = this.refs.username.value.trim();
		let password = this.refs.password.value.trim();

		this.props.loginWithPassword({ username }, password, (err) => {
			if (err) {
				this.setState({ error: 'Oops! We didn\'t recognize your username and/or password.' });
			} else {
				this.setState({ error: '' });
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

Login.propTypes = {
	loginWithPassword: PropTypes.func.isRequired
};

export default createContainer(() => {
	return {
		loginWithPassword: Meteor.loginWithPassword
	};
}, Login);
