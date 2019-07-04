import React from "react";
import { Accounts } from "meteor/accounts-base";
import { createContainer } from "meteor/react-meteor-data";
import { Link } from "react-router";

/**
 * A component that represents a header bar for the public and private sections of this application.
 */

export class Footer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			facebook: props.facebook,
			twitter: props.twitter,
			instagram: props.instagram,
			facebookHover: props.facebookHover,
			twitterHover: props.twitterHover,
			instagramHover: props.instagramHover,
			hover: [false, false, false]
		};

		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);
	}

	onMouseOver(e) {
		const src = e.target.src;
		const facebook = "facebook";
		const twitter = "twitter";
		const instagram = "instagram";

		if (src.includes(facebook)) {
			this.setState({ hover: [true, false, false] });
		} else if (src.includes(twitter)) {
			this.setState({ hover: [false, true, false] });
		} else if (src.includes(instagram)) {
			this.setState({ hover: [false, false, true] });
		}
	}

	onMouseOut(e) {
		this.setState({ hover: [false, false, false] });
	}

	render() {
		return (
			<div className="footer">
				<div className="footer__content">
					<div>Copyright &copy; 2018 <a className="footer__link" href="https://www.edgewrestling.com" target="_blank">Edge Wrestling</a>. All rights reserved.</div>
					<div className="footer__social-media-icons">
						<a href="https://www.facebook.com/EdgeWrestlingSchool" target="_blank">
							<img src={this.state.hover[0] ? this.state.facebookHover : this.state.facebook} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} />
						</a>
						<a href="https://twitter.com/EdgeWrestling" target="_blank">
							<img src={this.state.hover[1] ? this.state.twitterHover : this.state.twitter} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} />
						</a>
						<a href="https://www.instagram.com/edge_whippany/" target="_blank">
							<img src={this.state.hover[2] ? this.state.instagramHover : this.state.instagram} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} />
						</a>
					</div>
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
		facebook: "/images/social-media/facebook-icon.svg",
		twitter: "/images/social-media/twitter-icon.svg",
		instagram: "/images/social-media/instagram-icon.svg",
		facebookHover: "/images/social-media/facebook-hover-icon.svg",
		twitterHover: "/images/social-media/twitter-hover-icon.svg",
		instagramHover: "/images/social-media/instagram-hover-icon.svg"
	};
}, Footer);
