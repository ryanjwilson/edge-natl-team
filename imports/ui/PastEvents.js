import React from 'react';

import Footer from './Footer';
import Header from './Header';
import EventPictuers from './EventPictures';

export default class PastEvents extends React.Component {
  render() {
    return (
      <div>
        <Header/>

        <div className="public-page-content">
          <div className="public-page-content__team-rules">
            <EventPictuers/>
          </div>
        </div>

        <Footer/>
      </div>
    );
  }
}
