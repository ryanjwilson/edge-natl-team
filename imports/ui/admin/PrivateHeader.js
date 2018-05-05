import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

///////////////////////////////////////////////////////////////////////////////

export const PrivateHeader = (props) => {
  const navImgSrc = props.isLeftNavOpen ? '/images/x.svg' : '/images/bars.svg';

  return (
    <div className="header">
      <div className="header__content">
        <img className="header__nav-toggle" src={navImgSrc} onClick={() => props.onNavToggle()}/>
        <h1 className="header__title">{props.title}</h1>
        {/* <button className="button button--link" onClick={() => props.onLogout()}>Logout</button> */}
        <div className="header__menu">
          <img className="header__avatar" src="/images/user-avatar.png"/>
          <i className="header__arrow"></i>

          <div className="header__slideout">
            <a>Tournaments</a>
            <a>Wrestlers</a>
            <a>Rosters</a>
            <a>Settings</a>
            <a>Help</a>
            <a>Logout</a>
          </div>
        </div>
      </div>
    </div>
  );
}

///////////////////////////////////////////////////////////////////////////////

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired
};

///////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  return {
    onLogout: () => Accounts.logout(),
    onNavToggle: () => Session.set('isLeftNavOpen', !Session.get('isLeftNavOpen')),
    isLeftNavOpen: Session.get('isLeftNavOpen')
  };
}, PrivateHeader);
