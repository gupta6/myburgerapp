import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems>',() => {
    let wrapper; 
    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>);
    });

    it('it should output only two <NavigationItem>',() => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('it should output only three <NavigationItem>',() => {
        // wrapper = shallow(<NavigationItems isAuthenticated/>);
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('it should output logout <NavigationItem>',() => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link='/logout'>LogOut</NavigationItem>)).toEqual(true);
    });
});