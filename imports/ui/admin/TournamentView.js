import React from 'react';
import { Accounts } from 'meteor/accounts-base';

import Footer from '../Footer';
import Header from '../Header';
import TournamentEditor from './TournamentEditor';
import TournamentList from './TournamentList';

/**
 * A TournamentView component represents all Tournament-related components,
 * which essentially amounts to the TournamentList (of Tournaments) and the
 * TournamentEditor components.
 */

export default class TournamentView extends React.Component {

  /**
   * Initializes an EmptyItem component.
   *
   * @param props - the properties with which this component is initialized
   */

  constructor(props) {
    super(props);

    this.state = {
      title: 'Tournaments'
    };
  }

  /**
   * Renders this component to the page.
   *
   * @return the JSX for this component
   */

  render() {
    return (
      <div>
        <Header/>

        <div className="private-page-content">
          <div className="private-page-content__sidebar">
            <TournamentList/>
          </div>
          <div className="private-page-content__main">
            <TournamentEditor/>
          </div>
        </div>

        <Footer/>
      </div>
    );
  }
}
