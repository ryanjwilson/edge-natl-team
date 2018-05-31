import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

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
        this.setState({ error: 'Invalid username and/or password.' });
      } else {
        this.setState({ error: '' });
      }
    });
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Admin</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit} className="boxed-view__form" noValidate>
            <input type="text" ref="username" name="username" placeholder="Username"/>
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <button className="button">Login</button>
          </form>
        </div>
      </div>
    )
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
