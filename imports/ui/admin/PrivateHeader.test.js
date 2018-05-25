import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PrivateHeader } from './PrivateHeader';

///////////////////////////////////////////////////////////////////////////////

configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('PrivateHeader Component', function() {
    // it('should set button text to logout', function() {
    //   const wrapper = mount(<PrivateHeader title="Test Title" onLogout={() => {}}/>);
    //   const buttonText = wrapper.find('button').text();
    //
    //   expect(buttonText).toBe('Logout');
    // });

    it('should use title property for header text', function() {
      const title = 'Test Title';
      const wrapper = mount(<PrivateHeader title={title} onLogout={() => {}}/>);
      const titleText = wrapper.find('h1').text();

      expect(titleText).toBe(title);
    });

    // it('should call onLogout when clicked', function() {
    //   const spy = expect.createSpy();
    //   const wrapper = mount(<PrivateHeader title="Title" onLogout={spy}/>);
    //
    //   wrapper.find('button').simulate('click');
    //
    //   expect(spy).toHaveBeenCalled();
    // });
  });
}
