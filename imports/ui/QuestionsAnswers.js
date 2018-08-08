import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';

export class QuestionsAnswers extends React.Component {
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
        <h5 className="container__title">Frequently Asked Questions</h5>

        <div className="container__content">
          <p className="container__subtitle">Many of the most frequently asked questions are answered in detail below. If you do not find an answer to your question, or would like some clarification on anything, feel free to <Link className="container__link" to="/contact">contact us</Link>. We weclome any questions, comments, or concerns.</p>
          <hr/>

          <ol className="faq">
            <li id="how-to-join">
              <p>How can my child join the Edge National Team?</p>
              <p>If your child is interested in joining our National Team, check out our upcoming <Link className="container__link" to="/">Schedule</Link> and apply for one or more events.</p>
            </li>
            <li id="where-we-train">
              <p>Where does the Edge National Team train?</p>
              <p>
                Our National Team trains at our <a className="container__link" href="http://www.edgewrestling.com" target="_blank">state-of-the-art facility</a> in Whippany, NJ. The address is below:
                <br/><br/>
                <a className="container__link" href="https://goo.gl/maps/BUuqsHhPauS2" target="_blank">
                  Edge Wrestling<br/>
                  9 Whippany Road, Unit A1-4<br/>
                  Whippany, NJ 07981
                </a>
              </p>
            </li>
            <li id="travel-requirements">
              <p>How much travel is required?</p>
              <p>The extent of travel will largely depend on the event for which you are applying. Events that fall during natural breaks from school typically require more travel, and possibly <a className="container__link" href="#overnight-stays">overnight stays</a>; however, the majority of the events we enter are within a couple hours’ drive. All travel requirements will be explicitly stated during the application process.</p>
            </li>
            <li id="overnight-stays">
              <p>Are overnight stays required?</p>
              <p>Overnight stays follow the same pattern as <a className="container__link" href="#travel-requirements">travel</a>. Many events will require an overnight stays, with a small percentage requirement multiple nights. All overnight stay requirements will be explicitly stated during the application process.</p>
            </li>
            <li id="losing-a-wrestle-off">
              <p>What if my child loses his or her wrestle-off?</p>
              <p>If your child loses his or her wrestle-off, he or she will need to wait until the next event with an open weight to challenge for a starting spot. Optionally, you can request to put your child on our roster as an <a className="container__link" href="#being-an-alternate">alternate</a>.</p>
            </li>
            <li id="being-an-alternate">
              <p>What does it mean to be an alternate?</p>
              <p>If your child is an alternate, it means he or she is on our roster but not in a starting role. He or she may, if needed, be asked to step into the starting position in situations where the starter <a className="container__link" href="#misses-weight">misses weight</a> or suffers an injury. More commonly, though, your child will wrestle in exhibition matches against starters and/or alternates from opposing teams. Exhibition matches are always at the discretion of tournament directors and/or officials, so we cannot guarantee a set number of matches for any single event.</p>
            </li>
            <li id="missing-weight">
              <p>What if my child does not make weight?</p>
              <p>If your child misses weight, he or she will be moved up to the next weight class as an <a className="container__link" href="#being-an-alternate">alternate</a>. It is your responsibility to ensure your child makes the weight to which he or she has committed. Refunds will not be issued if he or she does not.</p>
            </li>
            <li id="team-fee">
              <p>What is included in the team fee?</p>
              <p>The team fee, first and foremost, will go towards the entry fee for the event. Additionally, it will include all regularly scheduled <a className="container__link" href="https://www.edgewrestling.com/whippany-calendar" target="_blank">Edge practices</a> in the four (4) weeks leading up to the event, plus any National Team practices at our <a className="container__link" href="#where-we-train">training facility</a>. Certain larger-scale events will also include a gear package.</p>
            </li>
            <li id="missed-payment">
              <p>What happens if I miss the deposit or payment deadline?</p>
              <p>We may be forced to fill your child’s spot on the roster if we cannot secure timely payment. We have entry fee and/or gear package deadlines for these events. If you’d like us to meet our deadlines, we need you to meet yours.</p>
            </li>
            <li id="media">
              <p>What events has <a className="container__link" href="http://www.edgewrestling.com" target="_blank">Edge Wrestling</a> been to in the past?</p>
              <p>See for yourself! Browse pictures from all of our <Link className="container__link" to="/media">past events</Link>.</p>
            </li>
          </ol>
        </div>
      </div>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

QuestionsAnswers.propTypes = {

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default createContainer(() => {
  return {

  };
}, QuestionsAnswers);
