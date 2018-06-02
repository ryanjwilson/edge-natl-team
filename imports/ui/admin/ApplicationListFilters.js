import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { createContainer } from 'meteor/react-meteor-data';

export class ApplicationListFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPublished: true,
      showUnpublished: true
    };

    this.onTogglePublished = this.onTogglePublished.bind(this);
    this.onToggleUnpublished = this.onToggleUnpublished.bind(this);
  }

  componentDidMount() {
    this.setState({
      showPublished: this.props.showPublished,
      showUnpublished: this.props.showUnpublished
    });
  }

  onTogglePublished(e) {
    const showPublished = e.target.checked;
    this.props.Session.set('showPublished', showPublished);
    this.setState({ showPublished });
  }

  onToggleUnpublished(e) {
    const showUnpublished = e.target.checked;
    this.props.Session.set('showUnpublished', showUnpublished);
    this.setState({ showUnpublished });
  }

  render() {
    return (
      <div className="checkbox__filter-group">
        <label className="checkbox">
          <input className="checkbox__box" type="checkbox" checked={this.state.showPublished} onChange={this.onTogglePublished}/>
          Published
        </label>
        <label className="checkbox">
          <input className="checkbox__box" type="checkbox" checked={this.state.showUnpublished} onChange={this.onToggleUnpublished}/>
          Unpublished
        </label>
      </div>
    );
  }
}

export default createContainer(() => {
  const showPublished = Session.get('showPublished');
  const showUnpublished = Session.get('showUnpublished');

  return {
    showPublished,
    showUnpublished,
    Session
  };
}, ApplicationListFilters);
