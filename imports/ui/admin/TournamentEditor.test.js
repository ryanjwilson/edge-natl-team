import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { TournamentEditor } from './TournamentEditor';
import { tournaments } from '../../fixtures/data';

/*****************************************************************************/

configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('TournamentEditor Component', function() {
    let browserHistory;
    let call;

    beforeEach(function() {
      call = expect.createSpy();
      browserHistory = {
        push: expect.createSpy()
      };
    });

    it('should render select tournament message', function() {
      const wrapper = mount(<TournamentEditor browserHistory={browserHistory} call={call}/>);
      expect(wrapper.find('p').text()).toBe('Select or add a Tournament to get started.');
    });

    it('should render tournament not found message', function() {
      const wrapper = mount(<TournamentEditor browserHistory={browserHistory} call={call} selectedTournamentId={tournaments[0]._id}/>);
      expect(wrapper.find('p').text()).toBe('Tournament not found.');
    });

    it('should remove a tournament', function() {
      const wrapper = mount(<TournamentEditor browserHistory={browserHistory} call={call} selectedTournamentId={tournaments[0]._id} tournament={tournaments[0]}/>);
      wrapper.find('#delete-button').simulate('click');
      expect(call).toHaveBeenCalledWith('tournaments.remove', tournaments[0]._id);
      expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
    });

    it('should toggle the staging status of a tournament', function() {
      const wrapper = mount(<TournamentEditor browserHistory={browserHistory} call={call} selectedTournamentId={tournaments[0]._id} tournament={tournaments[0]}/>);
      wrapper.find('#staging-button').simulate('click');
      expect(call).toHaveBeenCalledWith('tournaments.update', tournaments[0]._id, { readyToPublish: !tournaments[0].readyToPublish });
    });

    it('should update the tournament name on input change', function() {
      const name = 'An Updated Name';
      const wrapper = mount(<TournamentEditor browserHistory={browserHistory} call={call} selectedTournamentId={tournaments[0]._id} tournament={tournaments[0]}/>);

      wrapper.find('#name').simulate('change', {
        target: {
          value: name
        }
      });

      expect(wrapper.state('name')).toBe(name);
      expect(call).toHaveBeenCalledWith('tournaments.update', tournaments[0]._id, { name });
    });

    it('should update the tournament location on input change', function() {
      const location = 'An Updated Location';
      const wrapper = mount(<TournamentEditor browserHistory={browserHistory} call={call} selectedTournamentId={tournaments[0]._id} tournament={tournaments[0]}/>);

      wrapper.find('#location').simulate('change', {
        target: {
          value: location
        }
      });

      expect(wrapper.state('location')).toBe(location);
      expect(call).toHaveBeenCalledWith('tournaments.update', tournaments[0]._id, { location });
    });

    it('should update the tournament date on input change', function() {
      const date = 'An Updated Date';
      const wrapper = mount(<TournamentEditor browserHistory={browserHistory} call={call} selectedTournamentId={tournaments[0]._id} tournament={tournaments[0]}/>);

      wrapper.find('#date').simulate('change', {
        target: {
          value: date
        }
      });

      expect(wrapper.state('date')).toBe(date);
      expect(call).toHaveBeenCalledWith('tournaments.update', tournaments[0]._id, { date });
    });

    it('should update the tournament weigh-ins on input change', function() {
      const weighins = 'An Updated Weigh-in';
      const wrapper = mount(<TournamentEditor browserHistory={browserHistory} call={call} selectedTournamentId={tournaments[0]._id} tournament={tournaments[0]}/>);

      wrapper.find('#weighins').simulate('change', {
        target: {
          value: weighins
        }
      });

      expect(wrapper.state('weighins')).toBe(weighins);
      expect(call).toHaveBeenCalledWith('tournaments.update', tournaments[0]._id, { weighins });
    });

    it('should update the tournament alternate weigh-ins on input change', function() {
      const alternateWeighins = 'An Updated Alternate Weigh-in';
      const wrapper = mount(<TournamentEditor browserHistory={browserHistory} call={call} selectedTournamentId={tournaments[0]._id} tournament={tournaments[0]}/>);

      wrapper.find('#alternateWeighins').simulate('change', {
        target: {
          value: alternateWeighins
        }
      });

      expect(wrapper.state('alternateWeighins')).toBe(alternateWeighins);
      expect(call).toHaveBeenCalledWith('tournaments.update', tournaments[0]._id, { alternateWeighins });
    });

    it('should update the tournament division on input change', function() {
      const division = 'An Updated Division';
      const wrapper = mount(<TournamentEditor browserHistory={browserHistory} call={call} selectedTournamentId={tournaments[0]._id} tournament={tournaments[0]}/>);

      wrapper.find('#division').simulate('change', {
        target: {
          value: division
        }
      });

      expect(wrapper.state('division')).toBe(division);
      expect(call).toHaveBeenCalledWith('tournaments.update', tournaments[0]._id, { division });
    });

    it('should update the tournament weight classes on input change', function() {
      const weightClasses = 'An Updated Set of Weight Classes';
      const wrapper = mount(<TournamentEditor browserHistory={browserHistory} call={call} selectedTournamentId={tournaments[0]._id} tournament={tournaments[0]}/>);

      wrapper.find('#weightClasses').simulate('change', {
        target: {
          value: weightClasses
        }
      });

      expect(wrapper.state('weightClasses')).toBe(weightClasses);
      expect(call).toHaveBeenCalledWith('tournaments.update', tournaments[0]._id, { weightClasses });
    });

    it('should update the tournament allowance on input change', function() {
      const allowance = 3;
      const wrapper = mount(<TournamentEditor browserHistory={browserHistory} call={call} selectedTournamentId={tournaments[0]._id} tournament={tournaments[0]}/>);

      wrapper.find('#allowance').simulate('change', {
        target: {
          value: allowance
        }
      });

      expect(wrapper.state('allowance')).toBe(allowance);
      expect(call).toHaveBeenCalledWith('tournaments.update', tournaments[0]._id, { allowance });
    });

    it('should update the tournament year on input change', function() {
      const year = 2020;
      const wrapper = mount(<TournamentEditor browserHistory={browserHistory} call={call} selectedTournamentId={tournaments[0]._id} tournament={tournaments[0]}/>);

      wrapper.find('#year').simulate('change', {
        target: {
          value: year
        }
      });

      expect(wrapper.state('year')).toBe(year);
      expect(call).toHaveBeenCalledWith('tournaments.update', tournaments[0]._id, { year });
    });

    it('should update the tournament season on input change', function() {
      const season = 'An Updated Season';
      const wrapper = mount(<TournamentEditor browserHistory={browserHistory} call={call} selectedTournamentId={tournaments[0]._id} tournament={tournaments[0]}/>);

      wrapper.find('#season').simulate('change', {
        target: {
          value: season
        }
      });

      expect(wrapper.state('season')).toBe(season);
      expect(call).toHaveBeenCalledWith('tournaments.update', tournaments[0]._id, { season });
    });

    it('should set state for new tournament', function() {
      const wrapper = mount(<TournamentEditor browserHistory={browserHistory} call={call}/>);

      wrapper.setProps({
        selectedTournamentId: tournaments[0]._id,
        tournament: tournaments[0]
      });

      expect(wrapper.state('name')).toBe(tournaments[0].name);
      expect(wrapper.state('location')).toBe(tournaments[0].location);
      expect(wrapper.state('date')).toBe(tournaments[0].date);
      expect(wrapper.state('weighins')).toBe(tournaments[0].weighins);
      expect(wrapper.state('alternateWeighins')).toBe(tournaments[0].alternateWeighins);
      expect(wrapper.state('weightClasses')).toBe(tournaments[0].weightClasses);
      expect(wrapper.state('allowance')).toBe(tournaments[0].allowance);
      expect(wrapper.state('year')).toBe(tournaments[0].year);
      expect(wrapper.state('season')).toBe(tournaments[0].season);
      expect(wrapper.state('readyToPublish')).toBe(tournaments[0].readyToPublish);
    });

    it('should not set state if tournament property is not provided', function() {
      const wrapper = mount(<TournamentEditor browserHistory={browserHistory} call={call}/>);

      wrapper.setProps({
        selectedTournamentId: tournaments[0]._id
      });

      expect(wrapper.state('name')).toBe('');
      expect(wrapper.state('location')).toBe('');
      expect(wrapper.state('date')).toBe('');
      expect(wrapper.state('weighins')).toBe('');
      expect(wrapper.state('alternateWeighins')).toBe('');
      expect(wrapper.state('weightClasses')).toBe('');
      expect(wrapper.state('allowance')).toBe(0);
      expect(wrapper.state('year')).toBe('');
      expect(wrapper.state('season')).toBe('');
      expect(wrapper.state('readyToPublish')).toBe(false);
    });
  });
}
