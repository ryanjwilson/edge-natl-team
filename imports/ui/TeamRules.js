import React from 'react';

import Footer from './Footer';
import Header from './Header';
import Rules from './Rules';

export default class TeamRules extends React.Component {
  render() {
    return (
      <div>
        <Header/>

        <div className="public-page-content">
          <div className="public-page-content__team-rules">
            <Rules/>
          </div>
        </div>

        <Footer/>
      </div>
    );
  }
}
