import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';

export class Rules extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    // bind field listeners to this context. remaining listeners are bound
    // manually, as they take additional parameters.
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div className="container">
        <h5 className="container__title">Team Rules &amp; Wrestle-offs</h5>

        <div className="container__content">
          <p className="container__subtitle">If you wish you compete on our team, you'll be expected to follow our rules. Please familiarize yourself with these before <Link className="container__link" to="/">applying for an event</Link>.</p>
          <hr/>

          <ol className="team-rules">
            <li>
              <p>We will be scheduling duals on a rolling basis year-round; we prefer that our wrestlers commit to as many consecutive duals as possible. Wrestlers willing to commit to multiple duals will be given priority over those who only commit to a single event.</p>
            </li>
            <li>
              <p>Roster positions will be offered to qualified, active <a className="container__link" href="http://www.edgewrestling.com" target="_blank">Edge</a> members first. If a committment cannot be obtained from a qualified, active member, open weights will be filled with free agents.</p>
            </li>
            <li>
              <p>Team fees must be paid in full to reserve your spot on the team. Payments and deadlines will be posted with our <Link className="container__link" to="/">Schedule</Link> as soon as the application process opens.</p>
            </li>
            <li>
              <p>If you apply for and commit to a weight class, your child is expected to make that weight for all duals in which he or she is wrestling. No exceptions. If your child cannot make weight, we cannot guarantee another will be available.</p>
            </li>
            <li>
              <p>We expect our wrestlers to compete on our teams, rather than wrestling as free agents with other clubs. It is only acceptable to wrestle with another club if:</p>
              <ul>
                <li>
                  <p>You applied for, but were not offered, a spot on our team.</p>
                </li>
                <li>
                  <p>We are not entering a team in an event on that particular date.</p>
                </li>
              </ul>
            </li>
            <li>
              <p>Many of the duals we enter draw some of the best wrestlers in the state and country. We ask that you take this into consideration before applying for a spot on one of our teams. We reserve the right to determine if and when your child is ready, and will not offer him or her a spot before he or she is.</p>
            </li>
            <li>
              <p>All club members who earn a starting spot on our National Team will be required to purchase a National Team singlet.</p>
            </li>
            <li>
              <p>With the possible exception of free agents, team practices are mandatory.</p>
            </li>
            <li>
              <p>Wrestle-offs, if needed, will be held approximately one month prior to the event and will be structured according to the number of wrestlers interested in a single weight class. After the wrestle-off date, remaining weights will be filled on a first-come, first-served basis.</p>
              <ul>
                <li>
                  <p>If two (2) wrestlers are interested in a single weight class, they will compete in a one-and-done match.</p>
                </li>
                <li>
                  <p>If three (3) wrestlers are interested in a single weight class, they will compete in a round-robin series.</p>
                </li>
                <li>
                  <p>If four (4) or more wrestlers are intersted in a single weight class, they will compete in a bracketed mini-tournament (blindly drawn).</p>
                </li>
              </ul>
            </li>
            <li>
              <p>Wrestle-off periods will be 1:30 for youth matches and 2:00 for high school matches.</p>
            </li>
            <li>
              <p>Rest time of at least 10 minutes will be allotted between wrestle-off matches.</p>
            </li>
            <li>
              <p>Weigh-ins will be held 30 minutes prior to the wrestle-off.</p>
              <ul>
                <li>
                  <p>If your child is wrestling-off for a single dual, he or she must make the weight at which he or she will wrestle for that dual (with a 3-pound allowance).</p>
                </li>
                <li>
                  <p>If your child is wrestling-off for a multiple consecutive duals, he or she must make the lowest weight at which he or she will wrestle in those events (with a 3-pound allowance).</p>
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Rules.propTypes = {

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  return {

  };
}, Rules);
