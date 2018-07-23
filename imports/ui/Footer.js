import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

export const Footer = (props) => {
  return (
    <div className="footer">
      <div className="footer__content">
        <div>Copyright &copy; 1984-2018. <a className="footer__link" href="https://www.edgewrestling.com">Edge Wrestling</a>. All Rights Reserved.</div>
        <div>Powered by RosterFX.</div>
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
