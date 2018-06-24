import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

export const Footer = (props) => {
  return (
    <div className="footer">
      <div className="footer__content public-content">
        Footer content.
      </div>
    </div>
  );
};

Footer.propTypes = {

};

export default createContainer(() => {
  return {

  };
}, Footer);
