import PropTypes from 'prop-types';
import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import { Session } from 'meteor/session';

/**
 * A PrivateHeader component represents a header bar for the Admin section of
 * of this application. It includes navigation and page titling.
 */

export class PrivateHeader extends React.Component {

  /**
   * Initializes a PrivateHeader component.
   *
   * @param props - the properties with which this component is initialized
   */

  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      sidebarImage: (props.isSidebarOpen ? '/images/x.svg' : '/images/bars.svg'),
      menuImage: (props.isMenuOpen ? '/images/x.svg' : '/images/bars.svg'),
      isSidebarOpen: props.isSidebarOpen,
      isMenuOpen: props.isMenuOpen
    };

    // bind field listeners to this context. remaining listeners are bound
    // manually, as they take additional parameters.

    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.logout = this.logout.bind(this);
  }

  /**
   * Updates the component state when new properties are received.
   *
   * @param nextProps - the new properties with which to update the state
   */

  componentWillReceiveProps(nextProps) {
    if (this.props.title !== nextProps.title) this.setState({ title: nextProps.title });

    if (this.props.isSidebarOpen !== nextProps.isSidebarOpen) {
      this.setState({ sidebarImage: (nextProps.isSidebarOpen ? '/images/x.svg' : '/images/bars.svg'), isSidebarOpen: nextProps.isSidebarOpen });
    }

    if (this.props.isMenuOpen !== nextProps.isMenuOpen) {
      this.setState({ menuImage: (nextProps.isMenuOpen ? '/images/x.svg' : '/images/bars.svg'), isMenuOpen: nextProps.isMenuOpen });
    }
  }

  /**
   * Toggles the state of the sidebar between open and closed.
   */

  toggleSidebar() {
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
    return (
      <div className="header">
        <div className="header__content">
          <img className="header__sidebar-toggle" src={this.state.sidebarImage} onClick={this.toggleSidebar}/>
          <h1 className="header__title">{this.state.title}</h1>

          <img className="header__menu-toggle" src="/images/bars.svg" onClick={this.toggleMenu}/>

          <div id="slide-out-menu" className="header__menu">
            <img id="slide-out-menu-toggle" className="header__menu-toggle" src="/images/x.svg" onClick={this.toggleMenu}/>

            <div className="header__menu-items">
              <div className="header__menu-profile">
                <img className="profile-picture" src="/images/user-avatar.png"/>
                <div className="profile-text">
                  <h1>Ryan</h1>
                  <p>Last Login: Apr 25 at 12:08pm</p>
                </div>
              </div>
              <div className="header__menu-links">
                <Link to="/tournaments" className="header__menu-item"><img className="header__menu-link-icon" src="/images/bars.svg"/>Tournaments</Link>
                <Link to="/applications" className="header__menu-item"><img className="header__menu-link-icon" src="/images/bars.svg"/>Applications</Link>
                <Link to="/dashboard" className="header__menu-item"><img className="header__menu-link-icon" src="/images/bars.svg"/>Rosters</Link>
                <Link to="/wrestlers" className="header__menu-item"><img className="header__menu-link-icon" src="/images/bars.svg"/>Wrestlers</Link>
                <Link to="/dashboard" className="header__menu-item"><img className="header__menu-link-icon" src="/images/bars.svg"/>Settings</Link>
                <Link to="/dashboard" className="header__menu-item"><img className="header__menu-link-icon" src="/images/bars.svg"/>Help</Link>
                <button className="header__menu-item button button--link header__menu-link logout" onClick={this.logout}>
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
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  isMenuOpen: PropTypes.bool.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  return {
    isSidebarOpen: Session.get('isSidebarOpen'),
    isMenuOpen: Session.get('isMenuOpen')
  };
}, PrivateHeader);
