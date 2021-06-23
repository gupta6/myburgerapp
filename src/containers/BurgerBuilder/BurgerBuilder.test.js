import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuider/>',() => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}} error />);
    });

    it('it should output <BuildControls> only when ings prop is not equal to null',() => {
        wrapper.setProps({ings: null })
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    })

});

