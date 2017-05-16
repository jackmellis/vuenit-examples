import test from 'ava';
import {mockStore} from 'vuenit';
import modules from '../../src/store/modules';

test('adds a thing to the store', t => {
  // although the mutation is part of the things namespace, we're just putting it at the base of our store to make it easier to test
  // but we could have easily tested it as part of a module
  const {mutations, state} = modules.things;
  const store = mockStore({
    state,
    mutations
  });

  // we expect this commit to add a thing to the things array
  t.is(store.state.things.length, 0);

  store.commit('ADD_THING', {});

  // voila!
  t.is(store.state.things.length, 1);
});
