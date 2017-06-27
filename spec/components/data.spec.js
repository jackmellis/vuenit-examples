import test from 'ava';
import {mount} from 'vuenit';
import c from '../../src/components/data';

// This component has a computed property that relies on values from component data and props. It would be nice if we could test that the value is updated in real time.

test('it has a default theme of white', t => {
  let vm = mount(c);
  t.is(vm.computedStyles.backgroundColor, 'white');
})

test('it has a default size of 50%', t => {
  let vm = mount(c);
  t.is(vm.computedStyles.width, '50%');
});

test('it uses the theme prop', async t => {
  // let's pass a theme prop into the component:
  let vm = mount(c, {
    props : {
      theme : 'blue'
    }
  });

  t.is(vm.computedStyles.backgroundColor, 'blue');

  // let's update the theme prop...
  vm.propsData.theme = 'green';
  // props changes don't filter down until the next tick...
  await vm.$nextTick();

  t.is(vm.computedStyles.backgroundColor, 'green');
});

test('it accepts dark as a valid value', t => {
  let vm = mount(c, {
    props : {
      theme : 'dark'
    }
  });

  t.is(vm.computedStyles.backgroundColor, '#4d4a4a');
});

test('unkown themes default to white', async t => {
  let vm = mount(c, {
    props : {
      theme : 'red'
    }
  });
  // first check that the current value is correct
  t.is(vm.computedStyles.backgroundColor, 'red');

  // let's give theme an invalid value
  vm.propsData.theme = 'maroon';
  await vm.$nextTick();

  // check that the value is ignored:
  t.is(vm.computedStyles.backgroundColor, 'white');
});

test('it has a small size', t => {
  let vm = mount(c);
  vm.size = 'sm';
  // data properties are updated instantly, unlike props we don't have to wait for the next tick

  t.is(vm.computedStyles.width, '25%');
});

test('it has a large size', t => {
  // we can also set data properties when mounting the component:
  let vm = mount(c, {
    data : {
      size : 'lg'
    }
  });

  t.is(vm.computedStyles.width, '75%');
});

// After checking the return value of this property, let's just test that it actually gets used in the render:
test('it uses computedStyles', t => {
  let vm = mount(c);

  t.is(vm.$el.style.width, '50%');
  t.is(vm.$el.style.backgroundColor, 'white');
});
