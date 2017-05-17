import test from 'ava';
import {mockStore} from 'vuenit';
import modules from '../../src/store/modules';

test('returns the current user', t => {
  // we'll grab the getters from the module
  // and create a fake state with some dummy data

  // we'll create a store using just the getters
  // wrapping them in a things module is optional, we could just add it to the route (see mutations.spec.js)
  const {getters} = modules.users;
  const store = mockStore({
    things : {
      state : {
        userId : 4,
        users : [
          {
            id : 4,
            name : 'foo'
          }
        ]
      },
      getters
    }
  });

  let result = store.getters['things/currentUser'];
  t.is(result.name, 'foo');
});
