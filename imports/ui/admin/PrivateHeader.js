import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

export const PrivateHeader = (props) => {
  const navImgSrc = props.isSidebarOpen ? '/images/x.svg' : '/images/bars.svg';
  const menuImgSrc = props.isMenuOpen ? '/images/x.svg' : '/images/bars.svg';

  // TODO - need to adjust icons for mobile and desktop versions

  return (
    <div className="header">
      <div className="header__content">
        <img className="header__sidebar-toggle" src={navImgSrc} onClick={() => props.onSidebarToggle()}/>
        <h1 className="header__title">{props.title}</h1>

        <img className="header__menu-toggle" src="/images/bars.svg" onClick={() => props.onMenuToggle()}/>

        <div id="slide-out-menu" className="header__menu">
          <img id="slide-out-menu-toggle" className="header__menu-toggle" src="/images/x.svg" onClick={() => props.onMenuToggle()}/>

          <div className="header__menu-items">
            <div className="header__menu-profile">
              <img className="profile-picture" src="/images/user-avatar.png"/>
              <div className="profile-text">
                <h1>Ryan</h1>
                <p>Last Login: Apr 25 at 12:08pm</p>
              </div>
            </div>
            <div className="header__menu-links">
              <Link to="/tournaments" className="header__menu-item">
                <img className="header__menu-link-icon" src="/images/bars.svg"/>
                Tournaments
              </Link>
              <Link to="/applications" className="header__menu-item">
                <img className="header__menu-link-icon" src="/images/bars.svg"/>
                Applications
              </Link>
              <Link to="/dashboard" className="header__menu-item">
                <img className="header__menu-link-icon" src="/images/bars.svg"/>
                Rosters
              </Link>
              <Link to="/wrestlers" className="header__menu-item">
                <img className="header__menu-link-icon" src="/images/bars.svg"/>
                Wrestlers
              </Link>
              <Link to="/dashboard" className="header__menu-item">
                <img className="header__menu-link-icon" src="/images/bars.svg"/>
                Settings
              </Link>
              <Link to="/dashboard" className="header__menu-item">
                <img className="header__menu-link-icon" src="/images/bars.svg"/>
                Help
              </Link>
              <button className="header__menu-item button button--link header__menu-link logout">
                <img className="header__menu-link-icon" src="/images/bars.svg"/>
                Logout
              </button>
            </div>
            <div className="bug-report">
              <p>Found a bug in our system? Have a suggestion for a new feature? <button className="button button--link">Let us know</button>!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  onSidebarToggle: PropTypes.func.isRequired,
  onMenuToggle: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  isMenuOpen: PropTypes.bool.isRequired
};

export default createContainer(() => {
  return {
    onLogout: () => Accounts.logout(),
    onSidebarToggle: () => {
      if (!Session.get('isSidebarOpen') && Session.get('isMenuOpen')) {   // close the menu before opening the sidebar
        Session.set('isMenuOpen', false);
      }

      Session.set('isSidebarOpen', !Session.get('isSidebarOpen'));
    },
    onMenuToggle: () => {
      if (!Session.get('isMenuOpen') && Session.get('isSidebarOpen')) {   // close the sidebar before opening the menu
        Session.set('isSidebarOpen', false);
      }

      Session.set('isMenuOpen', !Session.get('isMenuOpen'));
    },
    isSidebarOpen: Session.get('isSidebarOpen'),
    isMenuOpen: Session.get('isMenuOpen')
  };
}, PrivateHeader);
