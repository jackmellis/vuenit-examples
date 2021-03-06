import test from 'ava';
import {build} from 'vuenit';
import c from '../../src/components/slots';

const mount = build(c);

// This component has slots, but it also has default content when slots are omitted. We want to test this works

test('renders a header slot', t => {
  let vm = mount({
    slots : {
      header : '<span class="my-header-slot"/>'
    }
  });

  t.false(vm.$contains('h1'));
  t.true(vm.$contains('.my-header-slot'));
});

test('renders default header', t => {
  let vm = mount();

  t.true(vm.$contains('h1'));
});

test('renders slot content', t => {
  let vm = mount({
    slots : {
      default : '<span class="my-content"/>'
    }
  });

  t.true(vm.$contains('.my-content'));
});

test('renders default content', t => {
  let vm = mount();
  let div = vm.$find('#default_content');
  let text = div.$text;

  t.is(text, 'Content');
});

test('renders a footer slot', t => {
  let vm = mount({
    slots : {
      footer : '<span class="my-footer"/>'
    }
  });

  t.false(vm.$contains('h5'));
  t.true(vm.$contains('.my-footer'));
});

test('renders default footer', t => {
  let vm = mount();

  t.true(vm.$contains('h5'));
});
