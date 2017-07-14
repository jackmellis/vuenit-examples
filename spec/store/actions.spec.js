import test from 'ava';
import sinon from 'sinon';
import {mockStore} from 'vuenit';
import modules from '../../src/store/modules';

test('commits a new thing', async t => {
  // we'll just extract the actions and create a store using it
  const {actions} = modules.things;
  const store = mockStore({
    things : {
      actions
    }
  });
  let thing = {isAThing : true};

  // the mock store allows us to intercept a commit and on it
  // so we'll attach a spy to the ADD_THING commit
  store.expect('commit', 'things/ADD_THING', 1);

  // dispatch is wrapped in a promise so we have to await the result
  let result = await store.dispatch('things/addThing', thing);

  store.assert(); // will throw if a things/ADD_THING commit was not fired off
  t.is(result, thing);
});
