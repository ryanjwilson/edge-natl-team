import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { Link } from "react-router";
import { PropTypes } from "prop-types";

/**
 * An icon component that serves as a hyperlink.
 */

export class IconLink extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			action: props.action,
			destination: props.destination,
			src: props.src,
			hover: props.hover,
			isHovering: props.isHovering
		};

		this.onHover = this.onHover.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.src !== nextProps.src) this.setState({ src: nextProps.src });
		if (this.props.hover !== nextProps.hover) this.setState({ hover: nextProps.hover });
	}

	onHover(e) {
		this.setState({ isHovering: !this.state.isHovering });
	}

	render() {
		return (
			<Link to={this.state.destination} className="header__admin-icon-group" onClick={this.state.action}>
				<img src={this.state.isHovering ? this.state.hover : this.state.src} onMouseOver={this.onHover} onMouseOut={this.onHover} />
			</Link>
		);
	}
}

/**
 * Property types for this component.
 */

IconLink.propTypes = {
	action: PropTypes.func,
	destination: PropTypes.string,
	src: PropTypes.string.isRequired,
	hover: PropTypes.string.isRequired,
	isHovering: PropTypes.bool.isRequired
};

/**
 * Containerizes this component.
 */

export default createContainer(() => {
	return {
		isHovering: false
	};
}, IconLink);
