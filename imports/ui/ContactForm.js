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
