import test from 'ava';
import sinon from 'sinon';
import {mount, shallow} from 'vuenit';
import c from '../../src/components/deep-parent';

test.beforeEach(t => {
  sinon.stub(console, 'error');
});
test.afterEach(t => {
  console.error.restore();
  delete mount.config.shallow;
});

// This component has a child component that does some of its own stuff. We don't really want the child component to interfere with our tests on the parent component.
// As you will see, the child attempts to do some stuff on creation that will throw an error.
// Rather than attempting to manage the child component's functionality, it would be much easier to just ignore it for now:

// Note that there a several ways to achieve shallow Rendering
// stubComponents : true, shallow : true and vuenit.shallow() will all stub child components

test('it fails to render due to the child component', t => {
  mount(c);

  t.true(console.error.called);
});

// let's switch on shallow rendering:
test('it stubs the child component', t => {
  mount(c, {
    stubComponents : true
  });

  t.false(console.error.called);
});
// nice!

// we could also have set this globally so all tests are shallow rendered:
// { shallow : true } is the equivalent of { stubComponents : true, stubDirectives : true, stubFilters : true }
test('it is always rendered shallow', t => {
  mount.config.shallow = true;

  mount(c);
  mount(c);
  mount(c);

  t.false(console.error.called);
});

// we can still do assertions to check that the parent contains the child component as stubComponents still renders some html
test('it has a child component', t => {
  let vm = shallow(c);

  t.true(vm.$contains('deep-child'));
});

// and we can manually stub certain components so we can still test their behaviour
test('it triggers a click event', t => {

  let vm = mount(c, {
    components : {
      deepChild : `<button></button>`
    }
  });

  sinon.stub(vm, 'onClick');

  let child = vm.$findOne('deep-child');
  child.$emit('click');

  t.true(vm.onClick.called);
});
