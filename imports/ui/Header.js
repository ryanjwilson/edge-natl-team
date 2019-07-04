import React from "react";
import { Accounts } from "meteor/accounts-base";
import { createContainer } from "meteor/react-meteor-data";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { Link } from "react-router";
import { Session } from "meteor/session";

import IconLink from "./admin/IconLink";

/**
 * A component that represents a header bar for the public and private sections of this application.
 * It includes conditional navigation depending whether or not a user is logged in.
 */

export class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: props.isLoggedIn,
			isNavigationOpen: props.isNavigationOpen,
			isMenuOpen: props.isMenuOpen
		};

		this.toggleNavigation = this.toggleNavigation.bind(this);
		this.toggleMenu = this.toggleMenu.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.isLoggedIn !== nextProps.isLoggedIn) this.setState({ isLoggedIn: nextProps.isLoggedIn });
		if (this.props.isNavigationOpen !== nextProps.isNavigationOpen) this.setState({ isNavigationOpen: nextProps.isNavigationOpen });
		if (this.props.isMenuOpen !== nextProps.isMenuOpen) this.setState({ isMenuOpen: nextProps.isMenuOpen });
	}

	toggleNavigation() {
		if (!this.state.isNavigationOpen) {
			disableBodyScroll(document.querySelector(".header__mobile-navigation-menu"));
		} else {
			enableBodyScroll(document.querySelector(".header__mobile-navigation-menu"));
		}

		if (this.state.isNavigationOpen) {
			Session.set("isNavigationOpen", false);
		} else {
			Session.set("isNavigationOpen", true);
		}
	}

	toggleMenu() {
		if (!this.state.isMenuOpen) {
			disableBodyScroll(document.querySelector(".header__mobile-admin-menu"));
		} else {
			enableBodyScroll(document.querySelector(".header__mobile-admin-menu"));
		}

		if (this.state.isMenuOpen) {
			Session.set("isMenuOpen", false);
		} else {
			Session.set("isMenuOpen", true);
		}
	}

	logout() {
		Accounts.logout();
	}

	render() {
		const navIconSrc = (this.state.isNavigationOpen ? "/images/navigation/menu-close-button.svg" : "/images/navigation/navigation-menu-button.svg");
		const menuIconSrc = (this.state.isMenuOpen ? "/images/navigation/menu-close-button.svg" : "/images/navigation/admin-menu-button.svg");

		return (
			<div className="header">
				<div className="header__content">
					<div className="header__content-left">
						<img src="/images/brand/edge-team-logo.png" className="header__logo-desktop" />
						<div>
							<img src={navIconSrc} className="header__navigation-menu-icon" onClick={this.toggleNavigation} />
							<Link to="/" className="header__nav-item">SCHEDULE</Link>
							<Link to="/rules" className="header__nav-item">RULES</Link>
							<Link to="/faq" className="header__nav-item">FAQ</Link>
							<Link to="/media" className="header__nav-item">MEDIA</Link>
							<Link to="/contact" className="header__nav-item">CONTACT</Link>
						</div>
					</div>
					<div className="header__content-center">
						<img src="/images/brand/edge-team-logo.png" className="header__logo-mobile" />
					</div>
					{Meteor.userId() ?
						<div className="header__content-right">
							<img src={menuIconSrc} className="header__admin-menu-icon" onClick={this.toggleMenu} />
							<IconLink destination="/tournaments" src="/images/admin/tournaments-button.svg" hover="/images/admin/tournaments-hover-button.svg" />
							<IconLink destination="/wrestlers" src="/images/admin/wrestlers-button.svg" hover="/images/admin/wrestlers-hover-button.svg" />
							<IconLink destination="/teams" src="/images/admin/teams-button.svg" hover="/images/admin/teams-hover-button.svg" />
							<IconLink destination="/messages" src="/images/admin/messages-button.svg" hover="/images/admin/messages-hover-button.svg" />
							<IconLink destination="/settings" src="/images/admin/settings-button.svg" hover="/images/admin/settings-hover-button.svg" />
							<IconLink src="/images/admin/logout-button.svg" hover="/images/admin/logout-hover-button.svg" action={this.logout} />
						</div>
						:
						<div className="header__content-right">
							<img src={menuIconSrc} className="header__admin-menu-icon" onClick={this.toggleMenu} />
							<IconLink destination="/admin" src="/images/admin/login-button.svg" hover="/images/admin/login-hover-button.svg" />
						</div>
					}
				</div>

				{/* mobile-only navigation menu */}

				<div className="header__mobile-navigation-menu">
					<Link to="/" className="header__mobile-menu-item" onClick={this.toggleNavigation}>SCHEDULE</Link>
					<Link to="/rules" className="header__mobile-menu-item" onClick={this.toggleNavigation}>RULES</Link>
					<Link to="/faq" className="header__mobile-menu-item" onClick={this.toggleNavigation}>FAQ</Link>
					<Link to="/media" className="header__mobile-menu-item" onClick={this.toggleNavigation}>MEDIA</Link>
					<Link to="/contact" className="header__mobile-menu-item" onClick={this.toggleNavigation}>CONTACT</Link>
				</div>

				{/* mobile-only admin menu */}

				<div>
					{Meteor.userId() ?
						<div className="header__mobile-admin-menu">
							<Link to="/tournaments" className="header__mobile-menu-item" onClick={this.toggleMenu}>TOURNAMENTS</Link>
							<Link to="/wrestlers" className="header__mobile-menu-item" onClick={this.toggleMenu}>WRESTLERS</Link>
							<Link to="/teams" className="header__mobile-menu-item" onClick={this.toggleMenu}>TEAMS</Link>
							<Link to="/messages" className="header__mobile-menu-item" onClick={this.toggleMenu}>MESSAGES</Link>
							<Link to="/settings" className="header__mobile-menu-item" onClick={this.toggleMenu}>SETTINGS</Link>
							<Link to="/admin" className="header__mobile-menu-item" onClick={this.logout}>LOGOUT</Link>
						</div>
						:
						<div className="header__mobile-admin-menu">
							<Link to="/admin" className="header__mobile-menu-item" onClick={this.toggleMenu}>LOGIN</Link>
						</div>
					}
				</div>
			</div>
		);
	}
}

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	return {
		isLoggedIn: Meteor.userId(),
		isNavigationOpen: Session.get("isNavigationOpen"),
		isMenuOpen: Session.get("isMenuOpen"),
		isRosterOpen: Session.get("isRosterOpen")
	};
}, Header);
