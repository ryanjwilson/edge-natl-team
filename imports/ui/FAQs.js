import React from 'react';

import Footer from './Footer';
import Header from './Header';
import QuestionsAnswers from './QuestionsAnswers';

export default class FAQs extends React.Component {
  render() {
    return (
      <div>
        <Header/>

        <div className="public-page-content">
          <div className="public-page-content__faq">
            <QuestionsAnswers/>
          </div>
        </div>

        <Footer/>
      </div>
    );
  }
}
