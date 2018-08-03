import React from 'react';
import { Accounts } from 'meteor/accounts-base';

import Footer from '../Footer';
import Header from '../Header';
import TeamEditor from './TeamEditor';
import TeamList from './TeamList';

/**
 * A TournamentView component represents all Tournament-related components,
 * which essentially amounts to the TournamentList (of Tournaments) and the
 * TournamentEditor components.
 */

export default class TeamView extends React.Component {

  /**
   * Initializes an EmptyItem component.
   *
   * @param props - the properties with which this component is initialized
   */

  constructor(props) {
    super(props);

    this.state = {
      title: 'Teams'
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
            <TeamList/>
          </div>
          <div className="private-page-content__main">
            <TeamEditor/>
          </div>
        </div>

        <Footer/>
      </div>
    );
  }
}
