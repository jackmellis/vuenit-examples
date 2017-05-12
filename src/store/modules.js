export default {
  users : {
    state : {
      userId : null
      users : []
    },
    getters : {
      currentUser(state){
        return state.users.find(user => user.id === state.userId);
      }
    },
    mutations : {},
    actions : {}
  },
  things : {
    state : {
      things : []
    },
    getters : {},
    mutations : {
      ADD_THING(state, payload){
        state.things.push(payload);
      }
    },
    actions : {
      addThing({state, commit}, payload){
        commit('ADD_THING', payload);
        return payload;
      }
    }
  }
}
