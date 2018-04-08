import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { tournaments } from '../../fixtures/data';
import { TournamentList } from './TournamentList';

/*****************************************************************************/

configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('TournamentList Component', function() {
    it('should render a Tournament component for each tournament', function() {
      const wrapper = mount(<TournamentList tournaments={tournaments}/>);

      expect(wrapper.find('Tournament').length).toBe(2);
      expect(wrapper.find('EmptyItem').length).toBe(0);
    });

    it('should render an EmptyItem component if there are no tournaments', function() {
      const wrapper = mount(<TournamentList tournaments={[]}/>);

      expect(wrapper.find('Tournament').length).toBe(0);
      expect(wrapper.find('EmptyItem').length).toBe(1);
    });
  });
}
