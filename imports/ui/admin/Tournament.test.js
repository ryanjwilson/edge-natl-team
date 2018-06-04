// import { Meteor } from 'meteor/meteor';
// import React from 'react';
// import expect from 'expect';
// import { configure, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
//
// import { sampleTournaments } from '../../data/samples';
// import { Tournament } from './Tournament';
//
// configure({ adapter: new Adapter() });
//
// if (Meteor.isClient) {
//   describe('Tournament Component', function() {
//     let Session;
//
//     beforeEach(() => {
//       Session = {
//         set: expect.createSpy()
//       };
//     });
//
//     it('should render tournament name, date, and location', function() {
//       const wrapper = mount(<Tournament tournament={sampleTournaments[0]} Session={Session}/>);
//
//       expect(wrapper.find('h5').text()).toBe(sampleTournaments[0].name);
//       expect(wrapper.find('p').text()).toBe('January 2, 2019 · Somewhere, NJ');
//     });
//
//     it('should set default tournament name if not set', function() {
//       const wrapper = mount(<Tournament tournament={sampleTournaments[1]} Session={Session}/>);
//
//       expect(wrapper.find('h5').text()).toBe('Untitled Tournament');
//     });
//
//     it('should set session variable on click', function() {
//       const wrapper = mount(<Tournament tournament={sampleTournaments[0]} Session={Session}/>);
//
//       wrapper.find('#tournament').simulate('click');
//
//       expect(Session.set).toHaveBeenCalledWith('selectedTournamentId', sampleTournaments[0]._id);
//     });
//   });
// }
