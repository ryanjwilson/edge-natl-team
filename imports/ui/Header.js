import PropTypes from 'prop-types';
import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import { Session } from 'meteor/session';

import IconLink from './admin/IconLink';

/**
 * A Header component represents a header bar for the public and private
 * sections of this application. It includes conditional navigation depending
 * whether or not a user is logged in.
 */

export class Header extends React.Component {

  /**
   * Initializes a Header component.
   *
   * @param props - the properties with which this component is initialized
   */

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: props.isLoggedIn,
      isSidebarOpen: props.isNavigationOpen,
      isMenuOpen: props.isMenuOpen
    };

    // bind field listeners to this context. remaining listeners are bound
    // manually, as they take additional parameters.

    this.toggleNavigation = this.toggleNavigation.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    // this.toggleMenu = this.toggleMenu.bind(this);
    // this.logout = this.logout.bind(this);
  }

  /**
   * Updates the component state when new properties are received.
   *
   * @param nextProps - the new properties with which to update the state
   */

  componentWillReceiveProps(nextProps) {
    // if (this.props.title !== nextProps.title) this.setState({ title: nextProps.title });
    //
    // if (this.props.isSidebarOpen !== nextProps.isSidebarOpen) {
    //   this.setState({ sidebarImage: (nextProps.isSidebarOpen ? '/images/x.svg' : '/images/bars.svg'), isSidebarOpen: nextProps.isSidebarOpen });
    // }
    //
    // if (this.props.isMenuOpen !== nextProps.isMenuOpen) {
    //   this.setState({ menuImage: (nextProps.isMenuOpen ? '/images/x.svg' : '/images/bars.svg'), isMenuOpen: nextProps.isMenuOpen });
    // }

    if (this.props.isLoggedIn !== nextProps.isLoggedIn) this.setState({ isLoggedIn: nextProps.isLoggedIn });
    if (this.props.isSidebarOpen !== nextProps.isSidebarOpen) this.setState({ isSidebarOpen: nextProps.isSidebarOpen });
    if (this.props.isMenuOpen !== nextProps.isMenuOpen) this.setState({ isMenuOpen: nextProps.isMenuOpen });
  }

  /**
   * Toggles the state of the sidebar between open and closed.
   */

  toggleNavigation() {
    if (!this.state.isSidebarOpen && this.state.isMenuOpen) {
      Session.set('isMenuOpen', false);
    }

    Session.set('isSidebarOpen', !this.state.isSidebarOpen);
  }

  /**
   * Toggles the state of the menu between open and closed.
   */

  toggleMenu() {
    if (!this.state.isMenuOpen && this.state.isSidebarOpen) {
      Session.set('isSidebarOpen', false);
    }
    Session.set('isMenuOpen', !this.state.isMenuOpen);
  }

  /**
   * Logs the user out of the application.
   */

  logout() {
    console.log('logging out');
    Accounts.logout();
  }

  /**
   * Renders this component to the page.
   *
   * @return the JSX for this component
   */

  render() {
    const navIconSrc = (this.state.isSidebarOpen ? '/images/navigation/menu-close-button.svg' : '/images/navigation/navigation-menu-button.svg');
    const menuIconSrc = (this.state.isMenuOpen ? '/images/navigation/menu-close-button.svg' : '/images/navigation/admin-menu-button.svg');

    return (
      <div className="header">
        <div className="header__content">
          <div className="header__content-left">
            <img src="/images/brand/edge-team-logo.png" className="header__nav-logo-desktop"/>
            <div>
              <img src={navIconSrc} className="header__navigation-menu-icon" onClick={this.toggleNavigation}/>
              <Link to="/" className="header__nav-item">SCHEDULE</Link>
              <Link to="/rules" className="header__nav-item">RULES</Link>
              <Link to="/faq" className="header__nav-item">FAQ</Link>
              <Link to="/media" className="header__nav-item">MEDIA</Link>
              <Link to="/contact" className="header__nav-item">CONTACT</Link>
            </div>
          </div>
          <div className="header__content-center">
            <img src="/images/brand/edge-team-logo.png" className="header__nav-logo-mobile"/>
          </div>
          {Meteor.userId() ?
            <div className="header__content-right">
              <img src={menuIconSrc} className="header__admin-menu-icon" onClick={this.toggleMenu}/>
              <IconLink destination="/tournaments" src="/images/admin/tournaments-button.svg" hover="/images/admin/tournaments-hover-button.svg"/>
              <IconLink destination="/wrestlers" src="/images/admin/wrestlers-button.svg" hover="/images/admin/wrestlers-hover-button.svg"/>
              <IconLink destination="/teams" src="/images/admin/teams-button.svg" hover="/images/admin/teams-hover-button.svg"/>
              <IconLink destination="/messages" src="/images/admin/messages-button.svg" hover="/images/admin/messages-hover-button.svg"/>
              <IconLink destination="/settings" src="/images/admin/settings-button.svg" hover="/images/admin/settings-hover-button.svg"/>
              <IconLink src="/images/admin/logout-button.svg" hover="/images/admin/logout-hover-button.svg" action={this.logout}/>
            </div>
            :
            <div className="header__content-right">
              <img src={menuIconSrc} className="header__admin-menu-icon" onClick={this.toggleMenu}/>
              <IconLink destination="/admin" src="/images/admin/login-button.svg" hover="/images/admin/login-hover-button.svg"/>
            </div>
          }
        </div>
      </div>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Header.propTypes = {

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  return {
    isLoggedIn: Meteor.userId(),
    isSidebarOpen: Session.get('isSidebarOpen'),
    isMenuOpen: Session.get('isMenuOpen')
  };
}, Header);
