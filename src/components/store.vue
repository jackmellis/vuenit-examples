<template>
  <div>{{userName}}</div>
</template>
<script>
import {mapState} from 'vuex';

export default {
  name : 'store',
  props : ['id'],
  computed : mapState('users', {
    userName(state){
      const user = state.users.find(user => user.id === this.id);
      return user ? user.firstName + ' ' + user.lastName : '';
    }
  })
}
</script>
