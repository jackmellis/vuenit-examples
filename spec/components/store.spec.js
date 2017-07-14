import test from 'ava';
import sinon from 'sinon';
import {build, mockStore} from 'vuenit';
import c from '../../src/components/store';

const mount = build(c, {
  props : { id : 1 }
});

// here we have a component that relies on vuex's state, so we want to be able to easily give it one.

test('it returns user name from vuex store', t => {
  // rather than creating a full blown vuex store, vuenit accepts a store property. In this test we don't care about actions or mutations so we can just pass in our state object and vuenit will handle the rest...
  let storeConfig = {
    users : {
      users : [
        {
          id : 1,
          firstName : 'jim',
          lastName : 'bob'
        }
      ]
    }
  };

  let vm = mount({
    store : storeConfig
  });

  t.is(vm.userName, 'jim bob');
});

test('user name is updated when store changes', async t => {
  // you can also do exactly the same thing by creating a store object and injecting it in...
  let $store = mockStore({
    users : {
      users : [
        {
          id : 1,
          firstName : 'jim',
          lastName : 'bob'
        }
      ]
    }
  });

  let vm = mount({
    inject : { $store }
  });

  t.is(vm.userName, 'jim bob');

  // let's pretend that somewhere in our application, the user's details have changed...
  $store.state.users.users[0].firstName = 'fred';

  // the mock store state is reactive so it will notify the computed property to re-compute

  t.is(vm.userName, 'fred bob');
});
