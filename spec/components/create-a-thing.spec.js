import test from 'ava';
import sinon from 'sinon';
import {mount, trigger} from 'vuenit';
import c from '../../src/components/create-a-thing';

// This is a more complicated test. We want to test that the user can input a name into the name field, click on the submit button, fire off an ajax request, update the store, and update the router.
// That's a lot of stuff to test in one go so we'll probably split it into a few smaller tests...

// First let's set up the component instance
test.beforeEach(t => {
  let options = {
    http : true, // creates a mock http object
    store : true, // creates a mock vuex store
    router : true, // creates a mock router
  };
  let vm = mount(c, options);

  t.context = {vm, options};
});

test('user enters name in input', t => {
  let vm = t.context.vm;
  // get the input and mimick the user typing a value
  let input = vm.$findOne('#name');
  input.value = 'fred';
  // this triggers an input event on the element
  trigger(input, 'input');
  t.is(vm.name, 'fred');
});

test('clicking submit button calls a DIFFERENT submit method', t => {
    // This is a bit of a nasty one because after mounting, vm.submit and @click="submit" are refering to different instances of the submit method. That means we can't just stub vm.submit as it won't be called by the click handler.

    let {vm} = t.context;
    // switch off $http for now or we'll get all kinds of additional errors!
    vm.$http.otherwise().stop();
    sinon.stub(vm, 'submit');

    trigger(vm.$find('button'), 'click');

    t.false(vm.submit.called);
    // even though we've stub vm.submit, triggering the click event still calls the original method
});

test('clicking submit button calls submit method', t => {
  // Vuenit exposes a hook just before creating the vm where it has a copy of the component that you can mutate safely

  let {options} = t.context;
  let spy = sinon.spy();

  options.before = function (c) {
    c.methods.submit = spy;
  };

  let vm = mount(c, options);

  trigger(vm.$find('button'), 'click');

  t.true(spy.called); // tada
});

test('submit fires off ajax request', async t => {
  let vm = t.context.vm;
  let $http = vm.$http;
  // the mock $http allows us to control what happens when a request is received
  // in this case we can tell it to just hang forever
  // this will stop the rest of the method from running as we're not really bothered about the next step just yet
  // calling expect allows us to later assert that a call was made to this endpoint
  $http.expect('post', '/thing-creator').stop();

  // let's set the name value directly. We're not worried about testing the click events in this test...
  vm.name = 'fred';

  vm.submit();

  // now we tell $http to confirm that all expectations were met
  t.notThrows(() => $http.assert());
});

test('submit sends dispatch event', async t => {
  let vm = t.context.vm;
  let {$http, $store} = vm;
  let thing = {id : 9};

  // when the ajax request is sent, let's intercept it and return some response data
  $http.when('post', '/thing-creator').return({ data : thing });
  // add an expectation that the dispatch will be called
  $store.expect('dispatch', 'things/addThing').return(thing);

  await vm.submit();

  t.notThrows(() => $store.assert());
});

test('submit sends router update', async t => {
  let vm = t.context.vm;
  let {$http, $store} = vm;
  let thing = {id : 7};

  // now we want to check that router is updated
  // we could create a spy on $router.push and check that was called, but vuenit offers a neater way to check route changes...

  // once again, let's create some mock responses...
  $http.when('post', '/thing-creator').return({ data : thing });
  $store.when('dispatch', 'things/addThing').return(thing);

  // let's check the current value of $route
  t.is(vm.$route.path, '/');

  await vm.submit();

  // wow $route has magically updated to the new path!
  t.is(vm.$route.path, '/things/7');
});
