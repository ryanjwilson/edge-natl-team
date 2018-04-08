import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { TournamentListHeader } from './TournamentListHeader';
import { tournaments } from '../../fixtures/data';

/*****************************************************************************/

configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('TournamentListHeader Component', function() {
    let meteorCall;
    let Session;

    beforeEach(function() {
      meteorCall = expect.createSpy();
      Session = {
        set: expect.createSpy()
      };
    });

    it('should call meteorCall on click', function() {
      const wrapper = mount(<TournamentListHeader meteorCall={meteorCall} Session={Session}/>);

      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1](undefined, tournaments[0]._id);

      expect(meteorCall.calls[0].arguments[0]).toBe('tournaments.insert');
      expect(Session.set).toHaveBeenCalledWith('selectedTournamentId', tournaments[0]._id);
    });

    it('should not set session variable for failed insert', function() {
      const wrapper = mount(<TournamentListHeader meteorCall={meteorCall} Session={Session}/>);

      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1]({}, undefined);

      expect(meteorCall.calls[0].arguments[0]).toBe('tournaments.insert');
      expect(Session.set).toNotHaveBeenCalled();
    });
  });
}
