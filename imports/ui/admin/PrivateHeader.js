import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

///////////////////////////////////////////////////////////////////////////////

const mq = window.matchMedia("(min-width: 50rem)");   // allows the selective running of functions based on screen width

export const PrivateHeader = (props) => {
  const disableScrolling = (e) => {
    e.preventDefault();
  };

  const navImgSrc = props.isSidebarOpen ? '/images/x.svg' : '/images/bars.svg';
  const menuImgSrc = props.isMenuOpen ? '/images/x.svg' : '/images/bars.svg';

  // TODO
  // need to add conditional image src for sidebar menu icons (find icon set for this)
  // need to add conditional image src for nav menu (find icon set for this)

  return (
    <div className="header">
      <div className="header__content">
        <img className="header__sidebar-toggle" src={navImgSrc} onClick={() => props.onSidebarToggle()}/>
        <h1 className="header__title">{props.title}</h1>

        <div>
          <img className="header__menu-toggle" src={menuImgSrc} onClick={() => props.onMenuToggle(disableScrolling)}/>

          <div className="user-menu" onMouseLeave={() => props.onCloseMenu()}>
            <div className="user-menu__profile">
              <img className="profile-image" src="/images/user-avatar.png"/>
              <div className="profile-text">Ryan Wilson</div>
            </div>
            <div className="user-menu__links">
              <div className="link">
                <img className="link-image" src="/images/x.svg"/>
                <Link className="link-text" to="/dashboard">Tournaments</Link>
              </div>
              <div className="link">
                <img className="link-image" src="/images/x.svg"/>
                <Link className="link-text" to="/dashboard">Wrestlers</Link>
              </div>
              <div className="link">
                <img className="link-image" src="/images/x.svg"/>
                <Link className="link-text" to="/dashboard">Rosters</Link>
              </div>
            </div>
            <div className="user-menu__actions">
              <div className="link">
                <img className="link-image" src="/images/x.svg"/>
                <Link className="link-text" to="/dashboard">Help</Link>
              </div>
              <div className="link">
                <img className="link-image" src="/images/x.svg"/>
                <Link className="link-text" to="/dashboard">Settings</Link>
              </div>
              <div className="link rounded">
                <img className="link-image" src="/images/x.svg"/>
                <button className="button button--link link-text" onClick={() => props.onLogout()}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

{/* <div id="tournament" className={className} onClick={() => props.Session.set('selectedTournamentId', props.tournament._id)}>
  <div className="item__text">
    <h5 className="item__title">{props.tournament.name || 'Untitled Tournament'}</h5>
    <p className="item__subtitle">{props.tournament.date || 'Date'} &middot; {props.tournament.location || 'Location'}</p>
  </div>
  {props.tournament.published ? <div className="item__status"><img src="/images/confirm.png"/></div> : undefined}
</div> */}

///////////////////////////////////////////////////////////////////////////////

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  onSidebarToggle: PropTypes.func.isRequired,
  onMenuToggle: PropTypes.func.isRequired,
  onCloseMenu: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  isMenuOpen: PropTypes.bool.isRequired
};

///////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  return {
    onLogout: () => Accounts.logout(),
    onSidebarToggle: () => {
      if (!Session.get('isSidebarOpen') && Session.get('isMenuOpen')) {   // close the menu before opening the sidebar
        Session.set('isMenuOpen', false);
      }

      Session.set('isSidebarOpen', !Session.get('isSidebarOpen'));
    },
    onMenuToggle: (scrollBlocker) => {
      if (!Session.get('isMenuOpen')) {
        document.body.addEventListener('touchmove', scrollBlocker, false);

        if (Session.get('isSidebarOpen')) {
          Session.set('isSidebarOpen', false);
        }
      } else {
        document.body.removeEventListener('touchmove', scrollBlocker, false);
      }

      Session.set('isMenuOpen', !Session.get('isMenuOpen'));
    },
    onCloseMenu: () => {
      if (mq.matches) {
        Session.set('isMenuOpen', false);
      }
    },
    isSidebarOpen: Session.get('isSidebarOpen'),
    isMenuOpen: Session.get('isMenuOpen')
  };
}, PrivateHeader);
