import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

export class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      facebookSrc: '/images/facebook.svg',
      twitterSrc: '/images/twitter.svg',
      instagramSrc: '/images/instagram.svg'
    };

    this.onHover = this.onHover.bind(this);
  }

  onHover(e) {
    const src = e.target.src;

    if (src.includes('/images/facebook-gold.svg')) {
      this.setState({ facebookSrc: '/images/facebook.svg'});
    } else if (src.includes('/images/facebook.svg')) {
      this.setState({ facebookSrc: '/images/facebook-gold.svg' });
    } else if (src.includes('/images/twitter-gold.svg')) {
      this.setState({ twitterSrc: '/images/twitter.svg' });
    } else if (src.includes('/images/twitter.svg')) {
      this.setState({ twitterSrc: '/images/twitter-gold.svg' });
    } else if (src.includes('/images/instagram-gold.svg')) {
      this.setState({ instagramSrc: '/images/instagram.svg' });
    } else if (src.includes('/images/instagram.svg')) {
      this.setState({ instagramSrc: '/images/instagram-gold.svg' });
    }
  }

  render() {
    return (
      <div className="footer">
        <div className="footer__content">
          <div>Copyright &copy; 2018 <a className="footer__link" href="https://www.edgewrestling.com">Edge Wrestling</a>. All rights reserved.</div>
          <div className="footer__social-media-icons">
            <a href="https://www.facebook.com/EdgeWrestlingSchool" target="_blank"><img src={this.state.facebookSrc} onMouseOver={this.onHover} onMouseOut={this.onHover}/></a>
            <a href="https://www.instagram.com/edge_whippany/" target="_blank"><img src={this.state.twitterSrc} onMouseOver={this.onHover} onMouseOut={this.onHover}/></a>
            <a href="https://twitter.com/EdgeWrestling" target="_blank"><img src={this.state.instagramSrc} onMouseOver={this.onHover} onMouseOut={this.onHover}/></a>
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {

};

export default createContainer(() => {
  return {

  };
}, Footer);
