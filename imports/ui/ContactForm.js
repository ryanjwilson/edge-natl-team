import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';

export class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    // bind field listeners to this context. remaining listeners are bound
    // manually, as they take additional parameters.
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div className="contact__contact-form">
        <h5 className="contact__contact-form-title">Contact Us</h5>

        <div className="contact__contact-form-content">
          <p>Please do not hesitate to reach out with any questions, comments, or concerns.</p>
          <hr/>

          <label className="contact__contact-form-label">
            <p>Name</p>
            <input id="name" name="name" className="contact__contact-form-field" value={this.state.name} placeholder="Name" onChange={this.onNameChange}/>
          </label>
          <label className="contact__contact-form-label">
            <p>Email</p>
            <input id="email" name="email" className="contact__contact-form-field" value={this.state.email} placeholder="Email" onChange={this.onEmailChange}/>
          </label>
          <label className="contact__contact-form-label">
            <p>Phone</p>
            <input id="phone" name="phone" className="contact__contact-form-field" value={this.state.phone} placeholder="Phone" onChange={this.onPhoneChange}/>
          </label>
          <label className="contact__contact-form-label">
            <p>Message</p>
          </label>
          <textarea id="message" name="message" className="contact__contact-form-textarea" value={this.state.message} placeholder="Type your message here." onChange={this.onMessageChange}></textarea>
          <button className="contact__contact-form-submit-button" onClick={this.onSubmitApplication}>Submit</button>
        </div>
      </div>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

ContactForm.propTypes = {

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  return {

  };
}, ContactForm);
