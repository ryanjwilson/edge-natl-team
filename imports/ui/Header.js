import PropTypes from 'prop-types';
import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import { Session } from 'meteor/session';

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
    Accounts.logout();
  }

  /**
   * Renders this component to the page.
   *
   * @return the JSX for this component
   */

  render() {
    const navIconSrc = (this.state.isSidebarOpen ? '/images/x.svg' : '/images/bars.svg');
    const menuIconSrc = (this.state.isMenuOpen ? '/images/x.svg' : '/images/dots.svg');

    return (
      <div className="header">
        <div className="header__content">
          <div className="header__content-left">
            <img src="/images/edge-team-logo.png" className="header__nav-logo-desktop"/>
            <div>
              <img src={navIconSrc} className="header__nav-toggle-icon" onClick={this.toggleNavigation}/>
              <Link to="/" className="header__nav-item">SCHEDULE</Link>
              <Link to="/rules" className="header__nav-item">TEAM RULES</Link>
              <Link to="/faq" className="header__nav-item">FAQ</Link>
              <Link to="/past-events" className="header__nav-item">PAST EVENTS</Link>
              <Link to="/contact" className="header__nav-item">CONTACT</Link>
            </div>
          </div>
          <div className="header__content-center">
            <img src="/images/edge-team-logo.png" className="header__nav-logo-mobile"/>
          </div>
          {Meteor.userId() ?
            <div className="header__content-right">
              <img src={menuIconSrc} className="header__menu-toggle-icon" onClick={this.toggleMenu}/>
              <Link to="/tournaments" className="header__nav-item">TOURNAMENTS</Link>
              <Link to="/wrestlers" className="header__nav-item">WRESTLERS</Link>
              <Link to="/teams" className="header__nav-item">TEAMS</Link>
              <Link to="/admin" className="header__nav-item">LOGOUT</Link>
            </div>
            :
            <div className="header__content-right">
              <img src={menuIconSrc} className="header__menu-toggle-icon" onClick={this.toggleMenu}/>
              <Link to="/admin" className="header__nav-item header__right">ADMIN</Link>
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
    isSidebarOpen: Session.get('isSidebarOpen'),
    isMenuOpen: Session.get('isMenuOpen')
  };
}, Header);
