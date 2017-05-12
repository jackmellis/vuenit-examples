import test from 'ava';
import {mount} from 'vuenit';
import c from '../../src/components/basic';

// This is a nice basic spec that just checks that the component is rendering the correct elements

test('it renders a header', t => {
  // this creates and mounts the component and returns the instance
  let vm = mount(c);

  // vm has a $contains method that checks whether a css selector (or component name) exists within the component
  t.true(vm.$contains('h1.title'));
});

test('it renders a subtitle', t => {
  let vm = mount(c);

  t.true(vm.$contains('h2.subtitle'));
});

test('it renders a button', t => {
  let vm = mount(c);

  t.true(vm.$contains('#basic_button'));
});
