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
      <div className="team-rules__rules">
        <h5 className="team-rules__rules-title">Team Rules &amp; Wrestle-offs</h5>

        <div className="team-rules__rules-content">
          <ol className="team-rules__rules-list">
            <li>We will be scheduling duals on a rolling basis year-round; we prefer that our wrestlers commit to as many consecutive duals as possible. Wrestlers willing to commit to multiple duals will be given priority over those who only commit to a single event.</li>
            <li>Roster positions will be offered to qualified, active <a href="http://www.edgewrestling.com">Edge</a> members first. If a committment cannot be obtained from a qualified, active member, open weights will be filled with free agents.</li>
            <li>Team fees must be paid in full to reserve your spot on the team. Payments and deadlines will be posted with our <Link to="/">Schedule</Link> as soon as the application process opens.</li>
            <li>If you apply for and commit to a weight class, your child is expected to make that weight for all duals in which he or she is wrestling. No exceptions. If your child cannot make weight, we cannot guarantee another will be available.</li>
            <li>We expect our wrestlers to compete on our teams, rather than wrestling as free agents with other clubs. It is only acceptable to wrestle with another club if:
              <ul>
                <li>You applied for, but were not offered, a spot on our team.</li>
                <li>We are not entering a team in an event on that particular date.</li>
              </ul>
            </li>
            <li>Many of the duals we enter draw some of the best wrestlers in the state and country. We ask that you take this into consideration before applying for a spot on one of our teams. We reserve the right to determine if and when your child is ready, and will not offer him or her a spot before he or she is.</li>
            <li>All club members who earn a starting spot on our National Team will be required to purchase a National Team singlet.</li>
            <li>With the possible exception of free agents, team practices are mandatory.</li>
            <hr/>
            <li>Wrestle-offs, if needed, will be held approximately one month prior to the event and will be structured according to the number of wrestlers interested in a single weight class. After the wrestle-off date, remaining weights will be filled on a first-come, first-served basis.
              <ul>
                <li>If two (2) wrestlers are interested in a single weight class, they will compete in a one-and-done match.</li>
                <li>If three (3) wrestlers are interested in a single weight class, they will compete in a round-robin series.</li>
                <li>If four (4) or more wrestlers are intersted in a single weight class, they will compete in a bracketed mini-tournament (blindly drawn).</li>
              </ul>
            </li>
            <li>Wrestle-off periods will be 1:30 for youth matches and 2:00 for high school matches.</li>
            <li>Rest time of at least 10 minutes will be allotted between wrestle-off matches.</li>
            <li>Weigh-ins will be held 30 minutes prior to the wrestle-off.
              <ul>
                <li>If your child is wrestling-off for a single dual, he or she must make the weight at which he or she will wrestle for that dual (with a 3-pound allowance).</li>
                <li>If your child is wrestling-off for a multiple consecutive duals, he or she must make the lowest weight at which he or she will wrestle in those events (with a 3-pound allowance).</li>
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
