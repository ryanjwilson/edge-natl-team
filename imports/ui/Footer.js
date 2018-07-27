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
        {/* <div>Powered by RosterFX.</div> */}
        <div>
          <a href="https://www.facebook.com/EdgeWrestlingSchool" target="_blank"><img src="/images/facebook.svg"/></a>
          <a href="https://www.instagram.com/edge_whippany/" target="_blank"><img src="/images/twitter.svg"/></a>
          <a href="https://twitter.com/EdgeWrestling" target="_blank"><img src="/images/instagram.svg"/></a>
        </div>
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
