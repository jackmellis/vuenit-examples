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
  let spy = sinon.spy();
  let thing = {isAThing : true};

  // the mock store allows us to intercept a commit and on it
  // so we'll attach a spy to the ADD_THING commit
  store.when('commit', 'things/ADD_THING').call(spy);

  // dispatch is wrapped in a promise so we have to await the result
  let result = await store.dispatch('things/addThing', thing);

  t.true(spy.called);
  t.is(result, thing);
});
